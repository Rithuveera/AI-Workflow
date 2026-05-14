const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1. Load API Key
function getApiKey() {
    try {
        const envPath = path.join(__dirname, '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            for (const line of content.split('\n')) {
                if (line.startsWith('GEMINI_API_KEY=')) {
                    return line.split('=')[1].trim();
                }
            }
        }
    } catch (e) {
        console.error("Could not read .env.local", e);
    }
    return process.env.GEMINI_API_KEY;
}

const apiKey = getApiKey();
if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY not found in .env.local");
    process.exit(1);
}

// 2. Setup Model
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are an expert Application Security Engineer and Penetration Tester. 
  Your goal is to analyze code OR web page content provided by the user for security vulnerabilities.
  
  For every analysis, you MUST provide the response in the following JSON format ONLY (do not use markdown code blocks, just raw JSON):
  {
    "severity": "Critical" | "High" | "Medium" | "Low" | "Safe",
    "summary": "One line summary of the finding",
    "details": "Detailed explanation of the vulnerability and why it is dangerous. If analyzing a URL, mention what was found in the source.",
    "recommendation": "Specific code fix or architectural change recommended.",
    "affected_lines": "Estimated line numbers or code blocks affected (optional)"
  }
  
  If the code is safe, set severity to "Safe" and provide positive feedback.
  Focus on: OWASP Top 10, Injection flaws, Hardcoded secrets, Insecure configs, XSS, etc.
  
  If the input seems to be an error message from a failed URL fetch (e.g. "Failed to fetch content"), treat it as a "Low" severity info message explaining why the scan failed.`
});

// 3. Analysis Logic
async function analyzeUrl(url, label) {
    console.log(`\n🔍 Analyzing ${label} URL: ${url}...`);

    let contentToAnalyze = url;
    try {
        const response = await fetch(url, { headers: { 'User-Agent': 'SecValidAI-Sampler/1.0' } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        contentToAnalyze = `
      [CONTEXT: User wants to scan this remote URL: ${url}]
      [CONTENT_START]
      ${text.slice(0, 30000)}
      [CONTENT_END]
      Reflect on the HTML source above. Look for: exposed secrets, insecure scripts, missing headers (meta), comments with sensitive info.
      `;
    } catch (e) {
        console.error(`⚠️ Failed to fetch ${url}: ${e.message}`);
        // Continue to let AI analyze the failure if we wanted, but for samples we want success.
        // We'll pass the URL itself if fetch fails, letting AI know.
    }

    try {
        const result = await model.generateContent(contentToAnalyze);
        const response = await result.response;
        let text = response.text();
        // Clean markdown
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        const json = JSON.parse(text);
        return json;
    } catch (error) {
        console.error(`❌ AI Analysis failed for ${url}:`, error.message);
        return null;
    }
}

// 4. Main Execution
async function analyzeCodeSample(code, label) {
    console.log(`\n🔍 Analyzing ${label} Code...`);
    try {
        const result = await model.generateContent(code);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(text);
    } catch (error) {
        console.error(`❌ AI Analysis failed for code:`, error.message);
        return null;
    }
}

async function main() {
    const safeReport = await analyzeUrl("https://example.com", "Safe");
    const vulnReport = await analyzeUrl("http://testphp.vulnweb.com/", "Vulnerable");
    const blankReport = await analyzeUrl("https://blank.org/", "Blank Site");

    const sqlInjectionCode = `
    const express = require('express');
    const app = express();
    const db = require('./db');

    app.get('/users', (req, res) => {
        const username = req.query.username;
        // VULNERABLE DIRECT CONCATENATION
        const query = "SELECT * FROM users WHERE name = '" + username + "'";
        db.execute(query, (err, rows) => {
            if (err) res.status(500).send(err);
            else res.json(rows);
        });
    });
    `;
    const backendReport = await analyzeCodeSample(sqlInjectionCode, "Backend SQL Injection");

    const reports = [];
    if (safeReport) reports.push({ type: 'Safe Site', url: "https://example.com", ...safeReport });
    if (vulnReport) reports.push({ type: 'Vulnerable Site', url: "http://testphp.vulnweb.com/", ...vulnReport });
    if (blankReport) reports.push({ type: 'Simple Site', url: "https://blank.org/", ...blankReport });
    if (backendReport) reports.push({ type: 'Backend Code (Node.js)', url: "Raw Code Snippet", ...backendReport });

    // Save JSON
    fs.writeFileSync('sample-reports.json', JSON.stringify(reports, null, 2));
    console.log("\n✅ Saved sample-reports.json");

    // Save Markdown
    let mdContent = "# Security Analysis Sample Reports\n\nGenerated by AI Security Validation Assistant\n\n";
    reports.forEach(r => {
        mdContent += `## ${r.type} (${r.severity}) \n`;
        mdContent += `** Target:** ${r.url} \n\n`;
        mdContent += `** Summary:** ${r.summary} \n\n`;
        mdContent += `** Details:**\n${r.details} \n\n`;
        mdContent += `** Recommendation:**\n${r.recommendation} \n\n`;
        mdContent += `-- -\n\n`;
    });
    fs.writeFileSync('sample-reports.md', mdContent);
    console.log("✅ Saved sample-reports.md");

    // 5. Seed the App's Persistence Store (data/reports.json)
    const appReports = reports.map(r => ({
        id: `SCAN-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0],
        target: r.url,
        status: r.severity || "Unknown",
        issues: (r.severity === "Safe" || r.severity === "Low") ? 0 : 1,
        details: r
    }));

    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    fs.writeFileSync(path.join(dataDir, 'reports.json'), JSON.stringify(appReports, null, 2));
    console.log("✅ Seeded data/reports.json for the App UI");
}

main();
