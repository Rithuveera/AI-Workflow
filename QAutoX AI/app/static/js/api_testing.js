/**
 * QAutoX API Testing Module
 */

// ===================================
// State Management
// ===================================
let apiTestCases = [];
let selectedApiFileObj = null;

// ===================================
// DOM Elements
// ===================================
const apiSpecInput = document.getElementById('apiSpecInput');
const generateApiBtn = document.getElementById('generateApiBtn');
const apiLoadingIndicator = document.getElementById('apiLoadingIndicator');
const apiTestCasesGrid = document.getElementById('apiTestCasesGrid');
const selectedApiFile = document.getElementById('selectedApiFile');
const runAllApiBtn = document.getElementById('runAllApiBtn');
const clearApiBtn = document.getElementById('clearApiBtn');

// ===================================
// Initialization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial load of API test cases
    loadApiTestCases();

    // Setup event listeners
    if (apiSpecInput) {
        apiSpecInput.addEventListener('change', handleApiFileSelect);
    }

    if (generateApiBtn) {
        generateApiBtn.addEventListener('click', generateApiTests);
    }

    if (runAllApiBtn) {
        runAllApiBtn.addEventListener('click', runAllApiTests);
    }

    if (clearApiBtn) {
        clearApiBtn.addEventListener('click', clearAllApiTests);
    }

    // Tab switching support
    const apiTabBtn = document.querySelector('[data-tab="api-testing"]');
    if (apiTabBtn) {
        apiTabBtn.addEventListener('click', () => {
            loadApiTestCases();
        });
    }
});

// ===================================
// API File Selection
// ===================================
function handleApiFileSelect(e) {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const allowedExtensions = ['.json', '.yaml', '.yml'];
        const fileName = file.name.toLowerCase();

        const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));

        if (!isValid) {
            showToast('Invalid file type. Please upload Swagger/OpenAPI (JSON/YAML) or Postman Collection (JSON).');
            return;
        }

        selectedApiFileObj = file;
        selectedApiFile.textContent = `Selected: ${file.name}`;
        selectedApiFile.style.display = 'block';
        generateApiBtn.style.display = 'inline-block';
    }
}

