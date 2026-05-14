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
                    if (node.type === 'n8n-nodes-base.httpRequest' && node.parameters && node.parameters.jsonBody) {
                        // Only fix if it's the Gemini request
                        if (node.parameters.url && node.parameters.url.includes('generativelanguage')) {

                            // The absolutely permanent solution: use JSON.stringify() around a JS Object 
                            // to safely escape any stray double quotes or newlines inside application variables.
                            const safeFormula = `={{ JSON.stringify({
  "contents": [
    {
      "parts": [
        {
          "text": "Analyze this Playwright failure and provide a 3-sentence summary for a developer.\\nFile: \" + ($json.filename || \"Unknown\") + \"\\nError: \" + ($json.cleanError || \"Unknown Error\") + \"\\n\\nFormat:\\n🔍 Analysis: ...\\n🛠️ Recommendation: ...\"
        }
      ]
    }
  ]
}) }}`;

                            node.parameters.jsonBody = safeFormula;
                            node.retryOnFail = true;
                            node.maxTries = 5;
                            node.waitBetweenTries = 5000;
                            changed = true;
                        }
                    }
                }
            }

            if (changed) {
                fs.writeFileSync(fullPath, JSON.stringify(data, null, 4));
                console.log(`Updated jsonBody safely in ${file}`);
            }
        }
    }
}

processDir(workflowsDir);
console.log('Finished updating jsonBody issues safely.');
