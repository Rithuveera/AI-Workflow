
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

// Regenerate with screenshot
regenerateBtn.addEventListener('click', () => {
    if (currentTestCaseId) {
        generateAutomation(currentTestCaseId, true);
    }
});

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
            throw new Error(error.error || 'Generation failed');
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
        showToast('Error: ' + error.message);
    }
}

// Make function global
window.generateAutomation = generateAutomation;
