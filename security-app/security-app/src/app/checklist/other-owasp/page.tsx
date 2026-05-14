import Link from "next/link";
import { ArrowLeft, AlertOctagon, Package, FileCode, Shield } from "lucide-react";

export default function OtherOWASPPage() {
    return (
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
            <header>
                <Link href="/checklist" className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Checklist
                </Link>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                        <AlertOctagon className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Other OWASP Risks</h1>
                        <p className="text-slate-400 mt-1">
                            Additional critical risks including deserialization, XML entities, and access control.
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-pink-400">
                            <Package className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Insecure Deserialization</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Deserializing untrusted data can lead to remote code execution.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Using `eval()`, `pickle.loads()` (Python), or Java serialization on user input</li>
                            <li>Accepting serialized objects from untrusted sources</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-pink-400">
                            <FileCode className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">XML External Entities (XXE)</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Attack against applications that parse XML input.
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>XML parsers configured to allow external entity processing</li>
                            <li>Insecure default settings in XML libraries</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-sec-panel border border-sec-border p-6 rounded-lg space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-900 text-pink-400">
                            <Shield className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Broken Access Control</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Users can act outside of their intended permissions (e.g., IDOR).
                    </p>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-200">What we check for:</h3>
                        <ul className="text-sm text-slate-300 space-y-2 pl-4 list-disc marker:text-slate-600">
                            <li>Direct usage of user IDs from request parameters without ownership check</li>
                            <li>Missing capability checks in sensitive API endpoints</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
