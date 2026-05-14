import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck, CreditCard, Accessibility, FileText } from "lucide-react";

export default function CompliancePage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                        <Scale className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Compliance & Legal</h1>
                        <p className="text-slate-400 mt-1">
                            Validating adherence to regulatory standards (GDPR, PCI-DSS, HIPAA) and accessibility.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-indigo-400">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">GDPR & Privacy</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Checking for mandatory user data protection and transparency controls.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Cookie consent banners and granular control</li>
                            <li>Privacy policy presence and GDPR-required clauses</li>
                            <li>Data subject rights information (Right to be Forgotten, etc.)</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-indigo-400">
                            <CreditCard className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">PCI-DSS & Security</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Analyzing payment infrastructure for data handling best practices.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Direct card number input fields (anti-pattern)</li>
                            <li>Integration of PCI-compliant payment gateways</li>
                            <li>SSL/TLS enforcement on payment pages</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-indigo-400">
                            <Accessibility className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Accessibility (WCAG)</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Scanning for basic web accessibility compliance.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Missing Image Alt text</li>
                            <li>Proper ARIA attributes usage</li>
                            <li>Semantic HTML structure</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-indigo-400">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Legal Disclosures</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Verification of essential legal documents and notices.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Terms of Service / Terms & Conditions</li>
                            <li>HIPAA Notice of Privacy Practices (if applicable)</li>
                            <li>Data retention and usage disclosures</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
