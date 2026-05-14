import Link from "next/link";
import { ArrowLeft, Code, Lock, Shield, Server, Zap } from "lucide-react";

export default function APISecurityPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Code className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">API Security</h1>
                        <p className="text-slate-400 mt-1">
                            Identifying vulnerabilities in REST, GraphQL, and hidden internal API endpoints.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-cyan-400">
                            <Zap className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Endpoint Detection</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Detecting hidden or undocumented API endpoints in frontend and backend code.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Hardcoded API base URLs and paths</li>
                            <li>Exposed development or staging endpoints</li>
                            <li>Unauthenticated internal debugging interfaces</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-cyan-400">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Secrets & Authentication</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Scanning for exposed API keys, bearer tokens, and weak authentication mechanisms.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>API keys hardcoded in JavaScript bundles</li>
                            <li>Missing Authorization headers for sensitive routes</li>
                            <li>Weak credentials or insecure token storage</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-cyan-400">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Control & Policy</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Analyzing CORS policies and rate limiting configurations.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Wildcard CORS origins <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300">*</code></li>
                            <li>Missing rate limiting headers</li>
                            <li>Insecure GraphQL schemas (introspection enabled)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
