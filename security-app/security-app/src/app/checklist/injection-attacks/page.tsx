import Link from "next/link";
import { ArrowLeft, Database, Terminal, ShieldAlert, Code } from "lucide-react";

export default function InjectionAttacksPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                        <Database className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Injection Attacks</h1>
                        <p className="text-slate-400 mt-1">
                            Critical vulnerabilities where untrusted data is sent to an interpreter.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SQL Injection */}
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-red-400">
                            <Database className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">SQL Injection (SQLi)</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Occurs when unsanitized user input is concatenated directly into database queries.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Raw SQL query strings using concatenation (e.g., <code className="bg-slate-900 px-1 py-0.5 rounded text-red-300">"SELECT * FROM users WHERE id = " + id</code>)</li>
                            <li>Unsanitized input in ORM `raw()` or `execute()` methods</li>
                            <li>Lack of parameterized queries</li>
                        </ul>
                    </div>
                </div>

                {/* Command Injection */}
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-orange-400">
                            <Terminal className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Command Injection</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Happens when an application passes unsafe user supplied data (forms, cookies, HTTP headers etc.) to a system shell.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Usage of <code className="bg-slate-900 px-1 py-0.5 rounded text-orange-300">exec()</code>, <code className="bg-slate-900 px-1 py-0.5 rounded text-orange-300">spawn()</code>, <code className="bg-slate-900 px-1 py-0.5 rounded text-orange-300">system()</code> with user input</li>
                            <li>Unsanitized arguments passed to shell commands</li>
                        </ul>
                    </div>
                </div>

                {/* NoSQL Injection */}
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-green-400">
                            <Code className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">NoSQL Injection</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Common in MongoDB/Mongoose where input can alter query logic (e.g., typically via object injection).
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Passing `req.body` directly to <code className="bg-slate-900 px-1 py-0.5 rounded text-green-300">find()</code> without validation</li>
                            <li>Query selector injection (e.g. <code className="bg-slate-900 px-1 py-0.5 rounded text-green-300">$ne: null</code>)</li>
                        </ul>
                    </div>
                </div>

                {/* LDAP Injection */}
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-purple-400">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">LDAP Injection</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Occurs when user input is not neutralized before being used in an LDAP search filter.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Unescaped input in LDAP search filters</li>
                            <li>Missing input validation against whitelist of allowed characters</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
