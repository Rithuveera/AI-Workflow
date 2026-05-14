import { ShieldCheck, Lock, Database, Globe, Server, AlertOctagon, Package, MousePointerClick, Code, Scale, Shield } from "lucide-react";

export default function ChecklistPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold text-white">Vulnerability Coverage Checklist</h1>
                <p className="text-slate-400 mt-2">
                    The AI Security Assistant is trained to detect the following standard security vulnerabilities
                    in both frontend and backend code.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryCard
                    title="Injection Attacks"
                    icon={Database}
                    color="text-red-400"
                    href="/checklist/injection-attacks"
                    items={[
                        "SQL Injection (SQLi) - Raw queries, unsanitized inputs",
                        "Command Injection - Executing system commands",
                        "NoSQL Injection - MongoDB query manipulation",
                        "LDAP Injection"
                    ]}
                />

                <CategoryCard
                    title="Broken Authentication"
                    icon={Lock}
                    color="text-amber-400"
                    href="/checklist/broken-authentication"
                    items={[
                        "Hardcoded Credentials/Secrets",
                        "Weak Password Policies",
                        "Missing Multi-Factor Authentication (logic checks)",
                        "Session Management Flaws"
                    ]}
                />

                <CategoryCard
                    title="Cross-Site Scripting (XSS)"
                    icon={Globe}
                    color="text-blue-400"
                    href="/checklist/xss"
                    items={[
                        "Reflected XSS - Unsanitized URL parameters",
                        "Stored XSS - Unsafe database content rendering",
                        "DOM-based XSS - Unsafe JavaScript DOM manipulation",
                        "React dangerouslySetInnerHTML usage"
                    ]}
                />

                <CategoryCard
                    title="Security Misconfiguration"
                    icon={Server}
                    color="text-purple-400"
                    href="/checklist/security-misconfiguration"
                    items={[
                        "Exposed .env files or secrets",
                        "Default credentials left unchanged",
                        "Verbose Error Messages (Information Leakage)",
                        "Missing Security Headers (CSP, HSTS)"
                    ]}
                />

                <CategoryCard
                    title="Sensitive Data Exposure"
                    icon={ShieldCheck}
                    color="text-emerald-400"
                    href="/checklist/sensitive-data-exposure"
                    items={[
                        "Logging Sensitive Data (PII, Tokens)",
                        "Weak Encryption Algorithms (MD5, SHA1)",
                        "Hardcoded API Keys",
                        "Data transmission over HTTP"
                    ]}
                />

                <CategoryCard
                    title="Other OWASP Top 10"
                    icon={AlertOctagon}
                    color="text-pink-400"
                    href="/checklist/other-owasp"
                    items={[
                        "Insecure Deserialization",
                        "XML External Entities (XXE)",
                        "Broken Access Control (IDOR)",
                        "Server-Side Request Forgery (SSRF)"
                    ]}
                />

                <CategoryCard
                    title="Vulnerable Dependencies"
                    icon={Package}
                    color="text-orange-400"
                    href="/checklist/vulnerable-dependencies"
                    items={[
                        "Outdated Packages (npm/pip) with CVEs",
                        "Malicious Packages (Typosquatting)",
                        "Missing Lockfiles",
                        "License Compliance Issues"
                    ]}
                />

                <CategoryCard
                    title="CSRF & Client-Side Risks"
                    icon={MousePointerClick}
                    color="text-teal-400"
                    href="/checklist/csrf"
                    items={[
                        "Missing Anti-CSRF Tokens",
                        "SameSite Cookie Configuration",
                        "Clickjacking (X-Frame-Options)",
                        "Open Redirects"
                    ]}
                />

                <CategoryCard
                    title="API Security"
                    icon={Code}
                    color="text-cyan-400"
                    href="/checklist/api-security"
                    items={[
                        "Hidden API Endpoints Detection",
                        "Exposed API Secrets & Keys",
                        "CORS Misconfiguration Analysis",
                        "GraphQL & REST Security Risks",
                        "Rate Limiting & Throttling Checks"
                    ]}
                />

                <CategoryCard
                    title="Compliance & Legal"
                    icon={Scale}
                    color="text-indigo-400"
                    href="/checklist/compliance"
                    items={[
                        "GDPR Compliance (Consent, Privacy Policy)",
                        "PCI-DSS (Payment Security Indicators)",
                        "HIPAA (Healthcare Data Protection)",
                        "Accessibility Compliance (WCAG)",
                        "Terms of Service Presence"
                    ]}
                />

                <CategoryCard
                    title="Privacy & Data Protection"
                    icon={Shield}
                    color="text-violet-400"
                    href="/checklist/privacy"
                    items={[
                        "Third-Party Tracker Identification",
                        "Data Collection Transparency",
                        "Encryption Standards Validation",
                        "Privacy Policy Quality & Completeness",
                        "Data Retention & Deletion Policies"
                    ]}
                />
            </div>

        </div>
    );
}

import Link from "next/link";

function CategoryCard({ title, icon: Icon, color, items, href }: { title: string, icon: any, color: string, items: string[], href?: string }) {
    const cardContent = (
        <div className={`bg-sec-panel border border-sec-border p-6 rounded-lg ${href ? 'cursor-pointer hover:border-blue-500/50 transition-colors' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-slate-900 ${color}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {title}
                    {href && (
                        <span className="text-xs font-normal text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            View Details
                        </span>
                    )}
                </h2>
            </div>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-500 mt-2 shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block group">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}
