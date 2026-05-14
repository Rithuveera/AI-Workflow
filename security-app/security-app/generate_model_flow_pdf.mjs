import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

async function generateModelFlowPDF() {
    const doc = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4"
    });

    const MARGIN = 40;
    const PAGE_WIDTH = doc.internal.pageSize.getWidth();
    const PAGE_HEIGHT = doc.internal.pageSize.getHeight();
    const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

    let currentY = 0;

    const addPageBackground = () => {
        doc.setFillColor(10, 10, 15);
        doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F');

        // Brand Footer
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 100);
        doc.text("SecValid AI 2.0 | Advanced Security Documentation", MARGIN, PAGE_HEIGHT - 20);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, PAGE_WIDTH - MARGIN - 20, PAGE_HEIGHT - 20);

        // Horizontal branding line
        doc.setDrawColor(139, 92, 246);
        doc.setLineWidth(1);
        doc.line(MARGIN, PAGE_HEIGHT - 35, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 35);
    };

    // --- COVER PAGE ---
    addPageBackground();

    // Decorative element
    doc.setGState(new doc.GState({ opacity: 0.1 }));
    doc.setFillColor(139, 92, 246);
    doc.circle(PAGE_WIDTH, 0, 300, 'F');
    doc.setGState(new doc.GState({ opacity: 1.0 }));

    doc.setFont("helvetica", "bold");
    doc.setFontSize(48);
    doc.setTextColor(255, 255, 255);
    doc.text("SecValid AI", MARGIN, 200);

    doc.setFontSize(24);
    doc.setTextColor(139, 92, 246);
    doc.text("End-to-End Security Workflow", MARGIN, 240);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(180, 180, 200);
    const subtitle = "Architectural flow, 13-category hybrid analysis engine, and AI-powered remediation pipeline documentation.";
    const subLines = doc.splitTextToSize(subtitle, CONTENT_WIDTH);
    doc.text(subLines, MARGIN, 270);

    doc.setDrawColor(139, 92, 246);
    doc.setLineWidth(5);
    doc.line(MARGIN, 310, MARGIN + 100, 310);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("REVISION: 2026.02.10", MARGIN, 340);
    doc.text("STATUS: CLASSIFIED - SECURE", MARGIN, 355);

    // --- CONTENT PAGES ---
    doc.addPage();
    addPageBackground();
    currentY = MARGIN + 40;

    const sections = [
        {
            title: "1. The 4-Stage Analysis Pipeline",
            items: [
                { subtitle: "Stage 1: Discovery & Passive Reconnaissance", text: "When a user submits a URL, the engine initiates a 'clean' fetch. Captures full page source, including inline scripts and meta tags. Probes HTTP response headers for security flags (CSP, HSTS). Automatically checks for infrastructure files like /robots.txt and /ads.txt." },
                { subtitle: "Stage 2: 13-Category Hybrid Engine", text: "SecValid AI 2.0 uses a unique hybrid engine that runs 13 specialized categories in parallel. Combining Deterministic Static Analysis (Regex) for speed with Generative AI Enrichment (Gemini 2.0) for context-aware logic auditing." },
                { subtitle: "Stage 3: Intelligence Fallback Layer", text: "To ensure the scanner never fails, we implement a 3-Tier AI Reliability Strategy: Gemini 1.5 Flash (Speed), Gemini 1.5 Pro (Precision), and Static Recovery (Baseline)." },
                { subtitle: "Stage 4: Synthesis & Remediation", text: "The 'brain' aggregates all results into a structured JSON model. Includes Weighted Risk Scoring and exact fixCode blocks for developers to copy-paste directly." }
            ]
        },
        {
            title: "2. The 13-Category Security Checklist",
            items: [
                { subtitle: "Core Logic Categories", text: "1. Injection Attacks: SQLi, NoSQLi, Command Injection.\n2. Broken Authentication: Session flags, Weak MFA.\n3. XSS: Reflected, Stored, and DOM-based.\n4. Security Misconfig: Verbose errors, Test routes.\n5. Sensitive Data: PII exposure, weak encryption.\n6. OWASP Top 10: IDOR, SSRF, XXE.\n7. Supply Chain: Outdated frameworks.\n8. CSRF: Missing tokens, Clickjacking." },
                { subtitle: "Advanced Intelligence Categories", text: "9. API Security: CORS, GraphQL, Secrets.\n10. Compliance: GDPR, HIPAA, PCI-DSS logic.\n11. Privacy: Tracker detection, Stealth collection.\n12. Business Logic: Workflow skips, Param tampering.\n13. Deceptive Design: Phishing, UI Mimicry." }
            ]
        },
        {
            title: "3. LinkedIn Post & Professional Outreach",
            items: [
                { subtitle: "Key Competitive Advantages", text: "• Hybrid Accuracy: Regex precision meets AI intuition.\n• Active Remediation: We don't just find, we fix.\n• Privacy First: Local analysis with secure AI routing.\n• Zero Configuration: Just enter a URL and hit Analyze." }
            ]
        }
    ];

    for (const section of sections) {
        if (currentY > PAGE_HEIGHT - 100) {
            doc.addPage();
            addPageBackground();
            currentY = MARGIN + 40;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text(section.title, MARGIN, currentY);
        currentY += 10;

        doc.setDrawColor(139, 92, 246);
        doc.setLineWidth(2);
        doc.line(MARGIN, currentY, MARGIN + 40, currentY);
        currentY += 30;

        for (const item of section.items) {
            if (currentY > PAGE_HEIGHT - 100) {
                doc.addPage();
                addPageBackground();
                currentY = MARGIN + 40;
            }

            // Box for item
            doc.setFillColor(20, 20, 30);
            const textLines = doc.splitTextToSize(item.text, CONTENT_WIDTH - 40);
            const boxHeight = (textLines.length * 16) + 50;

            doc.roundedRect(MARGIN - 10, currentY - 20, CONTENT_WIDTH + 20, boxHeight, 5, 5, 'F');

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(139, 92, 246);
            doc.text(item.subtitle, MARGIN + 10, currentY + 5);

            currentY += 25;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(200, 200, 220);
            doc.text(textLines, MARGIN + 10, currentY);

            currentY += (textLines.length * 16) + 30;
        }
        currentY += 20;
    }

    const outputPath = path.join(process.cwd(), "SecValid_AI_Model_Flow_Documentation.pdf");
    const pdfData = doc.output();
    fs.writeFileSync(outputPath, Buffer.from(pdfData, 'binary'));
    console.log(`Architecture Flow PDF successfully generated: ${outputPath}`);
}

generateModelFlowPDF().catch(err => {
    console.error("PDF generation failed:", err);
});
