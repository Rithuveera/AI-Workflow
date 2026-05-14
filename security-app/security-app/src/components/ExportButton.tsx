"use client";

import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { Report } from "@/lib/store";

interface ExportButtonProps {
    reports: Report[];
}

export default function ExportButton({ reports }: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const handleExport = async () => {
        setIsExporting(true);
        console.log("Export triggered. Reports count:", reports?.length);

        if (!reports || reports.length === 0) {
            alert("No reports to export.");
            setIsExporting(false);
            return;
        }

        try {
            const headers = ["Scan ID", "Date", "Target", "Status", "Issues Found", "Summary", "Details", "Recommendation", "Affected Lines"];

            const escapeCsv = (field: any) => {
                if (field === null || field === undefined) return '""';
                let stringField = String(field);

                if (typeof field === 'object') {
                    try { stringField = JSON.stringify(field); } catch (e) { stringField = "[Object]"; }
                }

                return `"${stringField.replace(/"/g, '""')}"`;
            };

            const csvContent = [
                "sep=,",
                headers.join(","),
                ...reports.map(report => {
                    const details = report.details || {};
                    const summary = typeof details === 'string' ? "See details" : (details.summary || "");
                    const desc = typeof details === 'string' ? details : (details.details || "");
                    const rec = typeof details === 'string' ? "" : (details.recommendation || "");
                    const lines = typeof details === 'string' ? "" : (details.affected_lines || "");

                    return [
                        escapeCsv(report.id),
                        escapeCsv(report.date),
                        escapeCsv(report.target),
                        escapeCsv(report.status),
                        escapeCsv(report.issues),
                        escapeCsv(summary),
                        escapeCsv(desc),
                        escapeCsv(rec),
                        escapeCsv(lines)
                    ].join(",");
                })
            ].join("\n");

            console.log("CSV Content generated. Length:", csvContent.length);

            const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
            const filename = `security_reports_${new Date().toISOString().split('T')[0]}.csv`;

            // Only use File System Access API - no automatic fallback
            if ('showSaveFilePicker' in window) {
                try {
                    const handle = await (window as any).showSaveFilePicker({
                        suggestedName: filename,
                        types: [{
                            description: 'CSV Files',
                            accept: { 'text/csv': ['.csv'] }
                        }]
                    });

                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();

                    console.log("CSV saved successfully");
                    setIsExporting(false);
                    return;
                } catch (err) {
                    console.log("Save dialog cancelled by user");
                    setIsExporting(false);
                    return;
                }
            }

            // Fallback for older browsers: show manual download button
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
            console.log("CSV ready for manual download");

        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please check console.");
        } finally {
            setIsExporting(false);
        }
    };

    const handleManualDownload = () => {
        if (!downloadUrl) return;

        const filename = `security_reports_${new Date().toISOString().split('T')[0]}.csv`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
    };

    return (
        <div className="flex items-center gap-2">
            {!downloadUrl ? (
                <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="bg-sec-panel border border-sec-border hover:bg-slate-800 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    Export CSV
                </button>
            ) : (
                <button
                    onClick={handleManualDownload}
                    className="bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500/20 text-emerald-400 py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
                >
                    <Check className="h-4 w-4" />
                    Click to Save CSV
                </button>
            )}
        </div>
    );
}
