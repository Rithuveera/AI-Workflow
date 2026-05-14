"use client";

import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Report {
    id: string;
    target: string;
    status: string;
    date: string;
    details?: any;
}

interface ExportReportButtonProps {
    report: Report;
}

export default function ExportReportButton({ report }: ExportReportButtonProps) {
    const handleExport = () => {
        if (!report.details) return;

        const doc = new jsPDF();

        // Title
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("Analysis Report", 14, 20);

        // Meta Info
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Report ID: ${report.id}`, 14, 30);
        doc.text(`Target: ${report.target}`, 14, 36);
        doc.text(`Status: ${report.status}`, 14, 42);
        doc.text(`Date: ${report.date}`, 14, 48);

        // Content Sections
        const sections = [
            { title: "Summary", content: report.details.summary },
            { title: "Vulnerability Details", content: report.details.details },
            { title: "Recommendation", content: report.details.recommendation },
        ];

        if (report.details.affected_lines) {
            sections.push({ title: "Affected Context", content: report.details.affected_lines });
        }

        let yPos = 60;

        sections.forEach((section) => {
            // Check for page break
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            // Section Title
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text(section.title, 14, yPos);
            yPos += 8;

            // Section Content
            doc.setFontSize(11);
            doc.setTextColor(60, 60, 60);
            doc.setFont("helvetica", "normal");

            const splitText = doc.splitTextToSize(section.content, 180);
            doc.text(splitText, 14, yPos);

            yPos += splitText.length * 6 + 10; // Line height + margin
        });

        doc.save(`report-${report.id}.pdf`);
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all border border-slate-700 shadow-sm"
        >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
        </button>
    );
}
