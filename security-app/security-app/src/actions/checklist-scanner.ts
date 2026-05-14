"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { analyzeSecurityHeaders, isHttps } from "@/lib/security-headers";
import { generateWithFallback, parseAIResponse } from "@/lib/ai-fallback";
import { setCachedScan } from "@/lib/cache";
import { calculateCategoryScore, getErrorCategory } from "@/lib/utils";
import type {
    ComprehensiveScanResult,
    CategoryResult,
    ChecklistItem,
    SecuritySeverity,
    HeaderAnalysisResult
} from "@/types/security";
import {
    analyzeAPISecurity,
    analyzeCompliance,
    analyzePrivacyProtection,
    analyzeBusinessLogic,
    analyzeDeceptiveDesign
} from "./new-categories";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * Performs a comprehensive security scan checking all OWASP categories
 */
export async function performComprehensiveScan(url: string): Promise<ComprehensiveScanResult> {
    const startTime = Date.now();

    if (!apiKey) {
        throw new Error("API Key not configured");
    }

    if (!isValidUrl(url)) {
        throw new Error("Invalid URL provided");
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'SecValidAI-Security-Scanner/1.0'
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const htmlContent = await response.text();
        const headerAnalysis = await analyzeSecurityHeaders(url);
        const robotsTxtFound = await checkExternalFile(url, "/robots.txt");
        const adsTxtFound = await checkExternalFile(url, "/ads.txt");

        const categoryResults = await Promise.all([
            analyzeInjectionAttacks(htmlContent, url),
            analyzeBrokenAuthentication(htmlContent, url, headerAnalysis),
            analyzeXSS(htmlContent, url),
            analyzeSecurityMisconfiguration(htmlContent, url, headerAnalysis),
            analyzeSensitiveDataExposure(htmlContent, url),
            analyzeOWASPTop10(htmlContent, url),
            analyzeSupplyChain(htmlContent, url),
            analyzeCSRFAndClientSide(htmlContent, url, headerAnalysis),
            analyzeAPISecurity(htmlContent, url, headerAnalysis.rawHeaders),
            analyzeCompliance(htmlContent, url),
            analyzePrivacyProtection(htmlContent, url),
            analyzeBusinessLogic(htmlContent, url),
            analyzeDeceptiveDesign(htmlContent, url),
        ]);

        if (robotsTxtFound || adsTxtFound) {
            const misconfig = categoryResults.find(c => c.category === "Security Misconfiguration");
            if (misconfig) {
                if (robotsTxtFound) {
                    misconfig.items.push({
                        name: "Robots.txt Policy",
                        status: "pass",
                        details: "Found robots.txt file, which helps guide search engines and bots."
                    });
                }
                if (adsTxtFound) {
                    misconfig.items.push({
                        name: "Ads.txt Verification",
                        status: "pass",
                        details: "Found ads.txt file, improving advertising transparency."
                    });
                }
                misconfig.score = calculateCategoryScore(misconfig.items);
            }
        }

        const overallScore = calculateOverallScore(categoryResults);
        const severity = calculateSeverity(categoryResults);
        const summary = generateSummary(categoryResults);
        const details = generateDetails(categoryResults);
        const recommendation = generateRecommendations(categoryResults);
        const riskScore = calculateRiskScore(categoryResults);

        const result: ComprehensiveScanResult = {
            scanType: "comprehensive",
            url,
            timestamp: new Date().toISOString(),
            duration: Math.round((Date.now() - startTime) / 1000),
            overallScore,
            severity,
            summary,
            details,
            riskScore,
            recommendation,
            categoryResults,
            headerAnalysis
        };

        await setCachedScan(url, result);
        return result;
    } catch (error) {
        console.error("Scan failed:", error);
        throw error;
    }
}

