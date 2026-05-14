import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const REPORTS_FILE = path.join(DATA_DIR, 'reports.json');

export type Report = {
    id: string;
    date: string;
    target: string;
    status: string;
    issues: number;
    details?: any;
};

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

export async function getReports(): Promise<Report[]> {
    ensureDataDir();
    if (!fs.existsSync(REPORTS_FILE)) {
        return [];
    }
    const data = fs.readFileSync(REPORTS_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

export async function getReportById(id: string): Promise<Report | undefined> {
    const reports = await getReports();
    return reports.find(r => r.id === id);
}

export async function saveReport(analysisResult: any, input: string) {
    ensureDataDir();
    const reports = await getReports();

    // Create a display-friendly target name
    let targetName = input;
    try {
        if (input.startsWith('http')) {
            const url = new URL(input);
            targetName = url.hostname + url.pathname;
            if (targetName.length > 40) targetName = targetName.substring(0, 37) + "...";
        } else {
            targetName = "Code Snippet";
            // Try to sniff language or content
            if (input.includes('function') || input.includes('const') || input.includes('import')) {
                const firstLine = input.split('\n')[0].trim();
                if (firstLine.length > 0 && firstLine.length < 30) {
                    targetName = firstLine; // Use first line if short
                }
            }
        }
    } catch (e) {
        targetName = "Unknown Target";
    }

    // Count issues
    let issuesCount = 0;
    if (analysisResult.categoryResults) {
        // Comprehensive scan: count all failed items across categories
        issuesCount = analysisResult.categoryResults.reduce((sum: number, cat: any) =>
            sum + (cat.items ? cat.items.filter((i: any) => i.status === "fail").length : 0), 0
        );
    } else {
        // Quick scan: 1 if not safe/low, else 0
        issuesCount = (analysisResult.severity === "Safe" || analysisResult.severity === "Low") ? 0 : 1;
    }

    const newReport: Report = {
        id: `SCAN-${Date.now().toString().slice(-6)}`, // More digits
        date: new Date().toISOString().split('T')[0],
        target: targetName,
        status: analysisResult.severity || "Unknown",
        issues: issuesCount,
        details: analysisResult
    };

    reports.unshift(newReport); // Add to top
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
    return newReport;
}

export async function deleteReport(id: string) {
    ensureDataDir();
    const reports = await getReports();
    const updatedReports = reports.filter(r => r.id !== id);
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(updatedReports, null, 2));
}