// ===================================
// Generate API Tests
// ===================================
async function generateApiTests() {
    if (!selectedApiFileObj) {
        showToast('Please select an API specification file first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedApiFileObj);

    const model = document.getElementById('modelSelect')?.value || 'gemini-2.0-flash';
    formData.append('model', model);

    // Show loading
    apiLoadingIndicator.style.display = 'block';
    apiTestCasesGrid.style.display = 'none';
    generateApiBtn.disabled = true;

    try {
        const response = await fetch('/api-testing/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`Successfully generated ${data.test_cases.length} API test cases.`);
            apiTestCases = data.test_cases;
            displayApiTestCases(apiTestCases);

            // Reset upload
            selectedApiFileObj = null;
            selectedApiFile.style.display = 'none';
            generateApiBtn.style.display = 'none';
        } else {
            throw new Error(data.error || 'Failed to generate API tests');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error: ' + error.message);
    } finally {
        apiLoadingIndicator.style.display = 'none';
        apiTestCasesGrid.style.display = 'grid';
        generateApiBtn.disabled = false;
    }
}

// ===================================
// Load API Test Cases
// ===================================
async function loadApiTestCases() {
    try {
        const response = await fetch('/api-testing/test-cases');
        const data = await response.json();

        if (response.ok) {
            apiTestCases = data;
            displayApiTestCases(apiTestCases);
        }
    } catch (error) {
        console.error('Error loading API tests:', error);
    }
}

// ===================================
// Display API Test Cases
// ===================================
function displayApiTestCases(testCases) {
    if (!apiTestCasesGrid) return;

    if (testCases.length === 0) {
        apiTestCasesGrid.innerHTML = `
            <div class="no-data" style="text-align: center; padding: 3rem; color: #666; grid-column: 1/-1;">
                <p>No API test cases generated yet. Upload a specification to get started.</p>
            </div>
        `;
        return;
    }

    apiTestCasesGrid.innerHTML = testCases.map(tc => `
        <div class="test-case-card api-test-card" id="api-card-${tc.id}" data-id="${tc.id}" style="border-left: 4px solid ${getMethodColor(tc.method)};">
            <div class="test-case-header">
                <div class="test-case-title">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                        <span class="method-badge" style="background: ${getMethodColor(tc.method)};">${tc.method}</span>
                        <code style="font-size: 0.9rem; color: #6366f1;">${escapeHtml(tc.endpoint)}</code>
                    </div>
                    <h3>${escapeHtml(tc.api_name)}</h3>
                    <div class="test-case-meta">
                        <span class="badge badge-priority-${(tc.priority || 'Medium').toLowerCase()}">${tc.priority || 'Medium'}</span>
                        <span class="badge badge-type">${tc.test_type || 'Functional'}</span>
                        <span class="badge badge-status" id="api-status-${tc.id}">${tc.status || 'Not Executed'}</span>
                    </div>
                </div>
                <div class="test-case-actions">
                    <button class="btn btn-primary btn-sm" onclick="runSingleApiTest(${tc.id})" id="run-btn-${tc.id}">
                        ▶️ Run
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="viewApiHistory(${tc.id})">
                        🕒 History
                    </button>
                </div>
            </div>
            
            <div class="test-case-body">
                <p style="font-size: 0.9rem; color: #aaa; margin-bottom: 1rem;">${escapeHtml(tc.description)}</p>
                
                <div class="api-details">
                    <div class="api-detail-row">
                        <strong>Expected Status:</strong> 
                        <span style="color: #4CAF50; font-weight: bold;">${tc.expected_status_code}</span>
                    </div>
                    
                    <div class="assertions-list" style="margin-top: 10px;">
                        <strong>Assertions:</strong>
                        <ul style="font-size: 0.85rem; margin-top: 5px; color: #ddd; list-style: none; padding-left: 0;">
                            ${parseAssertions(tc.assertions).map(a => `<li>🔹 ${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div id="execution-result-${tc.id}" class="execution-result" style="display: none; margin-top: 15px; padding: 10px; background: #1a1a1a; border-radius: 6px; border: 1px solid #333;">
                    <!-- Results will be injected here -->
                </div>
            </div>
        </div>
    `).join('');
}

function getMethodColor(method) {
    const colors = {
        'GET': '#28a745',
        'POST': '#007bff',
        'PUT': '#ffc107',
        'DELETE': '#dc3545',
        'PATCH': '#17a2b8',
        'HEAD': '#6c757d'
    };
    return colors[method.toUpperCase()] || '#6c757d';
}

function parseAssertions(assertions) {
    if (!assertions) return [];
    if (typeof assertions === 'string') {
        try {
            return JSON.parse(assertions);
        } catch {
            return [assertions];
        }
    }
    return assertions;
}

// ===================================
// Execution
// ===================================
async function runSingleApiTest(id) {
    const runBtn = document.getElementById(`run-btn-${id}`);
    const resultDiv = document.getElementById(`execution-result-${id}`);
    const statusBadge = document.getElementById(`api-status-${id}`);

    runBtn.disabled = true;
    runBtn.innerHTML = '<span class="spinner-sm"></span> Running...';
    resultDiv.style.display = 'none';

    try {
        const url = `/api-testing/execute/${id}`;
        console.log(`Executing API test ${id} at ${url}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ version: 'Release 1.0 (Manual)' })
        });

        const data = await response.json();

        if (response.ok) {
            statusBadge.textContent = data.status;
            statusBadge.className = `badge badge-status status-${data.status.toLowerCase()}`;

            // Render results
            resultDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-weight: bold; color: ${data.status === 'Passed' ? '#28a745' : '#dc3545'};">
                        ${data.status === 'Passed' ? '✅ Passed' : '❌ Failed'}
                    </span>
                    <span style="font-size: 0.8rem; color: #888;">${data.result.response_time}ms | Status: ${data.result.status_code}</span>
                </div>
                <div class="validation-items">
                    ${data.validation.map(v => `
                        <div style="font-size: 0.8rem; display: flex; gap: 8px; margin-bottom: 2px;">
                            <span>${v.passed ? '✔️' : '❌'}</span>
                            <span style="color: ${v.passed ? '#ccc' : '#dc3545'};">${escapeHtml(v.assertion)}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            resultDiv.style.display = 'block';
        } else {
            throw new Error(data.error || 'Execution failed');
        }
    } catch (error) {
        showToast('Execution Error (Check Details)');
        statusBadge.textContent = 'Failed';
        statusBadge.className = 'badge badge-status status-failed';
        resultDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: bold; color: #dc3545;">❌ Execution Failed</span>
            </div>
            <div style="background: rgba(220, 53, 69, 0.1); border-left: 3px solid #dc3545; padding: 10px; margin-top: 10px; color: #e0e0e0; font-family: monospace; font-size: 0.85rem; white-space: pre-wrap; word-break: break-word; overflow-x: auto;">
                <strong>Error Details:</strong><br/>
                ${escapeHtml(error.message)}
            </div>
        `;
        resultDiv.style.display = 'block';
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = '▶️ Run';
    }
}

async function runAllApiTests() {
    if (apiTestCases.length === 0) return;

    if (!confirm(`Run all ${apiTestCases.length} API test cases?`)) return;

    runAllApiBtn.disabled = true;
    const originalText = runAllApiBtn.innerHTML;
    runAllApiBtn.innerHTML = '<span class="spinner-sm"></span> Running Batch...';

    for (const tc of apiTestCases) {
        await runSingleApiTest(tc.id);
    }

    runAllApiBtn.disabled = false;
    runAllApiBtn.innerHTML = originalText;
    showToast('Batch execution complete.');
}

async function clearAllApiTests() {
    if (!confirm('Are you sure you want to clear all API test cases for this product?')) return;

    try {
        const response = await fetch('/api-testing/clear-all', {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            showToast('All API test cases cleared.');
            apiTestCases = [];
            displayApiTestCases(apiTestCases);
        } else {
            throw new Error(data.error || 'Failed to clear test cases');
        }
    } catch (error) {
        showToast('Error: ' + error.message);
    }
}

async function viewApiHistory(id) {
    try {
        const response = await fetch(`/api-testing/history/${id}`);
        const data = await response.json();

        if (response.ok) {
            // In a real app, show a modal. For now, alert or log.
            console.log('History for ' + id, data);
            if (data.length === 0) {
                showToast('No execution history for this test.');
            } else {
                showToast(`Found ${data.length} historical executions. Check console for details.`);
            }
        }
    } catch (error) {
        console.error('History error:', error);
    }
}

// Utility
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}
