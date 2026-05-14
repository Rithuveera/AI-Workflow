import { CategoryResult, ChecklistItem } from "@/types/security";
import {
    detectAPIEndpoints,
    detectExposedSecrets,
    analyzeCORS,
    checkGraphQLSecurity,
    checkRateLimiting,
    analyzeAuthentication
} from "@/lib/api-security";
import {
    checkGDPRCompliance,
    checkPCIDSSCompliance,
    checkHIPAACompliance,
    checkTermsOfService,
    checkAccessibilityCompliance
} from "@/lib/compliance-checker";
import {
    detectTrackers,
    analyzeDataCollection,
    checkEncryptionStandards,
    validatePrivacyPolicy,
    checkDataRetention
} from "@/lib/privacy-analyzer";
import { calculateCategoryScore } from "@/lib/utils";
import { generateWithFallback, parseAIResponse } from "@/lib/ai-fallback";

/**
 * Category 9: API Security
 */
export async function analyzeAPISecurity(html: string, url: string, rawHeaders: Record<string, string> = {}): Promise<CategoryResult> {
    const items: ChecklistItem[] = [];

    // Detect API endpoints
    const endpoints = detectAPIEndpoints(html);
    if (endpoints.length > 0) {
        items.push({
            name: "API Endpoints Detected",
            status: "warning",
            severity: "Low",
            details: `Found ${endpoints.length} API endpoint(s) in the HTML/JavaScript. Ensure they have proper authentication and authorization.`,
            recommendation: "Review all API endpoints for proper security controls.",
            affectedCode: endpoints.slice(0, 3).join(", ") + (endpoints.length > 3 ? "..." : ""),
        });
    }

    // Check for exposed secrets
    const secretIssues = detectExposedSecrets(html);
    items.push(...secretIssues);

    // Analyze CORS (Uses headers)
    const corsIssues = analyzeCORS(rawHeaders);
    items.push(...corsIssues);

    // Check GraphQL security
    const graphqlIssues = checkGraphQLSecurity(html);
    items.push(...graphqlIssues);

    // Check rate limiting (Uses headers)
    items.push(checkRateLimiting(rawHeaders));

    // Analyze authentication
    const authIssues = analyzeAuthentication(html);
    items.push(...authIssues);

    // If no issues found, add a pass item
    if (items.length === 0 || items.every(i => i.status === "pass")) {
        items.push({
            name: "API Security",
            status: "pass",
            details: "No significant API security issues detected.",
        });
    }

    return {
        category: "API Security",
        icon: "code",
        color: "text-cyan-400",
        score: calculateCategoryScore(items),
        items,
    };
}

/**
 * Category 10: Compliance Validation (Hybrid AI)
 */
export async function analyzeCompliance(html: string, url: string): Promise<CategoryResult> {
    const items: ChecklistItem[] = [];

    // Static Analysis
    items.push(...checkGDPRCompliance(html, url));
    items.push(...checkPCIDSSCompliance(html));
    items.push(...checkHIPAACompliance(html));
    items.push(checkTermsOfService(html));
    items.push(...checkAccessibilityCompliance(html));

    // AI Enrichment for high-risk compliance
    try {
        const systemInstruction = `Analyze for COMPLIANCE & LEGAL logic:
1. Deceptive Consent - Are cookie banners manipulative?
2. Dark Patterns - Does the UI trick users into giving up rights?
3. Incomplete Legal Disclosures - Beyond just keywords, is the context legally sound?

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for UI fixes.`;

        const { text } = await generateWithFallback(
            `Analyze compliance logic for ${url}:\n\n<CONTENT>\n${html.slice(0, 10000)}\n</CONTENT>`,
            systemInstruction
        );
        const aiItems = parseAIResponse<ChecklistItem[]>(text);
        items.push(...aiItems);
    } catch (_) {
        console.warn("AI Compliance enrichment failed, using static only.");
    }

    return {
        category: "Compliance & Legal",
        icon: "scale",
        color: "text-indigo-400",
        score: calculateCategoryScore(items),
        items,
    };
}

