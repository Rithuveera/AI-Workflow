"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { performComprehensiveScan } from "./checklist-scanner";
import type { ScanType } from "@/types/security";
import { generateWithFallback, parseAIResponse } from "@/lib/ai-fallback";
import { getCachedScan } from "@/lib/cache";

const apiKey = process.env.GEMINI_API_KEY;
console.log("DEBUG: API Key loaded:", apiKey ? "Yes (" + apiKey.substring(0, 5) + "...)" : "No");

const genAI = new GoogleGenerativeAI(apiKey || "");

const SYSTEM_INSTRUCTION = `You are an expert Application Security Engineer who excels at explaining complex security concepts to developers and beginners. 
  Your goal is to analyze code OR web page content provided by the user for security vulnerabilities and explain them clearly.
  
  For every analysis, you MUST provide the response in the following JSON format ONLY (do not use markdown code blocks, just raw JSON):
  {
    "severity": "Critical" | "High" | "Medium" | "Low" | "Safe",
    "summary": "A simple, one-line summary of the finding (e.g., 'Database is vulnerable to unauthorized access')",
    "details": "A clear, easy-to-understand explanation. Structure it as:\\n1. WHAT is the issue?\\n2. WHY is it dangerous? (Explain the impact in simple terms, e.g., 'Attackers could steal user passwords')\\n3. HOW it works (Briefly explain the mechanism without too much jargon).",
    "recommendation": "Step-by-step instructions to fix the issue. Provide clear code examples or configuration changes.",
    "affected_lines": "Line numbers or code blocks where the issue is located"
  }
  
  IMPORTANT GUIDELINES:
  - Use simple, plain English. Avoid complex security jargon where possible, or explain it if necessary.
  - Focus on the *impact* to the business and user (e.g., data theft, system crash).
  - Be encouraging and constructive.
  - If the code is safe, set severity to "Safe" and explain *why* it's good (e.g., "Input sanitization is correctly implemented").
  
  If the input seems to be an error message from a failed URL fetch, treat it as "Low" severity info.`;

function isValidUrl(string: string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export async function analyzeCode(input: string, scanType: ScanType = "quick") {
    if (!apiKey) {
        return {
            error: "API Key not configured. Please add GEMINI_API_KEY to your .env file."
        };
    }

    // If comprehensive scan is requested and input is a URL, use the comprehensive scanner
    if (scanType === "comprehensive" && isValidUrl(input)) {
        try {
            // Check cache first
            const cachedResult = getCachedScan(input);
            if (cachedResult) {
                console.log("[Analyze] Returning cached comprehensive scan result");
                return {
                    ...cachedResult,
                    cached: true,
                };
            }

            // Perform fresh scan
            const result = await performComprehensiveScan(input);

            // Save report to dashboard
            try {
                const { saveReport } = await import("@/lib/store");
                await saveReport(result, input);
            } catch (saveError) {
                console.error("Failed to save comprehensive report:", saveError);
            }

            // Note: caching is handled inside performComprehensiveScan
            return result;
        } catch (error) {
            console.error("Comprehensive scan error:", error);
            return {
                error: `Comprehensive scan failed: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    // Quick analysis mode with AI fallback
    let contentToAnalyze = input;
    let sourceContext = "Raw Code Snippet";

    // Check if input is a URL
    if (isValidUrl(input)) {
        try {
            sourceContext = `URL Analysis: ${input}`;
            const response = await fetch(input, {
                headers: {
                    'User-Agent': 'SecValidAI-Security-Scanner/1.0'
                },
                next: { revalidate: 0 } // Don't cache security scans
            });

            if (!response.ok) {
                throw new Error(`Failed to access URL: ${response.status} ${response.statusText}`);
            }

            const htmlText = await response.text();
            // Truncate to avoid token limits (approx 20k chars is safe for Flash)
            contentToAnalyze = `
      [CONTEXT: User wants to scan this remote URL: ${input}]
      [CONTENT_START]
      ${htmlText.slice(0, 30000)}
      [CONTENT_END]
      
      Reflect on the HTML source above. Look for: exposed secrets, insecure scripts, missing headers (meta), comments with sensitive info.
      `;

        } catch (error: any) {
            console.error("URL Scan Error:", error);
            const cause = error.cause ? ` (Cause: ${error.cause.message || error.cause})` : "";
            return {
                error: `Could not scan URL: ${error.message}${cause}. Ensure the URL is public and reachable.`
            };
        }
    }

    try {
        // Use AI fallback mechanism
        const { text, modelUsed } = await generateWithFallback(
            contentToAnalyze,
            SYSTEM_INSTRUCTION,
            { maxRetries: 4 }
        );

        const parsedResult = parseAIResponse<any>(text);

        // Add model metadata
        const resultWithMetadata = {
            ...parsedResult,
            modelUsed
        };

        // Save report
        try {
            const { saveReport } = await import("@/lib/store");
            await saveReport(resultWithMetadata, input);
        } catch (saveError) {
            console.error("Failed to save report:", saveError);
        }

        return resultWithMetadata;
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return {
            error: `Failed to analyze content: ${error instanceof Error ? error.message : String(error)}`
        };
    }
}

