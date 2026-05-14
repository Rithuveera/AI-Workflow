import { getReportById } from "@/lib/store";
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CategoryResult, ChecklistItem } from "@/types/security";

interface PageProps {
    params: Promise<{ id: string }>;
}

import ExportReportButton from "./ExportReportButton";
import DeleteReportButton from "@/components/DeleteReportButton";
import { CopyButton } from "@/components/CopyButton";

export default async function ReportDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const report = await getReportById(id);

    if (!report) {
        notFound();
    }

    const isCritical = report.status === "Critical" || report.status === "High";
    const isSafe = report.status === "Safe";

    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <Link href="/reports" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Reports
            </Link>

            <header className="flex justify-between items-start border-b border-sec-border pb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-white">Analysis Report</h1>
                        <span className="font-mono text-slate-500 text-lg">{report.id}</span>
                    </div>
                    <p className="text-slate-400 mt-2 font-mono break-all">{report.target}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${isCritical ? 'bg-red-500/20 text-red-500 border border-red-500/50' :
                        isSafe ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/50' :
                            'bg-amber-500/20 text-amber-500 border border-amber-500/50'
                        }`}>
                        {isCritical ? <AlertTriangle className="h-5 w-5" /> : isSafe ? <CheckCircle className="h-5 w-5" /> : <ShieldAlert className="h-5 w-5" />}
                        {report.status}
                    </div>
                    <div className="flex items-center gap-2">
                        <ExportReportButton report={report} />
                        <DeleteReportButton id={report.id} redirectPath="/reports" />
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                <Section title="Summary">
                    <p className="text-lg leading-relaxed">{report.details.summary}</p>
                </Section>

                <Section title="Analysis Overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {report.details.categoryResults?.map((cat: CategoryResult) => (
                            <div key={cat.category} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-slate-800 ${cat.color}`}>
                                        <span className="font-bold">{cat.category.charAt(0)}</span>
                                    </div>
                                    <span className="text-slate-200 font-medium">{cat.category}</span>
                                </div>
                                <span className={`font-mono font-bold ${cat.score === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {cat.score}%
                                </span>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title="Detailed Findings">
                    <div className="space-y-6">
                        {report.details.categoryResults?.map((cat: CategoryResult) => (
                            <div key={cat.category} className="space-y-3">
                                <h3 className={`text-lg font-bold flex items-center gap-2 ${cat.color}`}>
                                    {cat.category}
                                </h3>
                                <div className="space-y-4">
                                    {cat.items.map((item: ChecklistItem, idx: number) => (
                                        <div key={idx} className="bg-slate-900/50 p-5 rounded-lg border border-slate-800/50 space-y-4 min-w-0 overflow-hidden">
                                            <div className="flex justify-between items-start min-w-0">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <StatusBadge status={item.status} />
                                                    <h4 className="font-bold text-slate-100 truncate">{item.name || "Security Finding"}</h4>
                                                </div>
                                                {item.severity && (
                                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase bg-slate-800 ${getSeverityColor(item.severity)}`}>
                                                        {item.severity}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-slate-400 text-sm leading-relaxed">{item.details || "Details not provided for this specific finding."}</p>

                                            {item.status !== 'pass' && item.recommendation && (
                                                <div className="pt-3 border-t border-slate-800/50">
                                                    <h5 className="text-xs font-bold text-sec-primary uppercase mb-2">Recommendation</h5>
                                                    <p className="text-slate-300 text-sm">{item.recommendation}</p>
                                                </div>
                                            )}

                                            {item.fixCode && (
                                                <div className="mt-4 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI Suggested Fix</h5>
                                                        <CopyButton text={item.fixCode} />
                                                    </div>
                                                    <div className="bg-black/60 p-4 rounded-lg border border-emerald-500/20 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                                                        {item.fixCode}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'pass': return <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />;
        case 'fail': return <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />;
        case 'warning': return <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />;
        default: return <div className="h-2 w-2 rounded-full bg-slate-500" />;
    }
}

function getSeverityColor(severity: string) {
    switch (severity) {
        case 'Critical': return 'text-red-500';
        case 'High': return 'text-red-400';
        case 'Medium': return 'text-amber-400';
        case 'Low': return 'text-blue-400';
        default: return 'text-slate-400';
    }
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-sec-primary" />
                {title}
            </h2>
            <div className="text-slate-300">
                {children}
            </div>
        </section>
    )
}