async function analyzeInjectionAttacks(html: string, url: string): Promise<CategoryResult> {
    const systemInstruction = `Analyze for INJECTION VULNERABILITIES (SQLi, NoSQLi, Command Injection):
1. User input reflected in DB-like context
2. Unsafe concatenation in scripts
3. Form fields with suspicious names

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for any vulnerabilities found.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze for injection on ${url}:\n\n<CONTENT>\n${html.slice(0, 15000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "Injection Attacks",
            icon: "database",
            color: "text-red-500",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return getErrorCategory("Injection Attacks", "database", "text-red-500");
    }
}

async function analyzeBrokenAuthentication(html: string, url: string, headerAnalysis: HeaderAnalysisResult): Promise<CategoryResult> {
    const systemInstruction = `Analyze for BROKEN AUTHENTICATION:
1. Session management flaws
2. Weak password policies in forms
3. Lack of MFA indicators
4. Improper cookie flags (HttpOnly, Secure)

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for authentication fixes.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze authentication for ${url}:\n\nHeaders: ${JSON.stringify(headerAnalysis.rawHeaders)}\n\n<CONTENT>\n${html.slice(0, 10000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "Broken Authentication",
            icon: "user-x",
            color: "text-orange-500",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return getErrorCategory("Broken Authentication", "user-x", "text-orange-500");
    }
}

async function analyzeXSS(html: string, url: string): Promise<CategoryResult> {
    const systemInstruction = `Analyze for CROSS-SITE SCRIPTING (XSS):
1. Reflected XSS - User input in script/HTML
2. Stored XSS - Potential storage of unsanitized input
3. DOM-based XSS - Unsafe JavaScript DOM manipulation
4. React dangerouslySetInnerHTML - Unsafe HTML rendering

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for any vulnerabilities found.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze for XSS on ${url}:\n\n<CONTENT>\n${html.slice(0, 15000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "Cross-Site Scripting (XSS)",
            icon: "layout",
            color: "text-pink-500",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return getErrorCategory("Cross-Site Scripting (XSS)", "layout", "text-pink-500");
    }
}

async function analyzeSecurityMisconfiguration(html: string, url: string, headerAnalysis: HeaderAnalysisResult): Promise<CategoryResult> {
    const items: ChecklistItem[] = [];

    // Header checks (Static)
    const headerIssues = headerAnalysis.issues || [];
    items.push(...headerIssues);

    if (!isHttps(url)) {
        items.push({
            name: "HTTPS Protocol",
            status: "fail",
            severity: "High",
            details: "Site is not using HTTPS. Data is transmitted in cleartext.",
            recommendation: "Switch to HTTPS immediately with an SSL/TLS certificate.",
            fixCode: "RewriteEngine On\nRewriteCond %{HTTPS} off\nRewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]"
        });
    }

    try {
        const systemInstruction = `Analyze for SECURITY MISCONFIGURATIONS:
1. Sample pages or unused features exposed
2. Verbose error messages in UI
3. Default configurations or test routes

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for hardening suggestions.`;

        const { text } = await generateWithFallback(
            `Analyze security misconfig for ${url}:\n\n<CONTENT>\n${html.slice(0, 10000)}\n</CONTENT>`,
            systemInstruction
        );
        const aiItems = parseAIResponse<ChecklistItem[]>(text);
        items.push(...aiItems);
    } catch (_) {
        console.warn("AI Misconfig enrichment failed.");
    }

    return {
        category: "Security Misconfiguration",
        icon: "settings",
        color: "text-blue-500",
        score: calculateCategoryScore(items),
        items,
    };
}

async function analyzeSensitiveDataExposure(html: string, url: string): Promise<CategoryResult> {
    const systemInstruction = `Analyze for SENSITIVE DATA EXPOSURE:
1. PII exposure (emails, phones, etc.)
2. Secrets in comments or scripts
3. Weak Encryption - MD5, SHA1, or other weak algorithms
4. Logging Sensitive Data - Console logs with passwords/tokens

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for security fixes.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze data exposure for ${url}:\n\n<CONTENT>\n${html.slice(0, 10000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "Sensitive Data Exposure",
            icon: "eye-off",
            color: "text-yellow-500",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return getErrorCategory("Sensitive Data Exposure", "eye-off", "text-yellow-500");
    }
}

async function analyzeOWASPTop10(html: string, url: string): Promise<CategoryResult> {
    const systemInstruction = `Analyze for other OWASP TOP 10 vulnerabilities:
1. Insecure Deserialization
2. XML External Entities (XXE)
3. Broken Access Control (IDOR)
4. Server-Side Request Forgery (SSRF)

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for recommendations.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze OWASP patterns for ${url}:\n\n<CONTENT>\n${html.slice(0, 10000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "OWASP Top 10",
            icon: "alert-triangle",
            color: "text-purple-500",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return getErrorCategory("OWASP Top 10", "alert-triangle", "text-purple-500");
    }
}

async function analyzeSupplyChain(html: string, url: string): Promise<CategoryResult> {
    const systemInstruction = `Analyze for SUPPLY CHAIN & DEPENDENCY risks:
1. Outdated libraries in script tags
2. Known CVEs in detected frameworks (React, Vue, jQuery versions)
3. Subresource Integrity (SRI) missing on CDNs
4. Suspicious/Unknown script origins

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for SRI or update suggestions.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze supply chain for ${url}:\n\n<CONTENT>\n${html.slice(0, 15000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "Supply Chain & Dependencies",
            icon: "link",
            color: "text-emerald-500",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return getErrorCategory("Supply Chain & Dependencies", "link", "text-emerald-500");
    }
}

async function analyzeCSRFAndClientSide(html: string, url: string, headerAnalysis: HeaderAnalysisResult): Promise<CategoryResult> {
    const systemInstruction = `Analyze for CSRF & CLIENT-SIDE RISKS:
1. CSRF Tokens - Check forms for anti-CSRF tokens
2. Clickjacking Protection - X-Frame-Options header
3. Open Redirects - Unsafe redirect parameters

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for CSRF protection or redirect fixes.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze for CSRF:\n\nURL: ${url}\n\n<CONTENT>\n${html.slice(0, 15000)}\n</CONTENT>`,
            systemInstruction
        );
        const items: ChecklistItem[] = parseAIResponse(text);

        return {
            category: "CSRF & Client-Side Risks",
            icon: "mouse-pointer-click",
            color: "text-teal-400",
            score: calculateCategoryScore(items),
            items
        };
    } catch (_) {
        return getErrorCategory("CSRF & Client-Side Risks", "mouse-pointer-click", "text-teal-400");
    }
}

async function checkExternalFile(baseUrl: string, filename: string): Promise<boolean> {
    try {
        const url = new URL(filename, baseUrl).toString();
        const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        return response.ok;
    } catch {
        return false;
    }
}

// Helper functions

function isValidUrl(string: string): boolean {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}

function calculateOverallScore(categories: CategoryResult[]): number {
    const totalScore = categories.reduce((sum, cat) => sum + cat.score, 0);
    return Math.round(totalScore / categories.length);
}

function calculateSeverity(categories: CategoryResult[]): SecuritySeverity {
    const hasCritical = categories.some(cat =>
        cat.items.some(item => item.severity === "Critical" && item.status === "fail")
    );
    const hasHigh = categories.some(cat =>
        cat.items.some(item => item.severity === "High" && item.status === "fail")
    );
    const hasMedium = categories.some(cat =>
        cat.items.some(item => item.severity === "Medium" && item.status === "fail")
    );

    if (hasCritical) return "Critical";
    if (hasHigh) return "High";
    if (hasMedium) return "Medium";
    return "Low";
}

function generateSummary(categories: CategoryResult[]): string {
    const failedItems = categories.flatMap(cat =>
        cat.items.filter(item => item.status === "fail")
    );

    if (failedItems.length === 0) {
        return "No critical security vulnerabilities detected. Site follows security best practices.";
    }

    const criticalCount = failedItems.filter(i => i.severity === "Critical").length;
    const highCount = failedItems.filter(i => i.severity === "High").length;
    const mediumCount = failedItems.filter(i => i.severity === "Medium").length;

    return `Found ${failedItems.length} security issues: ${criticalCount} Critical, ${highCount} High, ${mediumCount} Medium severity.`;
}

function generateDetails(categories: CategoryResult[]): string {
    const failedCategories = categories.filter(cat => cat.score < 100);

    if (failedCategories.length === 0) {
        return "All security categories passed validation. The application demonstrates good security practices.";
    }

    return failedCategories.map(cat => {
        const failedItems = cat.items.filter(i => i.status === "fail");
        return `**${cat.category}** (Score: ${cat.score}%):\n${failedItems.map(i => `- ${i.name}: ${i.details}`).join('\n')}`;
    }).join('\n\n');
}

function generateRecommendations(categories: CategoryResult[]): string {
    const failedItems = categories.flatMap(cat =>
        cat.items.filter(item => item.status === "fail" && item.recommendation)
    );

    if (failedItems.length === 0) {
        return "Continue following security best practices and perform regular security audits.";
    }

    return failedItems
        .sort((a, b) => {
            const severityOrder: Record<SecuritySeverity, number> = {
                "Critical": 0,
                "High": 1,
                "Medium": 2,
                "Low": 3,
                "Safe": 4
            };
            return (severityOrder[a.severity || "Low"]) - (severityOrder[b.severity || "Low"]);
        })
        .map((item, idx) => `${idx + 1}. **${item.name}**: ${item.recommendation}`)
        .join('\n\n');
}

function calculateRiskScore(categories: CategoryResult[]): number {
    let riskPoints = 0;

    const failedItems = categories.flatMap(cat =>
        cat.items.filter(item => item.status === "fail")
    );

    // Weighted risk calculation
    failedItems.forEach(item => {
        switch (item.severity) {
            case "Critical": riskPoints += 40; break;
            case "High": riskPoints += 20; break;
            case "Medium": riskPoints += 10; break;
            case "Low": riskPoints += 2; break;
            default: riskPoints += 5;
        }
    });

    const overallScore = calculateOverallScore(categories);
    riskPoints += (100 - overallScore) * 0.5;

    return Math.min(Math.round(riskPoints), 100);
}
