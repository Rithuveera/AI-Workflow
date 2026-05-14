import type { HeaderAnalysisResult, SecurityHeaders, CookieAnalysis, ChecklistItem } from "@/types/security";

/**
 * Analyzes HTTP response headers for security configurations
 */
export async function analyzeSecurityHeaders(url: string): Promise<HeaderAnalysisResult> {
    const issues: ChecklistItem[] = [];
    const securityHeaders: SecurityHeaders = {};
    const missingHeaders: string[] = [];
    const cookies: CookieAnalysis[] = [];
    let rawHeaders: Record<string, string> = {};

    try {
        const response = await fetch(url, {
            method: 'HEAD',
            headers: {
                'User-Agent': 'SecValidAI-Security-Scanner/1.0'
            },
            next: { revalidate: 0 }
        });

        // Capture raw headers
        response.headers.forEach((value, key) => {
            rawHeaders[key.toLowerCase()] = value;
        });

        // Extract security headers
        securityHeaders.contentSecurityPolicy = response.headers.get('content-security-policy') || undefined;
        securityHeaders.strictTransportSecurity = response.headers.get('strict-transport-security') || undefined;
        securityHeaders.xFrameOptions = response.headers.get('x-frame-options') || undefined;
        securityHeaders.xContentTypeOptions = response.headers.get('x-content-type-options') || undefined;
        securityHeaders.referrerPolicy = response.headers.get('referrer-policy') || undefined;
        securityHeaders.permissionsPolicy = response.headers.get('permissions-policy') || undefined;
        securityHeaders.server = response.headers.get('server') || undefined;
        securityHeaders.xPoweredBy = response.headers.get('x-powered-by') || undefined;

        // Check for missing critical headers
        if (!securityHeaders.contentSecurityPolicy) {
            missingHeaders.push('Content-Security-Policy');
            issues.push({
                name: 'Missing Content-Security-Policy',
                status: 'fail',
                severity: 'Medium',
                details: 'Content-Security-Policy (CSP) header is not set. This leaves the application vulnerable to XSS attacks.',
                recommendation: 'Add CSP header: Content-Security-Policy: default-src \'self\'; script-src \'self\' \'unsafe-inline\''
            });
        }

        if (!securityHeaders.strictTransportSecurity) {
            missingHeaders.push('Strict-Transport-Security');
            issues.push({
                name: 'Missing HSTS',
                status: 'fail',
                severity: 'High',
                details: 'Strict-Transport-Security (HSTS) header is missing. Users may be vulnerable to man-in-the-middle attacks.',
                recommendation: 'Add HSTS header: Strict-Transport-Security: max-age=31536000; includeSubDomains'
            });
        }

        if (!securityHeaders.xFrameOptions) {
            missingHeaders.push('X-Frame-Options');
            issues.push({
                name: 'Missing X-Frame-Options',
                status: 'fail',
                severity: 'Medium',
                details: 'X-Frame-Options header is missing. The site may be vulnerable to clickjacking attacks.',
                recommendation: 'Add header: X-Frame-Options: DENY or SAMEORIGIN'
            });
        }

        if (!securityHeaders.xContentTypeOptions) {
            missingHeaders.push('X-Content-Type-Options');
            issues.push({
                name: 'Missing X-Content-Type-Options',
                status: 'fail',
                severity: 'Low',
                details: 'X-Content-Type-Options header is missing. Browsers may incorrectly interpret file types.',
                recommendation: 'Add header: X-Content-Type-Options: nosniff'
            });
        }

        // Check for information disclosure
        if (securityHeaders.server) {
            issues.push({
                name: 'Server Header Disclosure',
                status: 'warning',
                severity: 'Low',
                details: `Server header reveals server information: ${securityHeaders.server}. This helps attackers identify potential vulnerabilities.`,
                recommendation: 'Remove or obfuscate the Server header in your web server configuration.'
            });
        }

        if (securityHeaders.xPoweredBy) {
            issues.push({
                name: 'X-Powered-By Header Disclosure',
                status: 'warning',
                severity: 'Low',
                details: `X-Powered-By header reveals technology stack: ${securityHeaders.xPoweredBy}`,
                recommendation: 'Remove the X-Powered-By header from your application configuration.'
            });
        }

        // Analyze cookies
        const setCookieHeaders = response.headers.get('set-cookie');
        if (setCookieHeaders) {
            const cookieStrings = setCookieHeaders.split(',');

            for (const cookieStr of cookieStrings) {
                const cookieAnalysis = analyzeCookie(cookieStr);
                cookies.push(cookieAnalysis);

                // Add issues for insecure cookies
                if (cookieAnalysis.issues.length > 0) {
                    issues.push({
                        name: `Insecure Cookie: ${cookieAnalysis.name}`,
                        status: 'fail',
                        severity: 'High',
                        details: cookieAnalysis.issues.join('. '),
                        recommendation: `Set secure flags: Set-Cookie: ${cookieAnalysis.name}=value; HttpOnly; Secure; SameSite=Strict`
                    });
                }
            }
        }

        // Check HTTPS
        if (!url.startsWith('https://')) {
            issues.push({
                name: 'HTTP Instead of HTTPS',
                status: 'fail',
                severity: 'Critical',
                details: 'The site is accessed over HTTP instead of HTTPS. All data transmitted is unencrypted and can be intercepted.',
                recommendation: 'Implement HTTPS with a valid SSL/TLS certificate. Redirect all HTTP traffic to HTTPS.'
            });
        }

    } catch (error) {
        console.error('Header analysis error:', error);
        issues.push({
            name: 'Header Analysis Failed',
            status: 'warning',
            severity: 'Low',
            details: `Could not analyze headers: ${error instanceof Error ? error.message : String(error)}`,
            recommendation: 'Ensure the URL is accessible and CORS is properly configured.'
        });
    }

    return {
        securityHeaders,
        missingHeaders,
        cookies,
        issues,
        rawHeaders
    };
}

/**
 * Analyzes a single cookie for security attributes
 */
function analyzeCookie(cookieString: string): CookieAnalysis {
    const parts = cookieString.split(';').map(p => p.trim());
    const nameValue = parts[0].split('=');
    const name = nameValue[0];

    const hasHttpOnly = parts.some(p => p.toLowerCase() === 'httponly');
    const hasSecure = parts.some(p => p.toLowerCase() === 'secure');
    const sameSitePart = parts.find(p => p.toLowerCase().startsWith('samesite='));
    const sameSite = sameSitePart ? sameSitePart.split('=')[1] : undefined;

    const issues: string[] = [];

    if (!hasHttpOnly) {
        issues.push('Missing HttpOnly flag - cookie is accessible via JavaScript, vulnerable to XSS attacks');
    }

    if (!hasSecure) {
        issues.push('Missing Secure flag - cookie can be transmitted over unencrypted HTTP connections');
    }

    if (!sameSite || sameSite.toLowerCase() === 'none') {
        issues.push('Missing or weak SameSite attribute - vulnerable to CSRF attacks');
    }

    return {
        name,
        hasHttpOnly,
        hasSecure,
        sameSite,
        issues
    };
}

/**
 * Checks if a URL uses HTTPS
 */
export function isHttps(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}
