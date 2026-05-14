// ===================================
// State Management
// ===================================
let latestTestCases = []; // Test cases from the current upload
let allTestCases = [];    // All test cases (history)
let currentFilter = 'all';
let currentFilename = null;
let selectedFileObj = null;

// ===================================
// DOM Elements
// ===================================
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const selectedFile = document.getElementById('selectedFile');
const fileName = document.getElementById('fileName');
const removeFileBtn = document.getElementById('removeFileBtn');
const generateBtn = document.getElementById('generateBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const statsSection = document.getElementById('statsSection');
const testCasesSection = document.getElementById('testCasesSection');
const testCasesGrid = document.getElementById('testCasesGrid');
const exportBtn = document.getElementById('exportBtn');
const refreshBtn = document.getElementById('refreshBtn');
const editModal = document.getElementById('editModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const editForm = document.getElementById('editForm');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ===================================
// File Upload Handlers
// ===================================
browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

uploadArea.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        // Create a new DataTransfer object to set files in the input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInput.files = dataTransfer.files;

        handleFileSelect(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

removeFileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.value = '';
    selectedFileObj = null;
    uploadArea.style.display = 'block';
    selectedFile.style.display = 'none';
});

function handleFileSelect(file) {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

    if (!allowedTypes.includes(file.type)) {
        showToast('Invalid file type. Please upload PDF, DOCX, or TXT files.');
        return;
    }

    if (file.size > 16 * 1024 * 1024) {
        showToast('File size exceeds 16MB limit.');
        return;
    }

    fileName.textContent = file.name;
    selectedFileObj = file;
    uploadArea.style.display = 'none';
    selectedFile.style.display = 'block';
}

// ===================================
// Generate Test Cases
// ===================================
generateBtn.addEventListener('click', async () => {
    const file = selectedFileObj || fileInput.files[0];
    if (!file) {
        showToast('Please select a file first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Show loading
    selectedFile.style.display = 'none';
    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const message = data.replaced
                ? `Replaced previous test cases. Generated ${data.test_cases.length} new test cases for "${data.filename}"`
                : `Successfully generated ${data.test_cases.length} test cases for "${data.filename}"`;
            showToast(message);
            loadingIndicator.style.display = 'none';

            // Reset upload area
            fileInput.value = '';
            selectedFileObj = null;
            uploadArea.style.display = 'block';

            // Load and display test cases for this file only
            currentFilename = data.filename;

            // Set as latest
            latestTestCases = data.test_cases;

            // Render Latest
            displayTestCases(latestTestCases, 'testCasesGrid');
            displayTraceabilityMatrix(latestTestCases);
            updateStats(latestTestCases);

            // Show sections
            statsSection.style.display = 'grid';
            document.getElementById('typeBreakdown').style.display = 'block';
            document.getElementById('filterButtons').style.display = 'flex';
            testCasesSection.style.display = 'block';

            // Switch to generated tab
            document.querySelector('[data-tab="test-cases"]').click();

            // Also refresh the history in background
            await loadAllTestCases();
        } else {
            throw new Error(data.error || 'Failed to generate test cases');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error: ' + error.message);
        loadingIndicator.style.display = 'none';
        selectedFile.style.display = 'block';
    }
});

// ===================================
// Load Test Cases
// ===================================
// ===================================
// Load Test Cases (History)
// ===================================
async function loadAllTestCases() {
    try {
        const response = await fetch('/test-cases'); // Fetches all
        const testCases = await response.json();
        allTestCases = testCases;
        displayTestCases(allTestCases, 'executionGrid');
        // Also update RTM with history so it's "stored" (persistent view)
        // If the user hasn't just generated new ones (latestTestCases is empty), show full history RTM
        if (latestTestCases.length === 0) {
            displayTraceabilityMatrix(allTestCases);
        }
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

// ===================================
// Display Test Cases
// ===================================
function displayTestCases(testCases, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (testCases.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                <p style="font-size: 1.2rem;">No test cases to display.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = testCases.map(tc => `
        <div class="test-case-card" data-id="${tc.id}">
            <div class="test-case-header">
                <div class="test-case-title">
                    <h3>${escapeHtml(tc.test_case_name)}</h3>
                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">File: ${escapeHtml(tc.requirement_file || 'Unknown')}</div>
                    <div class="test-case-meta">
                        <span class="badge badge-priority-${tc.priority.toLowerCase()}">${tc.priority}</span>
                        <span class="badge badge-type">${tc.test_type}</span>
                        <span class="badge badge-status">${tc.status || 'Not Executed'}</span>
                    </div>
                </div>
                <div class="test-case-actions">
                    <button class="btn-icon-only code" onclick="generateAutomation(${tc.id})" title="Generate Automation Code">
                        🤖
                    </button>
                    <button class="btn-icon-only edit" onclick="editTestCase(${tc.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="btn-icon-only delete" onclick="deleteTestCase(${tc.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </div>
            
            <div class="test-case-body">
                ${tc.description ? `
                    <div class="test-case-field">
                        <h4>Description</h4>
                        <p>${escapeHtml(tc.description)}</p>
                    </div>
                ` : ''}
                
                ${tc.preconditions ? `
                    <div class="test-case-field">
                        <h4>Preconditions</h4>
                        <p>${escapeHtml(tc.preconditions)}</p>
                    </div>
                ` : ''}
                
                <div class="test-case-field">
                    <h4>Test Steps</h4>
                    <p>${escapeHtml(tc.test_steps)}</p>
                </div>
                
                <div class="test-case-field">
                    <h4>Expected Result</h4>
                    <p>${escapeHtml(tc.expected_result)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// ===================================
// Update Statistics
// ===================================
function updateStats(testCases) {
    const total = testCases.length;
    const high = testCases.filter(tc => tc.priority === 'High').length;

    // Define non-functional test types
    const nonFunctionalTypes = ['Performance', 'Security', 'Usability', 'Reliability', 'Compatibility', 'Maintainability'];

    // Count functional vs non-functional
    const functional = testCases.filter(tc => !nonFunctionalTypes.includes(tc.test_type)).length;
    const nonFunctional = testCases.filter(tc => nonFunctionalTypes.includes(tc.test_type)).length;

    // Count by specific non-functional types
    const performance = testCases.filter(tc => tc.test_type === 'Performance').length;
    const security = testCases.filter(tc => tc.test_type === 'Security').length;
    const usability = testCases.filter(tc => tc.test_type === 'Usability').length;
    const reliability = testCases.filter(tc => tc.test_type === 'Reliability').length;
    const compatibility = testCases.filter(tc => tc.test_type === 'Compatibility').length;
    const maintainability = testCases.filter(tc => tc.test_type === 'Maintainability').length;

    // Update main stats
    document.getElementById('totalTestCases').textContent = total;
    document.getElementById('functionalCount').textContent = functional;
    document.getElementById('nonFunctionalCount').textContent = nonFunctional;
    document.getElementById('highPriority').textContent = high;

    // Update type breakdown
    document.getElementById('performanceCount').textContent = performance;
    document.getElementById('securityCount').textContent = security;
    document.getElementById('usabilityCount').textContent = usability;
    document.getElementById('reliabilityCount').textContent = reliability;
    document.getElementById('compatibilityCount').textContent = compatibility;
    document.getElementById('maintainabilityCount').textContent = maintainability;
}

// ===================================
// Traceability Matrix
// ===================================
function displayTraceabilityMatrix(testCases) {
    const matrixSection = document.getElementById('traceabilitySection');
    const tbody = document.querySelector('#traceabilityMatrix tbody');

    // Group test cases by requirement ID
    const reqMap = {};

    testCases.forEach(tc => {
        const reqId = tc.requirement_id || 'General';
        if (!reqMap[reqId]) {
            reqMap[reqId] = [];
        }
        reqMap[reqId].push(tc);
    });

    // If no test cases or only "General", hide the matrix (optional, but user asked for it so let's show)
    if (testCases.length === 0) {
        matrixSection.style.display = 'none';
        return;
    }

    matrixSection.style.display = 'block';
    tbody.innerHTML = '';

    // Sort requirements (try to sort logically: REQ-001, REQ-002...)
    const sortedReqIds = Object.keys(reqMap).sort((a, b) => {
        if (a === 'General') return 1;
        if (b === 'General') return -1;
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    sortedReqIds.forEach(reqId => {
        const cases = reqMap[reqId];

        // Create a row for each test case, but merge the Requirement ID cell
        cases.forEach((tc, index) => {
            const tr = document.createElement('tr');
            tr.style.cssText = 'border-bottom: 1px solid #444;';

            // Requirement ID (Rowspan)
            if (index === 0) {
                const tdReq = document.createElement('td');
                tdReq.style.cssText = 'padding: 1rem; border-right: 1px solid #444; vertical-align: top;';
                tdReq.rowSpan = cases.length;
                tdReq.textContent = reqId;
                tr.appendChild(tdReq);

                // Requirement Description (Rowspan) - New Column
                const tdReqDesc = document.createElement('td');
                tdReqDesc.style.cssText = 'padding: 1rem; border-right: 1px solid #444; vertical-align: top; width: 300px;';
                tdReqDesc.rowSpan = cases.length;

                // Get description from the first test case in the group (or fallback)
                // Assuming all test cases for the same reqId have the same req description
                tdReqDesc.textContent = tc.requirement_description || 'No description available';
                tr.appendChild(tdReqDesc);
            }

            // Test Case ID
            const tdId = document.createElement('td');
            tdId.style.cssText = 'padding: 1rem; color: #888; border-right: 1px solid #444;';
            tdId.textContent = `TC-${tc.id}`;
            tr.appendChild(tdId);

            // Test Case Name
            const tdName = document.createElement('td');
            tdName.style.cssText = 'padding: 1rem;';
            tdName.textContent = tc.test_case_name;
            tr.appendChild(tdName);

            // Status
            const tdStatus = document.createElement('td');
            tdStatus.style.cssText = 'padding: 1rem; text-align: center;';
            const statusColor = tc.status === 'Passed' ? '#28a745' : (tc.status === 'Failed' ? '#dc3545' : '#6c757d');
            tdStatus.innerHTML = `<span class="badge" style="background: ${statusColor}; color: white;">${tc.status || 'Covered'}</span>`;
            tr.appendChild(tdStatus);

            tbody.appendChild(tr);
        });
    });
}

// ===================================
// Edit Test Case
// ===================================
function editTestCase(id) {
    // If we are editing, we usually need to find it in either latest or all
    const testCase = latestTestCases.find(tc => tc.id === id) || allTestCases.find(tc => tc.id === id);
    if (!testCase) return;

    currentEditingId = id;

    // Populate form
    document.getElementById('editTestCaseId').value = id;
    document.getElementById('editTestCaseName').value = testCase.test_case_name;
    document.getElementById('editDescription').value = testCase.description || '';
    document.getElementById('editPriority').value = testCase.priority;

    document.getElementById('editTestType').value = testCase.test_type;
    // Handle potential missing status in old records
    document.getElementById('editStatus').value = testCase.status || 'Not Executed';
    document.getElementById('editPreconditions').value = testCase.preconditions || '';
    document.getElementById('editTestSteps').value = testCase.test_steps;
    document.getElementById('editExpectedResult').value = testCase.expected_result;

    // Show modal
    editModal.classList.add('active');
}

// ===================================
// Delete Test Case
// ===================================
async function deleteTestCase(id) {
    if (!confirm('Are you sure you want to delete this test case?')) {
        return;
    }

    try {
        const response = await fetch(`/test-cases/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Test case deleted successfully');

            // Refresh history
            await loadAllTestCases();

            // Update latest list if applicable
            const idx = latestTestCases.findIndex(tc => tc.id == id);
            if (idx !== -1) {
                latestTestCases.splice(idx, 1);
                displayTestCases(latestTestCases, 'testCasesGrid');
                updateStats(latestTestCases);
            }
        } else {
            throw new Error('Failed to delete test case');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error deleting test case');
    }
}

// ===================================
// Modal Handlers
// ===================================
closeModalBtn.addEventListener('click', () => {
    editModal.classList.remove('active');
});

cancelEditBtn.addEventListener('click', () => {
    editModal.classList.remove('active');
});

editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.classList.remove('active');
    }
});

editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editTestCaseId').value;
    const updatedTestCase = {
        test_case_name: document.getElementById('editTestCaseName').value,
        description: document.getElementById('editDescription').value,
        priority: document.getElementById('editPriority').value,

        test_type: document.getElementById('editTestType').value,
        status: document.getElementById('editStatus').value,
        preconditions: document.getElementById('editPreconditions').value,
        test_steps: document.getElementById('editTestSteps').value,
        expected_result: document.getElementById('editExpectedResult').value
    };

    try {
        const response = await fetch(`/test-cases/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTestCase)
        });

        if (response.ok) {
            showToast('Test case updated successfully');
            editModal.classList.remove('active');

            // Refresh lists
            // Update local state if possible or reload
            await loadAllTestCases();
            // Also update latest if it's there
            if (latestTestCases.find(tc => tc.id == id)) {
                // Hack: simple reload to fetch fresh Status for UI
                // To do it properly we'd need to re-fetch or map update locally
                // Let's just update the list view:
                const idx = latestTestCases.findIndex(tc => tc.id == id);
                if (idx !== -1) {
                    latestTestCases[idx] = { ...latestTestCases[idx], ...updatedTestCase, id: parseInt(id) };
                    displayTestCases(latestTestCases, 'testCasesGrid');
                }
            }
        } else {
            throw new Error('Failed to update test case');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error updating test case');
    }
});

// ===================================
// Export Test Cases
// ===================================
exportBtn.addEventListener('click', async () => {
    try {
        showToast('Preparing Excel export...');

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = '/export';
        link.download = `test_cases_export_${new Date().getTime()}.xlsx`;
        link.style.display = 'none';

        // Add to document, click, and remove
        document.body.appendChild(link);
        link.click();

        // Small delay before removing to ensure download starts
        setTimeout(() => {
            document.body.removeChild(link);
            showToast('✅ Download started! Check your Downloads folder.');
        }, 100);

    } catch (error) {
        console.error('Error:', error);
        showToast('Error: ' + error.message);
    }
});

// ===================================
// Clear All Test Cases
// ===================================
refreshBtn.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete ALL test cases? This action cannot be undone.')) {
        return;
    }

    try {
        const response = await fetch('/test-cases/clear-all', {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
            showToast(data.message);

            // Clear the display
            latestTestCases = [];
            allTestCases = [];
            displayTestCases([], 'testCasesGrid');
            displayTestCases([], 'executionGrid');

            // Update stats
            updateStats([]);

            // Hide the sections
            statsSection.style.display = 'none';
            document.getElementById('typeBreakdown').style.display = 'none';
            document.getElementById('filterButtons').style.display = 'none';
            testCasesSection.style.display = 'none';
        } else {
            throw new Error(data.error || 'Failed to clear test cases');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error clearing test cases');
    }
});

// ===================================
// Filter Test Cases
// ===================================
// ===================================
// Filter Test Cases & Tab Switching
// ===================================
document.addEventListener('click', (e) => {
    // Filter Buttons
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.dataset.filter;
        currentFilter = filter;

        // Filter and display - We only filter Current Test Cases for now based on UI placement
        const filteredCases = filter === 'all'
            ? latestTestCases
            : latestTestCases.filter(tc => tc.test_type === filter);

        displayTestCases(filteredCases, 'testCasesGrid');
    }

    // Tab Buttons
    if (e.target.classList.contains('tab-btn')) {
        // Remove active class from all buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        // Show target tab content
        const tabId = e.target.dataset.tab;
        document.getElementById(`tab-${tabId}`).classList.add('active');

        // If clicking execution tab, ensure data is fresh
        if (tabId === 'execution') {
            loadAllTestCases();
        }
    }
});

// Refresh Execution Button
const refreshExecBtn = document.getElementById('refreshExecutionBtn');
if (refreshExecBtn) {
    refreshExecBtn.addEventListener('click', loadAllTestCases);
}

// ===================================
// Toast Notification
// ===================================
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================================
// Utility Functions
// ===================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Initialize
// ===================================
// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load history silently
        await loadAllTestCases();

        // Show the main container so tabs are visible
        testCasesSection.style.display = 'block';

        // Default: display empty state in Generated tab
        displayTestCases([], 'testCasesGrid');

    } catch (error) {
        console.error('Error loading initial test cases:', error);
    }
});
