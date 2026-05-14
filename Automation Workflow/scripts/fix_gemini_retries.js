const fs = require('fs');
const path = require('path');

const workflowsDir = path.join('C:\\Users\\veeramani\\.gemini\\antigravity\\scratch\\Automation Workflow', 'workflows');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (file.endsWith('.json')) {
            let changed = false;
            let data;
            try {
                data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            } catch (e) {
                continue; // Skip invalid JSON
            }

            if (data && data.nodes && Array.isArray(data.nodes)) {
                for (const node of data.nodes) {
                    // Check if it's an HTTP request targeting Gemini
                    if (node.type === 'n8n-nodes-base.httpRequest') {
                        let isGemini = false;
                        if (node.parameters && typeof node.parameters.url === 'string' && node.parameters.url.includes('generativelanguage.googleapis.com')) {
                            isGemini = true;
                        }

                        if (isGemini) {
                            // Add node-level retry settings
                            node.retryOnFail = true;
                            node.maxTries = 10;
                            node.waitBetweenTries = 5000; // 5 seconds
                            changed = true;
                        }
                    }
                }
            }

            if (changed) {
                fs.writeFileSync(fullPath, JSON.stringify(data, null, 4));
                console.log(`Updated ${file} to add Gemini API retries.`);
            }
        }
    }
}

processDir(workflowsDir);
console.log('Finished updating workflows with Gemini API retries.');
