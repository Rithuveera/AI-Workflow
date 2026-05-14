const { execSync } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * CONFIGURATION
 * 1. Change WEBHOOK_URL after importing the workflow into n8n
 * 2. Set the PROJECT_ROOT to your playwright directory
 */
const WEBHOOK_URL = 'http://localhost:5678/webhook/playwright-failure';
const PROJECT_ROOT = 'c:/Users/veeramani/.gemini/antigravity/scratch/Automation Workflow';

async function runAndAnalyze(testPath) {
    console.log(`🚀 Running Test: ${testPath}`);

    let stdout = '';
    let exitCode = 0;

    try {
        // Run playwright with JSON reporter
        stdout = execSync(`npx playwright test "${testPath}" --reporter=json`, {
            cwd: PROJECT_ROOT,
            stdio: 'pipe'
        }).toString();
    } catch (e) {
        exitCode = e.status || 1;
        stdout = (e.stdout || '').toString();
    }

    if (exitCode === 0) {
        console.log('✅ Test Passed! No analysis needed.');
        return;
    }

    console.log('❌ Test Failed. Sending to AI RCA Agent...');

    try {
        const jsonMatch = stdout.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Could not parse Playwright JSON output');

        const data = JSON.parse(jsonMatch[0]);
        const failures = [];

        // Extract failures from JSON
        data.suites?.forEach(suite => {
            suite.specs?.forEach(spec => {
                spec.tests?.forEach(test => {
                    const result = test.results?.[0];
                    if (result && result.status === 'failed') {
                        const screenshot = result.attachments?.find(a => a.name === 'screenshot');
                        failures.push({
                            product: 'ERP',
                            filename: path.basename(testPath),
                            testTitle: spec.title,
                            error: result.errors?.map(e => e.message).join('\n\n') || result.error?.message || 'Unknown Error',
                            screenshotPath: screenshot ? (path.isAbsolute(screenshot.path) ? screenshot.path : path.join(PROJECT_ROOT, screenshot.path)).replace(/\\/g, '/') : null,
                            duration: result.duration
                        });
                    }
                });
            });
        });

        // Send each failure to n8n
        for (const failure of failures) {
            console.log(`📤 Sending failure: "${failure.testTitle}" to n8n...`);
            await axios.post(WEBHOOK_URL, failure);
        }

        console.log('🎉 AI RCA complete. Check Google Chat/Gmail.');

    } catch (error) {
        console.error('⚠️ Failed to send data to n8n:', error.message);
    }
}

// Example usage: node report_failures_to_n8n.js tests/ERP/ProjectDashboard.spec.js
const targetTest = process.argv[2];
if (!targetTest) {
    console.log('Usage: node report_failures_to_n8n.js <path_to_test>');
} else {
    runAndAnalyze(targetTest);
}
