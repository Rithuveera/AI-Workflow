
// ===================================
// Automation Code Generation
// ===================================
const codeModal = document.getElementById('codeModal');
const closeCodeModalBtn = document.getElementById('closeCodeModalBtn');
const automationCodeBlock = document.getElementById('automationCode');
const copyCodeBtn = document.getElementById('copyCodeBtn');

// Close modal
closeCodeModalBtn.addEventListener('click', () => {
    codeModal.style.display = 'none';
});

// Copy code
copyCodeBtn.addEventListener('click', () => {
    const code = automationCodeBlock.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = '<span class="btn-icon">✅</span> Copied!';
        setTimeout(() => {
            copyCodeBtn.innerHTML = originalText;
        }, 2000);
    });
});

const regenerateBtn = document.getElementById('regenerateBtn');
const screenshotInput = document.getElementById('screenshotInput');

let currentTestCaseId = null;

// Regenerate (Smart check)
regenerateBtn.addEventListener('click', () => {
    if (currentTestCaseId) {
        // Check if file is selected
        const hasFile = screenshotInput.files.length > 0;
        generateAutomation(currentTestCaseId, hasFile);
    }
});

const runScriptBtn = document.getElementById('runScriptBtn');

// Run Script
if (runScriptBtn) {
    runScriptBtn.addEventListener('click', async () => {
        const code = automationCodeBlock.textContent;
        if (!code) return;

        showToast('🚀 Initializing Test Environment...');
        runScriptBtn.disabled = true;
        runScriptBtn.innerHTML = '⏳ Running...';

        // We need to send the code to backend
        try {
            const response = await fetch('/run-automation-script', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    script: code,
                    test_case_id: currentTestCaseId
                })
            });

            const result = await response.json();

            if (result.status === 'success') {
                showToast(`✅ Execution Passed!`);

                // Open a "Result Modal" or just alert for now - user wants "Next Step"
                // Ideally this would update status in background.
                // Let's toggle the status to Passed automatically if they want?
                // For now, let's show the LOGS.
                alert("Execution Output:\n" + result.output);

                // Update UI status to Passed if success
                if (typeof updateLocalStatus === "function") {
                    updateLocalStatus(currentTestCaseId, 'Passed');
                }

            } else {
                showToast(`❌ Execution Failed`);
                alert("Execution Error:\n" + result.error + "\n\nOutput:\n" + result.output);
                if (typeof updateLocalStatus === "function") {
                    updateLocalStatus(currentTestCaseId, 'Failed');
                }
            }

        } catch (e) {
            console.error(e);
            showToast('Error communicating with runner');
        } finally {
            runScriptBtn.disabled = false;
            runScriptBtn.innerHTML = '<span class="btn-icon">▶️</span> Run Script';
        }
    });
}

async function generateAutomation(id, useScreenshot = false) {
    // Find test case in either latest list or history list
    let testCase = null;
    if (typeof latestTestCases !== 'undefined') {
        testCase = latestTestCases.find(tc => tc.id === id);
    }
    if (!testCase && typeof allTestCases !== 'undefined') {
        testCase = allTestCases.find(tc => tc.id === id);
    }

    if (!testCase) {
        console.error('Test case not found with ID:', id);
        return;
    }

    currentTestCaseId = id;

    try {
        showToast(useScreenshot ? 'Analyzing screenshot & generating code...' : 'Generating Playwright script...');

        const formData = new FormData();
        formData.append('test_case', JSON.stringify(testCase));

        // Safely get target URL input element
        const targetUrlInput = document.getElementById('targetUrlInput');
        const targetUrl = targetUrlInput ? targetUrlInput.value : '';
        if (targetUrl) {
            formData.append('target_url', targetUrl);
        }

        // Safely get username and password input elements
        const usernameInput = document.getElementById('autoUsername');
        const passwordInput = document.getElementById('autoPassword');
        const username = usernameInput ? usernameInput.value : '';
        const password = passwordInput ? passwordInput.value : '';
        if (username) formData.append('target_username', username);
        if (password) formData.append('target_password', password);

        if (useScreenshot) {
            const file = screenshotInput.files[0];
            if (!file) {
                showToast('Please select a screenshot first!');
                return;
            }
            formData.append('screenshot', file);
        }

        const response = await fetch('/generate-automation', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            const errorMsg = error.error || 'Generation failed';

            // Check if it's a quota error (429 status)
            if (response.status === 429) {
                // Display quota error with better formatting
                alert(`🚫 QUOTA EXCEEDED\n\n${errorMsg}\n\nThe automation feature has a separate daily quota.\nYou can still use other features while waiting.`);
            } else {
                throw new Error(errorMsg);
            }
            return; // Stop execution
        }

        const data = await response.json();

        // Display code in modal
        automationCodeBlock.textContent = data.script;
        codeModal.style.display = 'block';

        if (useScreenshot) {
            showToast('✅ Code updated with visual locators!');
        }

    } catch (error) {
        console.error('Error:', error);
        // Only show toast for non-quota errors (quota errors already shown in alert)
        if (!error.message.includes('⚠️')) {
            showToast('Error: ' + error.message);
        }
    }
}

// Make function global
window.generateAutomation = generateAutomation;
