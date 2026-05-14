import type { ChecklistItem } from "@/types/security";

/**
 * Detect third-party trackers and analytics
 */
export function detectTrackers(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];
    const trackers: string[] = [];

    // Common tracker patterns
    const trackerPatterns = [
        { name: "Google Analytics", pattern: /google-analytics\.com|googletagmanager\.com|gtag\(/gi },
        { name: "Facebook Pixel", pattern: /connect\.facebook\.net|fbq\(/gi },
        { name: "Google Ads", pattern: /googleadservices\.com|googlesyndication\.com/gi },
        { name: "Hotjar", pattern: /hotjar\.com/gi },
        { name: "Mixpanel", pattern: /mixpanel\.com/gi },
        { name: "Segment", pattern: /segment\.(com|io)/gi },
        { name: "Amplitude", pattern: /amplitude\.com/gi },
        { name: "FullStory", pattern: /fullstory\.com/gi },
        { name: "Intercom", pattern: /intercom\.io/gi },
        { name: "Heap Analytics", pattern: /heapanalytics\.com/gi },
    ];

    for (const { name, pattern } of trackerPatterns) {
        if (pattern.test(html)) {
            trackers.push(name);
        }
    }

    if (trackers.length > 0) {
        issues.push({
            name: "Third-Party Trackers",
            status: "warning",
            severity: "Medium",
            details: `Detected ${trackers.length} third-party tracker(s): ${trackers.join(", ")}. These may collect user data and require disclosure in privacy policy.`,
            recommendation: "Ensure all trackers are disclosed in your privacy policy and cookie consent banner. Consider user privacy and minimize tracking where possible.",
            affectedCode: trackers.join(", "),
        });
    } else {
        issues.push({
            name: "Third-Party Trackers",
            status: "pass",
            details: "No common third-party trackers detected.",
        });
    }

    return issues;
}

/**
 * Analyze data collection forms
 */
export function analyzeDataCollection(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check for email collection
    const hasEmailInput = /<input[^>]*type=['"]?email/gi.test(html);
    if (hasEmailInput) {
        const hasPrivacyNotice = /privacy.*policy|we.*won't.*spam|unsubscribe/gi.test(html);

        if (!hasPrivacyNotice) {
            issues.push({
                name: "Email Collection Privacy Notice",
                status: "warning",
                severity: "Medium",
                details: "Email input fields found without clear privacy notice or unsubscribe information.",
                recommendation: "Add a privacy notice near email collection forms explaining how the email will be used and how to unsubscribe.",
            });
        } else {
            issues.push({
                name: "Email Collection Privacy Notice",
                status: "pass",
                details: "Email collection with privacy notice detected.",
            });
        }
    }

    // Check for password fields
    const hasPasswordInput = /<input[^>]*type=['"]?password/gi.test(html);
    if (hasPasswordInput) {
        // Check for password requirements
        const hasPasswordRequirements = /password.*must|minimum.*characters|uppercase|lowercase|special.*character/gi.test(html);

        if (hasPasswordRequirements) {
            issues.push({
                name: "Password Requirements",
                status: "pass",
                details: "Password strength requirements are communicated to users.",
            });
        } else {
            issues.push({
                name: "Password Requirements",
                status: "warning",
                severity: "Low",
                details: "Password input found without clear strength requirements.",
                recommendation: "Display password requirements (minimum length, complexity) to help users create strong passwords.",
            });
        }
    }

    // Check for personal data collection
    const hasPIIFields = /name|address|phone|ssn|social.*security|date.*of.*birth|dob/gi.test(html);
    if (hasPIIFields) {
        issues.push({
            name: "Personal Data Collection",
            status: "warning",
            severity: "Medium",
            details: "Forms collecting personal identifiable information (PII) detected. Ensure proper data protection measures.",
            recommendation: "Implement encryption, secure storage, and clear privacy disclosures for all PII collection.",
        });
    }

    return issues;
}

/**
 * Check encryption standards
 */
export function checkEncryptionStandards(url: string, html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check HTTPS
    const isHTTPS = url.startsWith("https://");
    if (isHTTPS) {
        issues.push({
            name: "HTTPS Encryption",
            status: "pass",
            details: "Site uses HTTPS for encrypted data transmission.",
        });
    } else {
        issues.push({
            name: "HTTPS Encryption",
            status: "fail",
            severity: "Critical",
            details: "Site does not use HTTPS. All data is transmitted in plain text.",
            recommendation: "Implement SSL/TLS certificate and redirect all HTTP traffic to HTTPS.",
        });
    }

    // Check for mixed content warnings
    const hasMixedContent = isHTTPS && /http:\/\/(?!localhost)/gi.test(html);
    if (hasMixedContent) {
        issues.push({
            name: "Mixed Content",
            status: "fail",
            severity: "High",
            details: "HTTPS page contains HTTP resources (mixed content). This weakens encryption and triggers browser warnings.",
            recommendation: "Ensure all resources (images, scripts, stylesheets) are loaded over HTTPS.",
        });
    }

    // Check for encryption mentions
    const mentionsEncryption = /aes|rsa|end-to-end.*encrypt|256.*bit|encryption.*at.*rest/gi.test(html);
    if (mentionsEncryption) {
        issues.push({
            name: "Encryption Disclosure",
            status: "pass",
            details: "Site mentions encryption standards (AES, RSA, end-to-end encryption).",
        });
    }

    return issues;
}

/**
 * Validate privacy policy presence and quality
 */
export function validatePrivacyPolicy(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    const hasPrivacyPolicy = /privacy.*policy|privacy.*notice/gi.test(html);

    if (!hasPrivacyPolicy) {
        issues.push({
            name: "Privacy Policy Presence",
            status: "fail",
            severity: "High",
            details: "No privacy policy link found. Most jurisdictions require a privacy policy for websites collecting user data.",
            recommendation: "Create and prominently link to a comprehensive privacy policy.",
        });
        return issues;
    }

    issues.push({
        name: "Privacy Policy Presence",
        status: "pass",
        details: "Privacy policy link found.",
    });

    // Check for key privacy policy elements
    const hasDataCollection = /what.*data.*we.*collect|information.*we.*collect/gi.test(html);
    const hasDataUsage = /how.*we.*use|purpose.*of.*processing/gi.test(html);
    const hasDataSharing = /third.*party|share.*your.*data|disclosure/gi.test(html);
    const hasUserRights = /your.*rights|opt.*out|delete.*data/gi.test(html);

    let missingElements: string[] = [];
    if (!hasDataCollection) missingElements.push("data collection disclosure");
    if (!hasDataUsage) missingElements.push("data usage explanation");
    if (!hasDataSharing) missingElements.push("third-party sharing disclosure");
    if (!hasUserRights) missingElements.push("user rights information");

    if (missingElements.length > 0) {
        issues.push({
            name: "Privacy Policy Completeness",
            status: "warning",
            severity: "Medium",
            details: `Privacy policy may be missing: ${missingElements.join(", ")}.`,
            recommendation: "Ensure privacy policy covers: what data is collected, how it's used, who it's shared with, and user rights.",
        });
    } else {
        issues.push({
            name: "Privacy Policy Completeness",
            status: "pass",
            details: "Privacy policy appears to cover key elements.",
        });
    }

    return issues;
}

/**
 * Check for data retention policies
 */
export function checkDataRetention(html: string): ChecklistItem {
    const hasRetentionPolicy = /data.*retention|how.*long.*we.*keep|retention.*period|delete.*after/gi.test(html);

    if (hasRetentionPolicy) {
        return {
            name: "Data Retention Policy",
            status: "pass",
            details: "Data retention policy information found.",
        };
    }

    return {
        name: "Data Retention Policy",
        status: "warning",
        severity: "Low",
        details: "No clear data retention policy found. Users should know how long their data is stored.",
        recommendation: "Add information about data retention periods and deletion policies to your privacy policy.",
    };
}
