import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileSearch, Lock, Network } from "lucide-react";

export default function SensitiveDataExposurePage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Sensitive Data Exposure</h1>
                        <p className="text-slate-400 mt-1">
                            Failure to protect sensitive data (e.g., PII, financial data) at rest or in transit.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-emerald-400">
                            <FileSearch className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Logging Sensitive Data</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Inadvertently writing sensitive information to server logs.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Logging `password`, `token`, `ssn`, `credit_card` in console or file logs</li>
                            <li>Dumping full request bodies containing sensitive fields</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-emerald-400">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Weak Crypto</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Using broken or weak cryptographic algorithms.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Usage of MD5, SHA1 for security purposes</li>
                            <li>Insufficient key length (e.g., RSA 1024)</li>
                            <li>Hardcoded crypto keys</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-emerald-400">
                            <Network className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Data in Transit</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Transmission of sensitive data without encryption.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>HTTP usage instead of HTTPS</li>
                            <li>Transferring sensitive data in URL parameters (GET requests)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
