"use client";

import { useState } from "react";
import { FileText, Loader2, Check } from "lucide-react";
import { Report } from "@/lib/store";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportPDFButtonProps {
    reports: Report[];
}

export default function ExportPDFButton({ reports }: ExportPDFButtonProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const handleExport = async () => {
        setIsExporting(true);
        console.log("PDF Export triggered. Reports count:", reports?.length);

        if (!reports || reports.length === 0) {
            alert("No reports to export.");
            setIsExporting(false);
            return;
        }

        try {
            const doc = new jsPDF();

            doc.setFillColor(15, 23, 42);
            doc.rect(0, 0, 210, 20, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("SecValid AI - Security Validated by Intelligence", 14, 13);

            doc.setFontSize(10);
            const dateStr = new Date().toLocaleDateString();
            doc.text(`Generated: ${dateStr}`, 160, 13);

            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text("Executive Summary", 14, 30);

            const total = reports.length;
            const critical = reports.filter(r => r.status === 'Critical' || r.status === 'High').length;
            const medium = reports.filter(r => r.status === 'Medium').length;
            const score = Math.max(0, 100 - (critical * 10));

            const summaryData = [
                ["Total Scans", total.toString()],
                ["Critical/High Issues", critical.toString()],
                ["Medium Issues", medium.toString()],
                ["Security Score", `${score}/100`]
            ];

            autoTable(doc, {
                startY: 35,
                head: [['Metric', 'Value']],
                body: summaryData,
                theme: 'striped',
                headStyles: { fillColor: [15, 23, 42] },
                margin: { left: 14, right: 14 },
                tableWidth: 100
            });

            let lastY = (doc as any).lastAutoTable.finalY + 15;
            doc.setFontSize(14);
            doc.text("Detailed Findings", 14, lastY);

            const tableBody = reports.map(r => {
                const details = r.details || {};
                const summary = typeof details === 'string' ? "See details" : (details.summary || "N/A");

                return [
                    r.id,
                    r.date,
                    r.target.substring(0, 30) + (r.target.length > 30 ? "..." : ""),
                    r.status,
                    summary
                ];
            });

            autoTable(doc, {
                startY: lastY + 5,
                head: [['ID', 'Date', 'Target', 'Severity', 'Summary']],
                body: tableBody,
                theme: 'grid',
                headStyles: { fillColor: [71, 85, 105] },
                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 40 },
                    3: { cellWidth: 25, fontStyle: 'bold' },
                    4: { cellWidth: 'auto' }
                },
                didParseCell: function (data) {
                    if (data.section === 'body' && data.column.index === 3) {
                        const severity = data.cell.raw as string;
                        if (severity === 'Critical') data.cell.styles.textColor = [220, 38, 38];
                        else if (severity === 'High') data.cell.styles.textColor = [234, 88, 12];
                        else if (severity === 'Safe') data.cell.styles.textColor = [22, 163, 74];
                    }
                }
            });

            const filename = `security_audit_report_${dateStr.replace(/\//g, '-')}.pdf`;
            const blob = doc.output('blob');

            // Only use File System Access API - no automatic fallback
            if ('showSaveFilePicker' in window) {
                try {
                    const handle = await (window as any).showSaveFilePicker({
                        suggestedName: filename,
                        types: [{
                            description: 'PDF Files',
                            accept: { 'application/pdf': ['.pdf'] }
                        }]
                    });

                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();

                    console.log("PDF saved successfully");
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
            console.log("PDF ready for manual download");

        } catch (error) {
            console.error("PDF Export failed:", error);
            alert("PDF Export failed. Please check console.");
        } finally {
            setIsExporting(false);
        }
    };

    const handleManualDownload = () => {
        if (!downloadUrl) return;

        const filename = `security_audit_report_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
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
                    {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                    Export PDF
                </button>
            ) : (
                <button
                    onClick={handleManualDownload}
                    className="bg-red-500/10 border border-red-500/50 hover:bg-red-500/20 text-red-400 py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
                >
                    <Check className="h-4 w-4" />
                    Click to Save PDF
                </button>
            )}
        </div>
    );
}
