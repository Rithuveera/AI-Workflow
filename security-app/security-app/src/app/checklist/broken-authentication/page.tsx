import Link from "next/link";
import { ArrowLeft, Lock, Key, Shield, UserX } from "lucide-react";

export default function BrokenAuthenticationPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                        <Lock className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Broken Authentication</h1>
                        <p className="text-slate-400 mt-1">
                            Weaknesses in session management and credential handling that allow attackers to compromise identities.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-amber-400">
                            <Key className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Hardcoded Credentials</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Detecting secrets, passwords, or API keys directly embedded in the source code.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Variables measuring entropy or named `password`, `secret`, `key` with string literals</li>
                            <li>Connection strings with embedded passwords</li>
                            <li>AWS keys or other cloud provider credentials in code</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-amber-400">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Weak Password Policies</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Ensuring the application enforces strong password requirements.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Password validation usages (length, complexity)</li>
                            <li>Checking for usage of weak hashing algorithms (MD5, SHA1) for passwords</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-amber-400">
                            <UserX className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Session Management</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Flaws in how session tokens are generated, stored, and invalidated.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Cookies without `HttpOnly` and `Secure` flags</li>
                            <li>Session fixations or lack of token rotation on login</li>
                            <li>Long session timeouts</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
