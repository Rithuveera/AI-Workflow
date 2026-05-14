import Link from "next/link";
import { ArrowLeft, Globe, Code, Layout, AlertTriangle } from "lucide-react";

export default function XSSPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                        <Globe className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Cross-Site Scripting (XSS)</h1>
                        <p className="text-slate-400 mt-1">
                            Flaws that allow attackers to inject client-side scripts into web pages viewed by other users.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-blue-400">
                            <Code className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Reflected XSS</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Malicious script is reflected off the web server, such as in an error message or search result.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Unsanitized URL parameters reflected in response</li>
                            <li>Rendering user input directly in templates without escaping</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-blue-400">
                            <Layout className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Stored XSS</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Malicious script is permanently stored on the target server (e.g., in a database).
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Retrieving data from database and rendering it without encoding</li>
                            <li>Rich text editors that allow script tags</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-blue-400">
                            <AlertTriangle className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Dangerous React patterns</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Specific React patterns that bypass XSS protection.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Usage of <code className="bg-slate-900 px-1 py-0.5 rounded text-blue-300">dangerouslySetInnerHTML</code></li>
                            <li>Usage of <code className="bg-slate-900 px-1 py-0.5 rounded text-blue-300">javascript:</code> URLs in links</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
