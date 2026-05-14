
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createFormatedPDF() {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const timesRomanItalicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

    let page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    const { width, height } = page.getSize();
    let y = height - 50;
    const margin = 50;

    // Header Background
    page.drawRectangle({
        x: 0,
        y: height - 100,
        width: width,
        height: 100,
        color: rgb(0.06, 0.09, 0.16),
    });

    page.drawText('Test Management Workflow (STLC)', {
        x: 70,
        y: height - 55,
        size: 24,
        font: timesRomanBoldFont,
        color: rgb(1, 1, 1),
    });

    page.drawText('Standard Quality Assurance & Testing Lifecycle Guide', {
        x: 70,
        y: height - 75,
        size: 11,
        font: timesRomanFont,
        color: rgb(0.8, 0.8, 0.8),
    });

    y = height - 130;

    const sections = [
        {
            title: 'Step 1: Requirement Analysis',
            goal: 'Understand what needs to be tested.',
            content: [
                'Review the PRD or User Stories to identify testable requirements.',
                'Traceability: Map requirements to unique IDs (e.g., REQ-01).'
            ]
        },
        {
            title: 'Step 2: Test Planning',
            goal: 'Define the strategy.',
            content: [
                'Create a Test Plan specifying Scope, Resources, and Tools (Jira, TestRail).',
                'Define entry/exit criteria and schedule milestones.'
            ]
        },
        {
            title: 'Step 3: Test Case Development',
            goal: 'Create the detailed "How-To" for testing.',
            content: [
                'Write test cases with Pre-conditions, Steps, and Expected Results.',
                'Assign Priority (High/Medium/Low) to help track critical path items.'
            ]
        },
        {
            title: 'Step 4: Environment Setup',
            goal: 'Prepare the laboratory.',
            content: [
                'Configure QA Environment separate from Production.',
                'Initialize test data and standard user accounts.'
            ]
        },
        {
            title: 'Step 5: Test Execution',
            goal: 'Run the tests and record results.',
            content: [
                'Perform manual steps or trigger automation scripts (Playwright).',
                'Status: Mark cases as Passed, Failed, Blocked, or Skipped.'
            ]
        },
        {
            title: 'Step 6: Defect Management (Bug Tracking)',
            goal: 'Fix discovered issues.',
            content: [
                'Log Bug Reports with screenshots and reproduction steps.',
                'Once fixed, Re-test and perform Regression Testing.'
            ]
        },
        {
            title: 'Step 7: Test Closure & Reporting',
            goal: 'Final evaluation.',
            content: [
                'Generate a Test Summary Report (TSR) with pass/fail metrics.',
                'Provide "Go/No-Go" recommendation for the release.'
            ]
        }
    ];

    for (const section of sections) {
        if (y < 120) {
            page = pdfDoc.addPage([595.28, 841.89]);
            y = height - 50;
        }

        page.drawText(section.title, { x: margin, y, size: 14, font: timesRomanBoldFont, color: rgb(0.06, 0.09, 0.16) });
        y -= 18;
        page.drawText(`Goal: ${section.goal}`, { x: margin + 10, y, size: 10, font: timesRomanItalicFont, color: rgb(0.4, 0.4, 0.4) });
        y -= 15;

        for (const line of section.content) {
            const words = line.split(' ');
            let currentLine = '• ';
            for (const word of words) {
                if (currentLine.length + word.length > 85) {
                    page.drawText(currentLine, { x: margin + 10, y, size: 10, font: timesRomanFont, color: rgb(0.2, 0.2, 0.2) });
                    y -= 12;
                    currentLine = '  ';
                }
                currentLine += word + ' ';
            }
            page.drawText(currentLine, { x: margin + 10, y, size: 10, font: timesRomanFont, color: rgb(0.2, 0.2, 0.2) });
            y -= 12;
        }
        y -= 10;
    }

    // Tools Table Mockup
    if (y < 200) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - 50;
    }

    page.drawText('Common Tools Used', { x: margin, y, size: 16, font: timesRomanBoldFont, color: rgb(0.06, 0.09, 0.16) });
    y -= 25;

    const tools = [
        ['Management', 'Jira + Xray, TestRail, Zephyr, Azure DevOps'],
        ['Automation', 'Playwright, Selenium, Cypress, Appium'],
        ['Defect Tracking', 'Bugzilla, Jira, Mantis'],
        ['Reporting', 'PowerBI, Excel, Allure Reports']
    ];

    page.drawRectangle({ x: margin, y: y - 5, width: width - 100, height: 20, color: rgb(0.06, 0.09, 0.16) });
    page.drawText('Category', { x: margin + 5, y, size: 10, font: timesRomanBoldFont, color: rgb(1, 1, 1) });
    page.drawText('Popular Tools', { x: margin + 120, y, size: 10, font: timesRomanBoldFont, color: rgb(1, 1, 1) });
    y -= 20;

    for (const [cat, toolList] of tools) {
        page.drawText(cat, { x: margin + 5, y, size: 9, font: timesRomanBoldFont, color: rgb(0, 0, 0) });
        page.drawText(toolList, { x: margin + 120, y, size: 9, font: timesRomanFont, color: rgb(0.2, 0.2, 0.2) });
        y -= 15;
    }

    y -= 20;
    page.drawText('Best Practices', { x: margin, y, size: 16, font: timesRomanBoldFont, color: rgb(0.06, 0.09, 0.16) });
    y -= 20;
    const bestPractices = [
        '• Early Involvement: Review requirements before development.',
        '• Maintenance: Regularly update test cases as features change.',
        '• Documentation: Always attach proof to failed results.'
    ];
    for (const bp of bestPractices) {
        page.drawText(bp, { x: margin + 5, y: y, size: 10, font: timesRomanFont, color: rgb(0.2, 0.2, 0.2) });
        y -= 15;
    }

    const docsDir = 'c:/Users/veeramani/.gemini/antigravity/scratch/security-app/security-app/docs';
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = path.join(docsDir, 'STLC_Workflow_Professional.pdf');
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`PDF created successfully at: ${outputPath}`);
}

createFormatedPDF();