/**
 * Category 11: Privacy & Data Protection (Hybrid AI)
 */
export async function analyzePrivacyProtection(html: string, url: string): Promise<CategoryResult> {
    const items: ChecklistItem[] = [];

    // Static Analysis
    items.push(...detectTrackers(html));
    items.push(...analyzeDataCollection(html));
    items.push(...checkEncryptionStandards(url, html));
    items.push(...validatePrivacyPolicy(html));
    items.push(checkDataRetention(html));

    // AI Enrichment for data privacy quality
    try {
        const systemInstruction = `Analyze for PRIVACY & DATA PROTECTION:
1. Stealth Data Collection - Is data sent to 3rd parties without clear UI indication?
2. Quality of Privacy Notice - Is the language clear or intentionally vague?
3. Privacy by Design - Does the UI emphasize privacy?

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for recommended UI changes.`;

        const { text } = await generateWithFallback(
            `Analyze privacy quality for ${url}:\n\n<CONTENT>\n${html.slice(0, 10000)}\n</CONTENT>`,
            systemInstruction
        );
        const aiItems = parseAIResponse<ChecklistItem[]>(text);
        items.push(...aiItems);
    } catch (_) {
        console.warn("AI Privacy enrichment failed.");
    }

    return {
        category: "Privacy & Data Protection",
        icon: "shield",
        color: "text-violet-400",
        score: calculateCategoryScore(items),
        items,
    };
}

/**
 * Category 12: Business Logic Flaws
 */
export async function analyzeBusinessLogic(html: string, url: string): Promise<CategoryResult> {
    const systemInstruction = `Analyze for BUSINESS LOGIC FLAWS:
1. Client-side Validation Only - Are security checks only in JS?
2. Parameter Tampering - Can prices or IDs be changed in the UI?
3. Improper Workflow - Can steps in a process be skipped?
4. Insecure State Management - Is sensitive state stored in local storage?

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
Use "fixCode" for server-side implementation sketches or UI fixes.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze business logic for ${url}:\n\n<CONTENT>\n${html.slice(0, 15000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "Business Logic Security",
            icon: "briefcase",
            color: "text-yellow-400",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return {
            category: "Business Logic Security",
            icon: "briefcase",
            color: "text-yellow-400",
            score: 0,
            items: []
        };
    }
}

/**
 * Category 13: Deceptive Design & Phishing
 */
export async function analyzeDeceptiveDesign(html: string, url: string): Promise<CategoryResult> {
    const systemInstruction = `Analyze for DECEPTIVE DESIGN & PHISHING markers:
1. Deceptive UI - Does it mimic a bank or major service?
2. Urgent Messaging - "Your account will be deleted in 10 minutes"
3. Domain Spoofing Signs - Deceptive links or button text
4. Dark Patterns - Intentional user confusion

Respond with a JSON array of objects following this schema:
{ "name": string, "status": "pass" | "fail" | "warning", "severity": "Critical" | "High" | "Medium" | "Low", "details": string, "recommendation": string, "fixCode"?: string }
High severity if it looks like a phishing page.`;

    try {
        const { text } = await generateWithFallback(
            `Analyze for deception on ${url}:\n\n<CONTENT>\n${html.slice(0, 15000)}\n</CONTENT>`,
            systemInstruction
        );
        const items = parseAIResponse<ChecklistItem[]>(text);
        return {
            category: "Deceptive Design (Phishing)",
            icon: "mask",
            color: "text-orange-600",
            score: calculateCategoryScore(items),
            items,
        };
    } catch (_) {
        return {
            category: "Deceptive Design (Phishing)",
            icon: "mask",
            color: "text-orange-600",
            score: 0,
            items: []
        };
    }
}
