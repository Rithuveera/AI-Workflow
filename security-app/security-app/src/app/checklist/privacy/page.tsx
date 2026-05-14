import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, FileText, Database } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                        <Shield className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Privacy & Data Protection</h1>
                        <p className="text-slate-400 mt-1">
                            Analyzing how user data is collected, tracked, and protected throughout the application.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-violet-400">
                            <Eye className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Third-Party Trackers</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Identifying external scripts and trackers that may monitor user behavior.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Google Analytics, Facebook Pixel, and other ad trackers</li>
                            <li>Session recording scripts (Hotjar, FullStory)</li>
                            <li>Proper disclosure of tracking in privacy policies</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-violet-400">
                            <Database className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Data Collection</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Analyzing forms and inputs for PII (Personally Identifiable Information) collection.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Email collection transparency</li>
                            <li>Personal data fields (names, addresses, phone numbers)</li>
                            <li>Encryption of sensitive data in transit (HTTPS)</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-violet-400">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Privacy Policy Quality</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        AI-driven analysis of the privacy policy content for completeness and clarity.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Clear explanation of data usage and storage</li>
                            <li>Presence of a data retention policy</li>
                            <li>Opt-out and deletion options for users</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-violet-400">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Encryption & Security</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Validation of data encryption standards across the application.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Mixed content detection (HTTP assets on HTTPS pages)</li>
                            <li>Mentions of SHA/AES encryption standards</li>
                            <li>Secure session cookie management</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
