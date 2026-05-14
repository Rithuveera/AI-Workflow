const fs = require('fs');

const workflow = {
    "name": "Playwright - Individual Case RCA & Failure Reporter",
    "nodes": [
        {
            "parameters": {},
            "id": "trigger",
            "name": "Manual Trigger",
            "type": "n8n-nodes-base.manualTrigger",
            "typeVersion": 1,
            "position": [0, 300]
        },
        {
            "parameters": {
                "jsCode": "// SELECT THE SPECIFIC FILE TO TEST\nreturn [{\n  json: {\n    product: 'ERP',\n    folder: 'ERP',\n    filename: 'ProjectDashboard.spec.js',\n    testPath: 'tests/ERP/ProjectDashboard.spec.js'\n  }\n}];"
            },
            "id": "single_file",
            "name": "Select Test File",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [200, 300]
        },
        {
            "parameters": {
                "jsCode": "const { execSync } = require('child_process');\nconst item = $input.item.json;\nconst cwd = 'C:/Users/veeramani/desktop/playwright-mcp';\nconst testPath = item.testPath;\nconst cmd = `npx playwright test \"${testPath}\" --reporter=json`;\nconst startTime = new Date();\nlet stdout = '', stderr = '', exitCode = 0;\ntry {\n  stdout = execSync(cmd, { cwd, stdio: 'pipe' }).toString();\n} catch (e) {\n  exitCode = e.status || 1;\n  stdout = (e.stdout || '').toString();\n  stderr = (e.stderr || e.message || '').toString();\n}\nconst duration = ((new Date() - startTime) / 1000).toFixed(2);\nreturn {\n  json: {\n    ...item,\n    exitCode,\n    rawStdout: stdout,\n    stderr: (stderr || '').substring(0, 1000),\n    duration: `${duration}s`\n  }\n};"
            },
            "id": "run_test",
            "name": "Run Playwright Test",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [400, 300]
        },
        {
            "parameters": {
                "jsCode": "const item = $input.item.json;\nconst stdout = item.rawStdout;\nconst cwd = 'C:/Users/veeramani/desktop/playwright-mcp';\nlet failures = [];\ntry {\n  const jsonMatch = stdout.match(/\\{[\\s\\S]*\\}/);\n  if (jsonMatch) {\n    const jsonData = JSON.parse(jsonMatch[0]);\n    function processSuite(suite, parents = []) {\n      const suiteTitle = parents.concat(suite.title || []).filter(t => t);\n      if (suite.specs) {\n        suite.specs.forEach(spec => {\n          const specTitle = suiteTitle.concat(spec.title).join(' > ');\n          spec.tests.forEach(test => {\n            const results = test.results || [];\n            const failedResult = results.find(r => r.status === 'failed' || r.status === 'timedOut');\n            if (failedResult) {\n               const screenshot = (failedResult.attachments || []).find(a => a.name === 'screenshot');\n               const errorMsg = failedResult.errors?.map(e => e.message || e.stack).join('\\n\\n') || failedResult.error?.message || 'Unknown error';\n               failures.push({\n                   filename: item.filename,\n                   testTitle: specTitle,\n                   status: 'failed',\n                   error: errorMsg.substring(0, 3000), // Trim for AI prompt\n                   screenshotPath: screenshot ? (screenshot.path.includes(':') || screenshot.path.startsWith('/') ? screenshot.path : `${cwd}/${screenshot.path}`).replace(/\\\\/g, '/') : null,\n                   duration: (failedResult.duration / 1000).toFixed(2) + 's'\n               });\n            }\n          });\n        });\n      }\n      if (suite.suites) suite.suites.forEach(s => processSuite(s, suiteTitle));\n    }\n    if (jsonData.suites) jsonData.suites.forEach(s => processSuite(s));\n  }\n} catch (e) {\n  if (failures.length === 0) {\n    failures.push({\n        filename: item.filename,\n        testTitle: 'Test Execution Error',\n        status: 'failed',\n        error: item.stderr || 'Failed to parse playwright output',\n        screenshotPath: null,\n        duration: item.duration\n    });\n  }\n}\nif (failures.length === 0) return []; // No failures, do nothing\nreturn failures.map(f => ({ json: f }));"
            },
            "id": "split_failures",
            "name": "Split Case Failures",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [600, 300]
        },
        {
            "parameters": {
                "amount": 5,
                "unit": "seconds"
            },
            "id": "rate_limit_wait",
            "name": "Rate Limit Wait",
            "type": "n8n-nodes-base.wait",
            "typeVersion": 1,
            "position": [800, 300]
        },
        {
            "parameters": {
                "jsCode": "const json = $input.item.json;\nconst prompt = `Analyze this automated test UI failure.\\nTest Case: ${json.testTitle}\\nFile: ${json.filename}\\nError Details:\\n${json.error}\\nExplain what went wrong in a concise paragraph.`;\nreturn { json: { ...json, prompt } };"
            },
            "id": "prepare_prompt",
            "name": "Prepare RCA Prompt",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [1000, 300]
        },
        {
            "parameters": {
                "method": "POST",
                "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=[REDACTED_GEMINI_KEY]",
                "sendBody": true,
                "specifyBody": "json",
                "jsonBody": "={{ JSON.stringify({ \"contents\": [ { \"parts\": [ { \"text\": $json.prompt } ] } ] }) }}",
                "options": {
                    "responsePropertyName": "gemini_res"
                }
            },
            "id": "ai_rca_node",
            "name": "AI Analysis",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4,
            "retryOnFail": true,
            "maxTries": 5,
            "waitBetweenTries": 30000,
            "position": [1200, 300]
        },
        {
            "parameters": {
                "jsCode": "const item = $input.item.json;\nitem.aiAnalysis = item.gemini_res?.candidates?.[0]?.content?.parts?.[0]?.text || 'AI Analysis unavailable.';\nreturn { json: item };"
            },
            "id": "extract_ai",
            "name": "Extract AI Text",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [1400, 300]
        },
        {
            "parameters": {
                "conditions": {
                    "string": [
                        {
                            "value1": "={{ $json.screenshotPath }}",
                            "operation": "notEqual",
                            "value2": ""
                        }
                    ]
                }
            },
            "id": "has_screenshot",
            "name": "Has Screenshot?",
            "type": "n8n-nodes-base.if",
            "typeVersion": 1,
            "position": [1600, 300]
        },
        {
            "parameters": {
                "fileSelector": "={{ $json.screenshotPath }}",
                "options": {
                    "continueOnFail": true
                }
            },
            "id": "read_screenshot",
            "name": "Read Screenshot",
            "type": "n8n-nodes-base.readBinaryFile",
            "typeVersion": 1,
            "position": [1800, 200]
        },
        {
            "parameters": {
                "resource": "message",
                "operation": "send",
                "email": "veeramani.b@algosium.com",
                "subject": "={{ '✖️ Case Failed: ' + $json.testTitle + ' (' + $json.filename + ')' }}",
                "emailType": "html",
                "message": "={{ \"<html><body style='font-family: Arial;'><h2 style='color: #d32f2f;'>🚨 Case Failure Alert</h2><div style='background: #ffebee; padding: 15px; border-radius: 8px;'><p><b>Test File:</b> \" + $json.filename + \"</p><p><b>Case Title:</b> \" + $json.testTitle + \"</p><p><b>Duration:</b> \" + $json.duration + \"</p></div><h3 style='color: #333;'>🤖 AI Root Cause Analysis:</h3><div style='background: #e3f2fd; padding:15px; border-radius:4px;'>\" + $json.aiAnalysis.replace(/\\n/g, '<br>') + \"</div><h3 style='color: #333;'>Error Details:</h3><pre style='background: #f5f5f5; padding: 15px;'>\" + $json.error + \"</pre></body></html>\" }}",
                "attachmentsUi": {
                    "attachmentsValues": [
                        {
                            "binaryPropertyName": "data"
                        }
                    ]
                }
            },
            "id": "gmail_with_image",
            "name": "Gmail Alert (With Image)",
            "type": "n8n-nodes-base.gmail",
            "typeVersion": 2,
            "position": [2000, 200],
            "credentials": {
                "gmailOAuth2": {
                    "id": "aFqA2wJ8eN1T2W6I",
                    "name": "Gmail account"
                }
            }
        },
        {
            "parameters": {
                "resource": "message",
                "operation": "send",
                "email": "veeramani.b@algosium.com",
                "subject": "={{ '✖️ Case Failed: ' + $json.testTitle + ' (' + $json.filename + ')' }}",
                "emailType": "html",
                "message": "={{ \"<html><body style='font-family: Arial;'><h2 style='color: #d32f2f;'>🚨 Case Failure Alert</h2><div style='background: #ffebee; padding: 15px; border-radius: 8px;'><p><b>Test File:</b> \" + $json.filename + \"</p><p><b>Case Title:</b> \" + $json.testTitle + \"</p><p><b>Duration:</b> \" + $json.duration + \"</p></div><h3 style='color: #333;'>🤖 AI Root Cause Analysis:</h3><div style='background: #e3f2fd; padding:15px; border-radius:4px;'>\" + $json.aiAnalysis.replace(/\\n/g, '<br>') + \"</div><h3 style='color: #333;'>Error Details:</h3><pre style='background: #f5f5f5; padding: 15px;'>\" + $json.error + \"</pre></body></html>\" }}"
            },
            "id": "gmail_no_image",
            "name": "Gmail Alert (No Image)",
            "type": "n8n-nodes-base.gmail",
            "typeVersion": 2,
            "position": [2000, 400],
            "credentials": {
                "gmailOAuth2": {
                    "id": "aFqA2wJ8eN1T2W6I",
                    "name": "Gmail account"
                }
            }
        },
        {
            "parameters": {
                "method": "POST",
                "url": "https://chat.googleapis.com/v1/spaces/AAQA7T2tWaY/messages?key=[REDACTED_GEMINI_KEY]&token=C0TOQS1FN_tbUfIeUHwat0Zwa9UXylCX97CKTIO4PKI",
                "sendBody": true,
                "specifyBody": "json",
                "jsonBody": "={ \"text\": \"🧪 *Individual Case Failed:* {{ $json.testTitle }} ({{ $json.filename }})\\n\\n🤖 *AI RCA:*\\n{{ $json.aiAnalysis }}\\n\\n❌ *Error:* {{ $json.error }}\" }"
            },
            "id": "chat_with_image_node",
            "name": "Chat Notification (Img)",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4,
            "position": [2200, 200]
        },
        {
            "parameters": {
                "method": "POST",
                "url": "https://chat.googleapis.com/v1/spaces/AAQA7T2tWaY/messages?key=[REDACTED_GEMINI_KEY]&token=C0TOQS1FN_tbUfIeUHwat0Zwa9UXylCX97CKTIO4PKI",
                "sendBody": true,
                "specifyBody": "json",
                "jsonBody": "={ \"text\": \"🧪 *Individual Case Failed:* {{ $json.testTitle }} ({{ $json.filename }})\\n\\n🤖 *AI RCA:*\\n{{ $json.aiAnalysis }}\\n\\n❌ *Error:* {{ $json.error }}\" }"
            },
            "id": "chat_no_image_node",
            "name": "Chat Notification (No Img)",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4,
            "position": [2200, 400]
        }
    ],
    "connections": {
        "Manual Trigger": {
            "main": [[{ "node": "Select Test File", "type": "main", "index": 0 }]]
        },
        "Select Test File": {
            "main": [[{ "node": "Run Playwright Test", "type": "main", "index": 0 }]]
        },
        "Run Playwright Test": {
            "main": [[{ "node": "Split Case Failures", "type": "main", "index": 0 }]]
        },
        "Split Case Failures": {
            "main": [[{ "node": "Rate Limit Wait", "type": "main", "index": 0 }]]
        },
        "Rate Limit Wait": {
            "main": [[{ "node": "Prepare RCA Prompt", "type": "main", "index": 0 }]]
        },
        "Prepare RCA Prompt": {
            "main": [[{ "node": "AI Analysis", "type": "main", "index": 0 }]]
        },
        "AI Analysis": {
            "main": [[{ "node": "Extract AI Text", "type": "main", "index": 0 }]]
        },
        "Extract AI Text": {
            "main": [[{ "node": "Has Screenshot?", "type": "main", "index": 0 }]]
        },
        "Has Screenshot?": {
            "main": [
                [{ "node": "Read Screenshot", "type": "main", "index": 0 }],
                [{ "node": "Gmail Alert (No Image)", "type": "main", "index": 0 }]
            ]
        },
        "Read Screenshot": {
            "main": [[{ "node": "Gmail Alert (With Image)", "type": "main", "index": 0 }]]
        },
        "Gmail Alert (With Image)": {
            "main": [[{ "node": "Chat Notification (Img)", "type": "main", "index": 0 }]]
        },
        "Gmail Alert (No Image)": {
            "main": [[{ "node": "Chat Notification (No Img)", "type": "main", "index": 0 }]]
        }
    }
};

fs.writeFileSync('c:/Users/veeramani/.gemini/antigravity/scratch/Automation Workflow/workflows/n8n-individual-case-rca.json', JSON.stringify(workflow, null, 2));
console.log('Saved n8n-individual-case-rca.json');
