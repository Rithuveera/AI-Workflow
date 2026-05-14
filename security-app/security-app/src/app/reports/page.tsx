import { FileText, Download, CheckCircle, AlertTriangle } from "lucide-react";
import { getReports } from "@/lib/store";
import Link from "next/link";

export const dynamic = 'force-dynamic'; // Ensure we always get latest data

import ExportButton from "@/components/ExportButton";
import ExportPDFButton from "@/components/ExportPDFButton";
import DeleteReportButton from "@/components/DeleteReportButton";

export default async function ReportsPage() {
    const reports = await getReports();

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Scan Reports</h1>
                    <p className="text-slate-400 mt-1">Archive of all past security analyses.</p>
                </div>
                <div className="flex gap-4">
                    <ExportPDFButton reports={reports} />
                    <ExportButton reports={reports} />
                </div>
            </div>

            <div className="bg-sec-panel border border-sec-border rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-900/50 text-slate-400">
                        <tr>
                            <th className="p-4 font-medium">Scan ID</th>
                            <th className="p-4 font-medium">Date</th>
                            <th className="p-4 font-medium">Target</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Issues Found</th>
                            <th className="p-4 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sec-border">
                        {reports.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500">
                                    No reports found. Run a new analysis to see results here.
                                </td>
                            </tr>
                        ) : (
                            reports.map((report) => (
                                <tr key={report.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 font-mono text-slate-300">{report.id}</td>
                                    <td className="p-4 text-slate-400">{report.date}</td>
                                    <td className="p-4 text-white font-medium truncate max-w-[200px]" title={report.target}>{report.target}</td>
                                    <td className="p-4">
                                        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold ${report.status === "Critical" || report.status === "High" ? "bg-red-500/10 text-red-400" :
                                            report.status === "Medium" ? "bg-amber-500/10 text-amber-400" :
                                                "bg-emerald-500/10 text-emerald-400"
                                            }`}>
                                            {report.status === "Safe" ? <CheckCircle className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                                            {report.status}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right text-slate-300">{report.issues}</td>
                                    <td className="p-4 text-right flex items-center justify-end gap-2">
                                        <Link
                                            href={`/reports/${report.id}`}
                                            className="text-sec-primary hover:text-emerald-400 text-xs font-medium hover:underline"
                                        >
                                            View Details
                                        </Link>
                                        <DeleteReportButton id={report.id} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
