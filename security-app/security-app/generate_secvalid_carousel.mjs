import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

async function generateSecValidCarousel() {
    const doc = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: [1080, 1080]
    });

    const slides = [
        {
            topic: "PLATFORM OVERVIEW",
            title: "SecValid AI 2.0: The Future of Auditing",
            subtitle: "13 categories of hybrid intelligence.",
            body: "Static Analysis (Regex) + Generative AI (Gemini).\nUnprecedented depth in automated security scanning.",
            accent: [139, 92, 246] // Purple
        },
        {
            topic: "LOGIC AUDITING",
            title: "Beyond the Basics: Business Logic Sec",
            subtitle: "Detecting flaws that patterns miss.",
            body: "• Client-side validation bypasses\n• UI state tampering & param manipulation\n• Phishing markers & Dark Patterns",
            accent: [236, 72, 153] // Pink
        },
        {
            topic: "HYBRID ENGINE",
            title: "Regex Speed meets AI Intuition",
            subtitle: "The best of both worlds.",
            body: "Deterministic checks for keys and headers.\nProbabilistic logic for injection and workflows.\n100% Comprehensive Coverage.",
            accent: [59, 130, 246] // Blue
        },
        {
            topic: "REMEDIATION",
            title: "The 'Fix' Button: AI Code Remediation",
            subtitle: "Zero-effort vulnerability patching.",
            body: "Every scan doesn't just find a bug—it fixes it.\nGet production-ready fix snippets instantly.",
            accent: [34, 197, 94] // Green
        },
        {
            topic: "RELIABILITY",
            title: "3-Tier AI Reliability Strategy",
            subtitle: "Scanner uptime is guaranteed.",
            body: "Dynamic fallback between Gemini Flash, Pro,\nand Static Recovery layers. 99.9% Audit Uptime.",
            accent: [249, 115, 22] // Orange
        },
        {
            topic: "COMPLIANCE",
            title: "Compliance That Actually Understands",
            subtitle: "GDPR, HIPAA, and PCI-DSS logic.",
            body: "We don't just find links; we analyze UI ethics.\nAutomated deceptive consent detection.",
            accent: [99, 102, 241] // Indigo
        },
        {
            topic: "INFRASTRUCTURE",
            title: "The Silent Shield: Infra Hygine",
            subtitle: "Server-side posture verification.",
            body: "Automatic probes for robots.txt and ads.txt.\nReal-time audit of CSP and HSTS headers.",
            accent: [168, 85, 247] // Violet
        },
        {
            topic: "REPORTING",
            title: "Actionable Insights & Scoring",
            subtitle: "Security isn't a wall of text.",
            body: "Weighted risk scoring (IDOR, SQLi, SSRF).\nPremium Glassmorphic Report UI.",
            accent: [14, 165, 233] // Sky
        },
        {
            topic: "DEVELOPER FIRST",
            title: "Why Experts Choose SecValid AI?",
            subtitle: "Zero Configuration Security.",
            body: "• Hybrid Accuracy + AI Remediations\n• Privacy-First Secure Routing\n• Production-ready audit history",
            accent: [20, 184, 166] // Teal
        },
        {
            topic: "GET STARTED",
            title: "Build the Future. Secure the Web.",
            subtitle: "Launch your first audit now.",
            body: "Don't wait for a breach. Be proactive.\nVisit www.secvalid.ai to start.",
            accent: [217, 70, 239] // Fuchsia
        }
    ];

    const MARGIN = 120;
    const MAX_WIDTH = 840;

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (i > 0) doc.addPage([1080, 1080], "p");

        // CLEAN DARK BACKGROUND
        doc.setFillColor(10, 10, 15);
        doc.rect(0, 0, 1080, 1080, 'F');

        // BORDER ACCENT
        doc.setDrawColor(slide.accent[0], slide.accent[1], slide.accent[2]);
        doc.setLineWidth(10);
        doc.line(60, 60, 60, 200);
        doc.line(60, 60, 200, 60);

        // TOPIC LABEL (Small, Bold, Monospace 느낌)
        doc.setFont("courier", "bold");
        doc.setFontSize(24);
        doc.setTextColor(slide.accent[0], slide.accent[1], slide.accent[2]);
        doc.text(slide.topic, MARGIN, 150);

        // --- TITLE SECTION ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(72);
        doc.setTextColor(255, 255, 255);
        const titleLines = doc.splitTextToSize(slide.title, MAX_WIDTH);

        let currentY = 260;
        doc.text(titleLines, MARGIN, currentY);

        // Dynamic Y update based on title length
        currentY += (titleLines.length * 85);

        // --- SUBTITLE SECTION ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(44);
        doc.setTextColor(slide.accent[0], slide.accent[1], slide.accent[2]);
        const subLines = doc.splitTextToSize(slide.subtitle, MAX_WIDTH);
        doc.text(subLines, MARGIN, currentY);

        currentY += (subLines.length * 55) + 60; // Extra padding before body

        // --- BODY SECTION (INSIDE A BOX) ---
        // Subtle box for body text
        doc.setFillColor(20, 20, 30);
        const bodyLines = doc.splitTextToSize(slide.body, MAX_WIDTH - 80);
        const boxHeight = (bodyLines.length * 52) + 60;

        doc.roundedRect(MARGIN - 40, currentY - 50, MAX_WIDTH + 80, boxHeight, 15, 15, 'F');

        doc.setFont("helvetica", "normal");
        doc.setFontSize(38);
        doc.setTextColor(180, 180, 200);
        doc.text(bodyLines, MARGIN, currentY + 10);

        // --- FOOTER SECTION ---
        doc.setFont("helvetica", "normal");
        doc.setFontSize(22);
        doc.setTextColor(80, 80, 100);
        doc.text(`SecValid AI 2.0 | Advanced Security Auditing`, MARGIN, 1020);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(slide.accent[0], slide.accent[1], slide.accent[2]);
        doc.text(`${i + 1} / ${slides.length}`, 950, 1020);

        // DECORATIVE ELEMENT
        doc.setGState(new doc.GState({ opacity: 0.1 }));
        doc.setFillColor(slide.accent[0], slide.accent[1], slide.accent[2]);
        doc.circle(1000, 1000, 200, 'F');
        doc.setGState(new doc.GState({ opacity: 1.0 }));
    }

    const outputPath = path.join(process.cwd(), "SecValid_AI_2.0_LinkedIn_Carousel.pdf");
    const pdfData = doc.output();
    fs.writeFileSync(outputPath, Buffer.from(pdfData, 'binary'));
    console.log(`PDF successfully generated with dynamic spacing and zero overlap: ${outputPath}`);
}

generateSecValidCarousel().catch(err => {
    console.error("PDF generation failed:", err);
});
