import Link from "next/link";
import { ArrowLeft, Package, AlertTriangle, RefreshCw, GitBranch } from "lucide-react";

export default function VulnerableDependenciesPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                        <Package className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Vulnerable Dependencies</h1>
                        <p className="text-slate-400 mt-1">
                            Identifying outdated or malicious third-party libraries (SCA) that introduce risks.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-orange-400">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Known Vulnerabilities (CVEs)</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Detecting libraries with publicly disclosed security flaws.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Analysis of `package.json` (Node.js) and `requirements.txt` (Python)</li>
                            <li>Checking versions against known CVE databases</li>
                            <li>Critical severity vulnerabilities in direct dependencies</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-orange-400">
                            <RefreshCw className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Outdated Components</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Using libraries that are no longer maintained or significantly behind.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Deprecated packages (e.g., `request` in Node.js)</li>
                            <li>Major version lag leading to missing security patches</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-orange-400">
                            <GitBranch className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Supply Chain Risks</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Risks mostly related to how dependencies are sourced and verified.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Missing lockfiles (`package-lock.json`, `yarn.lock`)</li>
                            <li>Typosquatting in package names</li>
                            <li>Private packages potentially leaking to public registries</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
