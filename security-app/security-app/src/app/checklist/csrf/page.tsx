import Link from "next/link";
import { ArrowLeft, MousePointerClick, Shield, Frame, Cookie } from "lucide-react";

export default function CSRFPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400">
                        <MousePointerClick className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">CSRF & Client-Side Risks</h1>
                        <p className="text-slate-400 mt-1">
                            Attacks that trick users into performing unwanted actions or hijack their UI.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-teal-400">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Cross-Site Request Forgery (CSRF)</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Forcing an end user to execute unwanted actions on a web application in which they are authenticated.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Missing Anti-CSRF tokens in state-changing forms (POST/PUT/DELETE)</li>
                            <li>Validation of `Origin` and `Referer` headers</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-teal-400">
                            <Cookie className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Cookie Security</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Improper configuration of cookies allowing for cross-site leakage.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Missing `SameSite` attribute (should be `Strict` or `Lax`)</li>
                            <li>Cookies accessible via JavaScript (missing `HttpOnly` - duplicated in Auth but relevant here)</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-teal-400">
                            <Frame className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Clickjacking</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Trick users into clicking something different from what they perceive.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Missing `X-Frame-Options` header (DENY or SAMEORIGIN)</li>
                            <li>Missing CSP `frame-ancestors` directive</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
