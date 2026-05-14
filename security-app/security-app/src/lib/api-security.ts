import type { ChecklistItem } from "@/types/security";

/**
 * Detect API endpoints in HTML and JavaScript
 */
export function detectAPIEndpoints(html: string): string[] {
    const endpoints: Set<string> = new Set();

    // Common API patterns
    const patterns = [
        /https?:\/\/[^"'\s]+\/api\/[^"'\s]*/gi,
        /https?:\/\/api\.[^"'\s]+/gi,
        /\/api\/v?\d+\/[^"'\s]*/gi,
        /\/graphql[^"'\s]*/gi,
        /\/rest\/[^"'\s]*/gi,
    ];

    for (const pattern of patterns) {
        const matches = html.match(pattern);
        if (matches) {
            matches.forEach(match => endpoints.add(match));
        }
    }

    return Array.from(endpoints);
}

/**
 * Check for exposed API keys and tokens
 */
export function detectExposedSecrets(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // API key patterns
    const secretPatterns = [
        { name: "AWS Access Key", pattern: /AKIA[0-9A-Z]{16}/g, severity: "Critical" as const },
        { name: "Google API Key", pattern: /AIza[0-9A-Za-z\-_]{35}/g, severity: "Critical" as const },
        { name: "GitHub Token", pattern: /ghp_[0-9a-zA-Z]{36}/g, severity: "Critical" as const },
        { name: "Stripe API Key", pattern: /sk_live_[0-9a-zA-Z]{24,}/g, severity: "Critical" as const },
        { name: "Generic API Key", pattern: /api[_-]?key['"]?\s*[:=]\s*['"][^'"]{20,}/gi, severity: "High" as const },
        { name: "Bearer Token", pattern: /bearer\s+[a-zA-Z0-9\-._~+\/]+=*/gi, severity: "High" as const },
        { name: "JWT Token", pattern: /eyJ[a-zA-Z0-9\-_]+\.eyJ[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+/g, severity: "High" as const },
    ];

    for (const { name, pattern, severity } of secretPatterns) {
        const matches = html.match(pattern);
        if (matches && matches.length > 0) {
            issues.push({
                name: `Exposed ${name}`,
                status: "fail",
                severity,
                details: `Found ${matches.length} potential ${name}(s) exposed in the HTML/JavaScript code. This is a critical security vulnerability.`,
                recommendation: `Remove all hardcoded API keys and tokens. Use environment variables and server-side API calls instead.`,
                affectedCode: matches.slice(0, 2).join(", ") + (matches.length > 2 ? "..." : ""),
            });
        }
    }

    return issues;
}

/**
 * Analyze CORS configuration
 */
export function analyzeCORS(headers: Record<string, string>): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check for overly permissive CORS
    const allowOrigin = headers['access-control-allow-origin'];
    const allowCredentials = headers['access-control-allow-credentials'];

    if (allowOrigin === '*') {
        issues.push({
            name: "Overly Permissive CORS",
            status: "fail",
            severity: "Medium",
            details: "CORS is configured to allow requests from any origin (*). This can expose your API to unauthorized access.",
            recommendation: "Restrict CORS to specific trusted domains: Access-Control-Allow-Origin: https://yourdomain.com",
        });

        if (allowCredentials === 'true') {
            issues.push({
                name: "CORS Credentials with Wildcard",
                status: "fail",
                severity: "High",
                details: "CORS allows credentials with wildcard origin. This is a security misconfiguration.",
                recommendation: "Never use Access-Control-Allow-Credentials: true with Access-Control-Allow-Origin: *",
            });
        }
    } else if (!allowOrigin) {
        // Optional: Warn if no CORS headers are present at all, or pass if that's expected.
        // For now, let's just pass or ignore.
    }

    return issues;
}

/**
 * Check for GraphQL introspection exposure
 */
export function checkGraphQLSecurity(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check if GraphQL endpoint is detected
    const hasGraphQL = /\/graphql/gi.test(html) || /__schema/gi.test(html);

    if (hasGraphQL) {
        // Check for introspection query
        const hasIntrospection = /__schema|__type|IntrospectionQuery/gi.test(html);

        if (hasIntrospection) {
            issues.push({
                name: "GraphQL Introspection Enabled",
                status: "warning",
                severity: "Medium",
                details: "GraphQL introspection appears to be enabled. This allows attackers to discover your entire API schema.",
                recommendation: "Disable introspection in production: { introspection: false } in Apollo Server or equivalent.",
            });
        }

        // Check for GraphQL playground/IDE
        const hasPlayground = /graphql-playground|graphiql|apollo-sandbox/gi.test(html);
        if (hasPlayground) {
            issues.push({
                name: "GraphQL IDE Exposed",
                status: "fail",
                severity: "Medium",
                details: "GraphQL IDE/Playground is accessible in production. This exposes your API schema and allows unauthorized testing.",
                recommendation: "Disable GraphQL IDE in production environments.",
            });
        }
    }

    return issues;
}

/**
 * Detect rate limiting implementation
 */
export function checkRateLimiting(headers: Record<string, string>): ChecklistItem {
    // Look for rate limiting headers or indicators
    const hasRateLimitHeaders =
        Object.keys(headers).some(h =>
            h.includes('ratelimit') ||
            h === 'retry-after' ||
            h.startsWith('x-rate-limit')
        );

    if (hasRateLimitHeaders) {
        return {
            name: "Rate Limiting",
            status: "pass",
            details: "Rate limiting headers detected. API appears to have rate limiting implemented.",
        };
    }

    return {
        name: "Rate Limiting",
        status: "warning",
        severity: "Medium",
        details: "No rate limiting headers detected. API may be vulnerable to abuse and DoS attacks.",
        recommendation: "Implement rate limiting using headers like X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After.",
    };
}

/**
 * Check authentication mechanisms
 */
export function analyzeAuthentication(html: string): ChecklistItem[] {
    const issues: ChecklistItem[] = [];

    // Check for basic auth in URLs
    const basicAuthInURL = /https?:\/\/[^:]+:[^@]+@/gi.test(html);
    if (basicAuthInURL) {
        issues.push({
            name: "Credentials in URL",
            status: "fail",
            severity: "Critical",
            details: "Credentials found in URL (username:password@domain). This is extremely insecure.",
            recommendation: "Never include credentials in URLs. Use proper authentication headers or tokens.",
        });
    }

    // Check for OAuth/JWT patterns
    const hasOAuth = /oauth|access_token|refresh_token/gi.test(html);
    const hasJWT = /authorization:\s*bearer/gi.test(html);

    if (hasOAuth || hasJWT) {
        issues.push({
            name: "Token-Based Authentication",
            status: "pass",
            details: "Modern token-based authentication (OAuth/JWT) detected.",
        });
    }

    return issues;
}
