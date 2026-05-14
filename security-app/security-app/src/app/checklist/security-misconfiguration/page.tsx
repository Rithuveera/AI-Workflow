import Link from "next/link";
import { ArrowLeft, Server, FileText, Globe, Unlock } from "lucide-react";

export default function SecurityMisconfigurationPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                        <Server className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Security Misconfiguration</h1>
                        <p className="text-slate-400 mt-1">
                            Failures to implement security controls properly for the application stack.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-purple-400">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Information Leakage</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Revealing generic error messages or stack traces to users.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Stack traces enabled in production</li>
                            <li>Verbose error responses revealing version numbers or file paths</li>
                            <li>Exposed `.env` or configuration files</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-purple-400">
                            <Globe className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Missing Security Headers</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Lack of HTTP headers that enforce security policies in the browser.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Missing `Strict-Transport-Security` (HSTS)</li>
                            <li>Missing `Content-Security-Policy` (CSP)</li>
                            <li>Missing `X-Frame-Options` and `X-Content-Type-Options`</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-purple-400">
                            <Unlock className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Default Credentials</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Using default usernames and passwords for new systems or components.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Common default credentials in config files</li>
                            <li>Admin interfaces accessible without strong auth</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
