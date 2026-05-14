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

    const suiteName = document.getElementById('suiteNameInput').value;
    formData.append('test_suite', suiteName);

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
            document.getElementById('suiteNameInput').value = '';
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
// Confluence Import
// ===================================
const importConfluenceBtn = document.getElementById('importConfluenceBtn');
const confluenceUrlInput = document.getElementById('confluenceUrlInput');

if (importConfluenceBtn) {
    importConfluenceBtn.addEventListener('click', async () => {
        const pageUrl = confluenceUrlInput.value.trim();
        if (!pageUrl) {
            showToast('Please enter a Confluence Page URL or Page ID.');
            return;
        }

        const suiteName = document.getElementById('suiteNameInput').value;
        const modelName = document.getElementById('modelSelect').value;

        // Show loading
        uploadArea.style.display = 'none';
        document.querySelector('.confluence-import-area').style.display = 'none';
        loadingIndicator.style.display = 'block';

        try {
            const response = await fetch('/import-confluence', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page_url: pageUrl,
                    test_suite: suiteName,
                    model: modelName
                })
            });

            const data = await response.json();

            if (response.ok) {
                showToast(data.message);
                loadingIndicator.style.display = 'none';

                // Reset fields
                confluenceUrlInput.value = '';
                document.getElementById('suiteNameInput').value = '';
                uploadArea.style.display = 'block';
                document.querySelector('.confluence-import-area').style.display = 'block';

                // Load and display test cases
                currentFilename = data.filename;
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

                // Also refresh history
                await loadAllTestCases();
            } else {
                throw new Error(data.error || 'Failed to import from Confluence');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Error: ' + error.message);
            loadingIndicator.style.display = 'none';
            uploadArea.style.display = 'block';
            document.querySelector('.confluence-import-area').style.display = 'block';
        }
    });
}

// ===================================
// Load Test Cases
// ===================================
// ===================================
// ===================================
// Load Test Cases (History)
// ===================================
async function loadTestHistory() {
    try {
        const response = await fetch('/test-suites');
        const historyData = await response.json();
        displayTestHistory(historyData);
    } catch (error) {
        console.error('Error loading history:', error);
    }
}

function displayTestHistory(suites) {
    const container = document.getElementById('historyGrid');
    if (!container) return;

    if (suites.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                <p style="font-size: 1.2rem;">No history available yet.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = suites.map(suite => `
        <div class="test-case-card" style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <h3>${escapeHtml(suite.test_suite)}</h3>
                <div style="font-size: 0.9rem; color: #aaa; margin-top: 5px;">
                    <span style="display: inline-flex; align-items: center; gap: 5px;">
                        📄 ${escapeHtml(suite.requirement_file)}
                    </span>
                    <span style="margin: 0 10px;">•</span>
                    <span>📅 ${new Date(suite.created_at).toLocaleString()}</span>
                </div>
                <div style="margin-top: 8px;">
                     <span class="badge badge-type" style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3);">
                        ${suite.total_cases} Test Cases
                     </span>
                </div>
            </div>
            <div>
                <a href="/export?batch_id=${suite.batch_id}" class="btn btn-primary" style="text-decoration: none; font-size: 0.9rem;">
                    📥 Download
                </a>
            </div>
        </div>
    `).join('');
}

async function loadAllTestCases() {
    try {
        const response = await fetch('/test-cases'); // Fetches all
        const testCases = await response.json();
        allTestCases = testCases;

        // 1. Render flat list for Traceability (optional view) or other uses
        // displayTestCases(allTestCases, 'someOtherContainer'); 

        // 2. Render Suite-Grouped list for Execution Tab
        displayExecutionSuites(allTestCases, 'executionGrid');

        // 3. Persist "Generated Test Cases" view
        // If latestTestCases is empty (e.g. on reload or product switch), try to find the most recent batch
        if (latestTestCases.length === 0 && allTestCases.length > 0) {
            const latestBatchId = allTestCases[0].batch_id;
            if (latestBatchId) {
                latestTestCases = allTestCases.filter(tc => tc.batch_id === latestBatchId);
            }
        }

        // 4. Update UI Components
        if (latestTestCases.length > 0) {
            displayTestCases(latestTestCases, 'testCasesGrid');
            displayTraceabilityMatrix(latestTestCases);
            updateStats(latestTestCases);

            // Ensure sections are visible
            const section = document.getElementById('testCasesSection');
            if (section) section.style.display = 'block';
            if (statsSection) statsSection.style.display = 'grid';
            if (document.getElementById('typeBreakdown')) document.getElementById('typeBreakdown').style.display = 'block';
            if (document.getElementById('filterButtons')) document.getElementById('filterButtons').style.display = 'flex';
        } else {
            displayTraceabilityMatrix(allTestCases);
        }

    } catch (error) {
        console.error('Error loading cases:', error);
    }
}

// ===================================
// Initialize
// ===================================
// Initialize
// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load history
        await loadTestHistory();
        await loadAllTestCases();

        // Refresh History Handler
        const refreshHistoryBtn = document.getElementById('refreshHistoryBtn');
        if (refreshHistoryBtn) {
            refreshHistoryBtn.addEventListener('click', loadTestHistory);
        }

        // Show the main container so tabs are visible
        const section = document.getElementById('testCasesSection');
        if (section) section.style.display = 'block';

        // ONLY display empty state if we didn't find any latest cases
        if (latestTestCases.length === 0) {
            displayTestCases([], 'testCasesGrid');
        }

    } catch (error) {
        console.error('Error loading initial test cases:', error);
    }
});

// ===================================
// Display Test Cases
// ===================================
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

    const isExecutionMode = containerId === 'executionGrid';
    container.innerHTML = generateTestCasesHTML(testCases, isExecutionMode);
}

function generateTestCasesHTML(testCases, isExecutionMode) {
    return testCases.map(tc => `
        <div class="test-case-card" data-id="${tc.id}" style="${isExecutionMode ? 'border-left: 4px solid #4472C4;' : ''}">
            <div class="test-case-header">
                <div class="test-case-title">
                    <h3>${escapeHtml(tc.test_case_name)}</h3>
                    <div style="font-size: 0.8rem; color: #aaa; margin-bottom: 0.5rem; display: flex; gap: 10px;">
                        <span>File: ${escapeHtml(tc.requirement_file || 'Unknown')}</span>
                        ${tc.test_suite ? `<span style="color: #4CAF50;">Target Suite: ${escapeHtml(tc.test_suite)}</span>` : ''}
                    </div>
                    <div class="test-case-meta">
                        <span class="badge badge-priority-${tc.priority.toLowerCase()}">${tc.priority}</span>
                        <span class="badge badge-type">${tc.test_type}</span>
                        <span class="badge badge-status" id="status-badge-${tc.id}">${tc.status || 'Not Executed'}</span>
                    </div>
                </div>
                
                ${isExecutionMode ? `
                <div class="test-case-actions execution-actions" style="display: flex; gap: 5px;">
                    <button class="btn-sm btn-success" onclick="executeTest(${tc.id}, 'Passed')" title="Pass">Pass</button>
                    <button class="btn-sm btn-danger" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" onclick="executeTest(${tc.id}, 'Failed')" title="Fail">Fail</button>
                    <button class="btn-sm" style="background: #6c757d; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;" onclick="executeTest(${tc.id}, 'Blocked')" title="Block">Block</button>
                </div>
                ` : `
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
                `}
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

function displayExecutionSuites(testCases, containerId, activeSuiteName = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    if (testCases.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                <p style="font-size: 1.2rem;">No test cases to display.</p>
            </div>
        `;
        return;
    }

    // Group by Suite
    const suites = {};
    const stats = {};

    testCases.forEach(tc => {
        const suiteName = tc.test_suite || 'Uncategorized';
        if (!suites[suiteName]) suites[suiteName] = [];
        suites[suiteName].push(tc);

        // Track stats for badges
        if (!stats[suiteName]) stats[suiteName] = { total: 0, passed: 0, failed: 0 };
        stats[suiteName].total++;
        if (tc.status === 'Passed') stats[suiteName].passed++;
        if (tc.status === 'Failed') stats[suiteName].failed++;
    });

    const sortedSuiteNames = Object.keys(suites).sort();

    // 1. Create Layout Container
    const layout = document.createElement('div');
    layout.style.display = 'flex';
    layout.style.gap = '20px';
    layout.style.minHeight = '500px';

    // 2. Sidebar (Suite List)
    const sidebar = document.createElement('div');
    sidebar.style.flex = '0 0 280px';
    sidebar.style.background = '#252525';
    sidebar.style.borderRadius = '8px';
    sidebar.style.border = '1px solid #444';
    sidebar.style.padding = '10px';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.gap = '5px';
    sidebar.style.overflowY = 'auto';

    const sidebarHeader = document.createElement('h3');
    sidebarHeader.textContent = 'Test Suites';
    sidebarHeader.style.margin = '0 0 10px 10px';
    sidebarHeader.style.fontSize = '1rem';
    sidebarHeader.style.color = '#aaa';
    sidebar.appendChild(sidebarHeader);

    // 3. Content Area (Table)
    const contentArea = document.createElement('div');
    contentArea.style.flex = '1';
    contentArea.style.background = '#252525';
    contentArea.style.borderRadius = '8px';
    contentArea.style.border = '1px solid #444';
    contentArea.style.padding = '20px';
    contentArea.style.overflowX = 'auto';

    // Helper to render sidebar items
    sortedSuiteNames.forEach((suiteName, index) => {
        const btn = document.createElement('button');
        const s = stats[suiteName];

        btn.className = 'suite-nav-btn'; // We'll assume some basic button styles or add inline
        btn.style.textAlign = 'left';
        btn.style.padding = '12px 15px';
        btn.style.background = 'transparent';
        btn.style.border = 'none';
        btn.style.color = '#fff';
        btn.style.cursor = 'pointer';
        btn.style.borderRadius = '6px';
        btn.style.display = 'flex';
        btn.style.justifyContent = 'space-between';
        btn.style.alignItems = 'center';

        btn.innerHTML = `
            <span>${escapeHtml(suiteName)}</span>
            <span style="font-size: 0.8rem; background: #333; padding: 2px 6px; borderRadius: 4px; color: ${s.failed > 0 ? '#dc3545' : (s.passed === s.total ? '#28a745' : '#aaa')}">${s.passed}/${s.total}</span>
        `;

        btn.addEventListener('mouseenter', () => { if (!btn.classList.contains('active')) btn.style.background = '#333' });
        btn.addEventListener('mouseleave', () => { if (!btn.classList.contains('active')) btn.style.background = 'transparent' });

        btn.addEventListener('click', () => {
            // Update Active State
            document.querySelectorAll('.suite-nav-btn').forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
            });
            btn.classList.add('active');
            btn.style.background = '#4472C4'; // Active color

            // Render Content
            renderSuiteTable(suites[suiteName], suiteName, contentArea);
        });

        sidebar.appendChild(btn);

        // Auto-select logic
        if (activeSuiteName) {
            if (suiteName === activeSuiteName) {
                setTimeout(() => btn.click(), 0);
            }
        } else {
            // Default to first one if none specified
            if (index === 0) {
                setTimeout(() => btn.click(), 0);
            }
        }
    });

    layout.appendChild(sidebar);
    layout.appendChild(contentArea);
    container.appendChild(layout);
}

function renderSuiteTable(cases, suiteName, container) {
    // Header for the Table View
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h2 style="margin: 0;">${escapeHtml(suiteName)}</h2>
            <div style="background: #333; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">
                ${cases.length} Test Cases
            </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
            <thead>
                <tr style="border-bottom: 2px solid #444; color: #aaa;">
                    <th style="text-align: left; padding: 12px;">ID</th>
                    <th style="text-align: left; padding: 12px; width: 40%;">Test Case Name</th>
                    <th style="text-align: center; padding: 12px;">Priority</th>
                    <th style="text-align: center; padding: 12px;">Status</th>
                    <th style="text-align: right; padding: 12px;">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${cases.map(tc => `
                <tr style="border-bottom: 1px solid #333; transition: background 0.2s;">
                    <td style="padding: 12px; color: #888;">TC-${tc.id}</td>
                    <td style="padding: 12px;">
                        <div style="font-weight: 500;">${escapeHtml(tc.test_case_name)}</div>
                    </td>
                    <td style="padding: 12px; text-align: center;">
                        <span class="badge badge-priority-${tc.priority.toLowerCase()}">${tc.priority}</span>
                    </td>
                    <td style="padding: 12px; text-align: center;">
                        <span class="badge badge-status" id="status-badge-${tc.id}">${tc.status || 'Not Executed'}</span>
                    </td>
                    <td style="padding: 12px; text-align: right;">
                        <div style="display: flex; gap: 5px; justify-content: flex-end;">
                            <button class="btn-sm btn-success" style="padding: 4px 10px;" onclick="executeTest(${tc.id}, 'Passed')" title="Pass">✔</button>
                            <button class="btn-sm btn-danger" style="padding: 4px 10px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="executeTest(${tc.id}, 'Failed')" title="Fail">✘</button>
                            <button class="btn-sm" style="padding: 4px 10px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="executeTest(${tc.id}, 'Blocked')" title="Block">⛔</button>
                        </div>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    `;
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
// ===================================
// Traceability Matrix (Suite-Based)
// ===================================
function displayTraceabilityMatrix(testCases) {
    const container = document.getElementById('traceabilitySection');
    if (!container) return;
    container.innerHTML = '';

    // Header
    const pageHeader = document.createElement('div');
    pageHeader.className = 'section-header';
    pageHeader.innerHTML = '<h2>Traceability Matrix (By Suite)</h2>';
    container.appendChild(pageHeader);

    if (testCases.length === 0) {
        container.innerHTML += `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                <p style="font-size: 1.2rem;">No test cases to display.</p>
            </div>
        `;
        return;
    }

    container.style.display = 'block';

    // Group by Suite
    const suiteGroups = {};
    testCases.forEach(tc => {
        const suiteName = tc.test_suite || 'Uncategorized';
        if (!suiteGroups[suiteName]) suiteGroups[suiteName] = [];
        suiteGroups[suiteName].push(tc);
    });

    const sortedSuiteNames = Object.keys(suiteGroups).sort();

    // 1. Create Layout Container
    const layout = document.createElement('div');
    layout.style.display = 'flex';
    layout.style.gap = '20px';
    layout.style.minHeight = '600px';

    // 2. Sidebar (Suite List)
    const sidebar = document.createElement('div');
    sidebar.style.flex = '0 0 300px';
    sidebar.style.background = '#252525';
    sidebar.style.borderRadius = '8px';
    sidebar.style.border = '1px solid #444';
    sidebar.style.padding = '10px';
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.gap = '5px';
    sidebar.style.overflowY = 'auto'; // Vertical scroll

    const sidebarHeader = document.createElement('h3');
    sidebarHeader.textContent = 'Test Suites';
    sidebarHeader.style.margin = '0 0 10px 10px';
    sidebarHeader.style.fontSize = '1rem';
    sidebarHeader.style.color = '#aaa';
    sidebar.appendChild(sidebarHeader);

    // 3. Content Area (Table)
    const contentArea = document.createElement('div');
    contentArea.style.flex = '1';
    contentArea.style.background = '#252525';
    contentArea.style.borderRadius = '8px';
    contentArea.style.border = '1px solid #444';
    contentArea.style.padding = '20px';
    contentArea.style.overflowX = 'auto';

    // Helper to render sidebar items
    sortedSuiteNames.forEach((suiteName, index) => {
        const cases = suiteGroups[suiteName];
        const btn = document.createElement('button');

        // Calculate status for this suite
        const total = cases.length;
        const passed = cases.filter(c => c.status === 'Passed').length;

        // Count unique requirements covered
        const uniqueReqs = new Set(cases.map(c => c.requirement_id)).size;

        btn.className = 'req-nav-btn'; // We can reuse the class or rename
        btn.style.textAlign = 'left';
        btn.style.padding = '12px 15px';
        btn.style.background = 'transparent';
        btn.style.border = 'none';
        btn.style.color = '#fff';
        btn.style.cursor = 'pointer';
        btn.style.borderRadius = '6px';
        btn.style.display = 'flex';
        btn.style.flexDirection = 'column';
        btn.style.gap = '4px';
        btn.style.borderBottom = '1px solid #333';

        btn.innerHTML = `
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <span style="font-weight: bold; font-size: 0.95rem;">${escapeHtml(suiteName)}</span>
                <span style="font-size: 0.8rem; background: #333; padding: 2px 6px; border-radius: 4px;">${passed}/${total} P</span>
            </div>
            <div style="font-size: 0.8rem; color: #888;">
                Covers ${uniqueReqs} Requirements
            </div>
        `;

        btn.addEventListener('mouseenter', () => { if (!btn.classList.contains('active')) btn.style.background = '#333' });
        btn.addEventListener('mouseleave', () => { if (!btn.classList.contains('active')) btn.style.background = 'transparent' });

        btn.addEventListener('click', () => {
            // Update Active State
            document.querySelectorAll('.req-nav-btn').forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
            });
            btn.classList.add('active');
            btn.style.background = '#4472C4';

            // Render Content
            renderSuiteTraceabilityTable(suiteName, cases, contentArea);
        });

        sidebar.appendChild(btn);

        // Auto-select first one
        if (index === 0) {
            setTimeout(() => btn.click(), 0);
        }
    });

    layout.appendChild(sidebar);
    layout.appendChild(contentArea);
    container.appendChild(layout);
}

function renderSuiteTraceabilityTable(suiteName, cases, container) {
    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <h2 style="margin: 0;">${escapeHtml(suiteName)}</h2>
                <div style="background: #333; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">
                    ${cases.length} Test Cases
                </div>
            </div>
            <p style="color: #aaa; font-style: italic;">Mapping Test Cases to Requirements for this Module.</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
            <thead>
                <tr style="border-bottom: 2px solid #444; color: #aaa;">
                    <th style="text-align: left; padding: 12px; width: 15%;">Req ID</th>
                    <th style="text-align: left; padding: 12px; width: 30%;">Req Description</th>
                    <th style="text-align: left; padding: 12px; width: 10%;">TC ID</th>
                    <th style="text-align: left; padding: 12px; width: 30%;">Test Case Name</th>
                    <th style="text-align: center; padding: 12px; width: 15%;">Status</th>
                </tr>
            </thead>
            <tbody>
                ${cases.map(tc => `
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 12px; font-weight: bold; color: #4CAF50;">${escapeHtml(tc.requirement_id || 'General')}</td>
                    <td style="padding: 12px; font-size: 0.9rem; color: #ddd;">
                        ${escapeHtml(tc.requirement_description || '-')}
                    </td>
                    <td style="padding: 12px; color: #888;">TC-${tc.id}</td>
                    <td style="padding: 12px;">
                        <div style="font-weight: 500;">${escapeHtml(tc.test_case_name)}</div>
                    </td>
                    <td style="padding: 12px; text-align: center;">
                        <span class="badge badge-status" style="background: ${tc.status === 'Passed' ? '#28a745' : (tc.status === 'Failed' ? '#dc3545' : '#6c757d')}">${tc.status || 'Not Executed'}</span>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    `;
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
// Execute Test Case (Versioned)
// ===================================
// ===================================
// Execute Test Case (Versioned)
// ===================================
async function executeTest(id, status) {
    // If status is Failed, open modal instead
    if (status === 'Failed') {
        openFailModal(id);
        return;
    }

    // Otherwise execute immediately (Pass/Block)
    await submitExecution(id, status);
}

// Fail Modal Helpers
const failModal = document.getElementById('failModal');
const failForm = document.getElementById('failForm');
const closeFailModalBtn = document.getElementById('closeFailModal');
const cancelFailBtn = document.getElementById('cancelFailBtn');

function openFailModal(id) {
    document.getElementById('failTestCaseId').value = id;
    document.getElementById('failDefectId').value = '';
    document.getElementById('failComments').value = '';
    document.getElementById('failEvidence').value = ''; // Reset file input
    if (failModal) failModal.classList.add('active');
}

function closeFailModal() {
    if (failModal) failModal.classList.remove('active');
}

if (closeFailModalBtn) closeFailModalBtn.addEventListener('click', closeFailModal);
if (cancelFailBtn) cancelFailBtn.addEventListener('click', closeFailModal);
if (failForm) {
    failForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('failTestCaseId').value;
        const defectId = document.getElementById('failDefectId').value;
        const comments = document.getElementById('failComments').value;
        const evidenceFile = document.getElementById('failEvidence').files[0];

        await submitExecution(id, 'Failed', comments, defectId, evidenceFile);
        closeFailModal();
    });
}

const aiDefectBtn = document.getElementById('aiDefectBtn');
if (aiDefectBtn) {
    aiDefectBtn.addEventListener('click', async () => {
        const id = document.getElementById('failTestCaseId').value;
        if (!id) return;

        // Get test case details
        const testCase = allTestCases.find(tc => tc.id == id) || latestTestCases.find(tc => tc.id == id);
        if (!testCase) {
            showToast('Test case details not found.');
            return;
        }

        const userObservation = document.getElementById('failComments').value;

        // UI Feedback
        const originalText = aiDefectBtn.innerHTML;
        aiDefectBtn.disabled = true;
        aiDefectBtn.innerHTML = '🤖 Writing...';

        try {
            const response = await fetch('/generate-defect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    test_case: testCase,
                    failure_reason: userObservation || "Test failed. Please analyze based on steps."
                })
            });

            const data = await response.json();

            // Check if response was successful
            if (!response.ok) {
                // Handle quota error (429)
                if (response.status === 429) {
                    alert(`🚫 QUOTA EXCEEDED\n\n${data.error}\n\nYou can still write the defect report manually and submit the test failure.`);
                } else {
                    // Other errors
                    showToast(data.error || 'Failed to generate report.');
                }
                return; // Stop execution
            }

            // Success - populate the textarea
            if (data.report) {
                document.getElementById('failComments').value = data.report;
                showToast('✅ AI report generated successfully!');
            } else {
                showToast('Failed to generate report.');
            }
        } catch (e) {
            console.error(e);
            showToast('Error calling AI: ' + e.message);
        } finally {
            aiDefectBtn.disabled = false;
            aiDefectBtn.innerHTML = originalText;
        }
    });
}

// Submits execution to backend
async function submitExecution(id, status, comments = '', defectId = '', evidenceFile = null) {
    const version = document.getElementById('executionVersion') ? document.getElementById('executionVersion').value : 'Release 1.0';

    if (!version) {
        showToast('Please specify an Execution Version/Cycle name');
        return;
    }

    try {
        // Use FormData to support file upload
        const formData = new FormData();
        formData.append('test_case_id', id);
        formData.append('status', status);
        formData.append('version', version);
        formData.append('comments', comments || `Marked as ${status} on ${new Date().toLocaleString()}`);
        if (defectId) formData.append('defect_id', defectId);
        if (evidenceFile) formData.append('evidence', evidenceFile);

        const response = await fetch('/execute', {
            method: 'POST',
            body: formData // No Content-Type header needed for FormData, browser sets boundary
        });

        if (response.ok) {
            showToast(`Test Case marked as ${status}`);

            // Update UI
            const badge = document.getElementById(`status-badge-${id}`);
            if (badge) {
                badge.textContent = status;
                badge.style.background = status === 'Passed' ? '#28a745' : (status === 'Failed' ? '#dc3545' : '#6c757d');
            }

            // Update local state
            // Ensure ID comparison is safe (int vs string)
            const tc = allTestCases.find(t => t.id == id);
            let currentSuite = null;
            if (tc) {
                tc.status = status;
                currentSuite = tc.test_suite;
            }

            // Re-render execution view to update Sidebar Stats
            // Check if execution grid exists before rendering
            if (document.getElementById('executionGrid')) {
                displayExecutionSuites(allTestCases, 'executionGrid', currentSuite);
            }

            // Refresh RTM if visible
            const rtm = document.getElementById('traceabilityMatrix');
            if (rtm && rtm.offsetParent) {
                displayTraceabilityMatrix(allTestCases);
            } else if (document.getElementById('traceabilitySection') && document.getElementById('traceabilitySection').style.display !== 'none') {
                // Fallback check
                displayTraceabilityMatrix(allTestCases);
            }

        } else {
            throw new Error('Failed to record execution');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error recording execution');
    }
}

// ===================================
// Reports & Dashboard
// ===================================
// ===================================
// Reports & Dashboard (Premium Redesign with Version Filtering)
// ===================================
async function populateVersionDatalist() {
    try {
        const response = await fetch('/versions');
        const versions = await response.json();

        const datalist = document.getElementById('availableVersions');
        if (!datalist) return;

        datalist.innerHTML = '';
        versions.forEach(version => {
            const option = document.createElement('option');
            option.value = version;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error('Error populating version datalist:', error);
    }
}

async function loadVersions() {
    try {
        const response = await fetch('/versions');
        const versions = await response.json();

        const selector = document.getElementById('versionSelector');
        if (!selector) return;

        // Clear existing options except "Overall"
        selector.innerHTML = '<option value="overall">Overall (All Versions)</option>';

        // Add version options
        versions.forEach(version => {
            const option = document.createElement('option');
            option.value = version;
            option.textContent = version;
            selector.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading versions:', error);
    }
}

async function loadReports(selectedVersion = 'overall') {
    try {
        // Build URL with version parameter
        const url = selectedVersion && selectedVersion !== 'overall'
            ? `/reports?version=${encodeURIComponent(selectedVersion)}`
            : '/reports';

        const response = await fetch(url);
        const reportData = await response.json();

        // Fetch test cases filtered by version
        const tcUrl = selectedVersion && selectedVersion !== 'overall'
            ? `/test-cases-by-version?version=${encodeURIComponent(selectedVersion)}`
            : '/test-cases-by-version';

        const tcResponse = await fetch(tcUrl);
        const versionTestCases = await tcResponse.json();

        const container = document.getElementById('reportsContainer');
        container.innerHTML = '';
        container.style.display = 'grid';
        container.style.gap = '20px';
        container.style.color = '#fff';

        if (versionTestCases.length === 0) {
            container.innerHTML = '<p style="color: #aaa; text-align: center; padding: 2rem;">No execution data available yet.</p>';
            return;
        }

        // Use version-filtered test cases for calculations
        const filteredTestCases = versionTestCases;

        // --- CALCULATION ---
        const total = filteredTestCases.length;
        const passed = filteredTestCases.filter(t => t.status === 'Passed').length;
        const failed = filteredTestCases.filter(t => t.status === 'Failed').length;
        const blocked = filteredTestCases.filter(t => t.status === 'Blocked').length;
        const notExecuted = total - (passed + failed + blocked);
        const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

        // --- HELPERS ---
        const cardStyle = `background: linear-gradient(145deg, #2a2a2a, #222); border: 1px solid #333; border-radius: 12px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);`;

        // --- 1. KPI ROW ---
        const kpiRow = document.createElement('div');
        kpiRow.style.display = 'grid';
        kpiRow.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        kpiRow.style.gap = '20px';

        const kpis = [
            { label: 'Total Test Cases', value: total, icon: '📋', color: '#4472C4' },
            { label: 'Passed', value: passed, icon: '✅', color: '#28a745' },
            { label: 'Failed', value: failed, icon: '❌', color: '#dc3545' },
            { label: 'Pass Rate', value: `${passRate}%`, icon: '📈', color: passRate > 80 ? '#28a745' : '#ffc107' }
        ];

        kpiRow.innerHTML = kpis.map(k => `
            <div style="${cardStyle} display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <div style="color: #888; font-size: 0.9rem; margin-bottom: 5px;">${k.label}</div>
                    <div style="font-size: 1.8rem; font-weight: bold; color: ${k.color}; text-shadow: 0 0 10px ${k.color}33;">${k.value}</div>
                </div>
                <div style="font-size: 2rem; opacity: 0.2;">${k.icon}</div>
            </div>
        `).join('');
        container.appendChild(kpiRow);

        // --- 2. MAIN CHARTS GRID ---
        const chartsGrid = document.createElement('div');
        chartsGrid.style.display = 'grid';
        chartsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
        chartsGrid.style.gap = '20px';
        chartsGrid.style.marginTop = '10px';

        // CHART A: Execution Status (Donut - SVG)
        const donutCard = document.createElement('div');
        donutCard.style.cssText = cardStyle;

        // SVG Data Preparation
        const r = 15.9155; // Radius that gives Circumference ~ 100 for easy percentages
        const cx = 18;
        const cy = 18;
        const circumference = 100;

        const slices = [
            { label: 'Passed', count: passed, color: '#28a745' },
            { label: 'Failed', count: failed, color: '#dc3545' },
            { label: 'Blocked', count: blocked, color: '#ffc107' },
            { label: 'Todo', count: notExecuted, color: '#444' }
        ];

        let accumulatedPct = 0;
        const svgSlices = slices.map(slice => {
            const pct = (slice.count / total) * 100;
            if (pct === 0) return '';

            // Dasharray: [length of arc, rest of circle]
            // Offset: Where to start (rotated by accumulated percentage)
            // We start at -25 (12 o'clock)
            const offset = 25 - accumulatedPct;
            accumulatedPct += pct;

            return `
                <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent" stroke="${slice.color}" stroke-width="5"
                    stroke-dasharray="${pct} ${100 - pct}" stroke-dashoffset="${offset}"
                    style="transition: stroke-width 0.2s ease; cursor: pointer;">
                    <title>${slice.label}: ${slice.count} (${Math.round(pct)}%)</title>
                </circle>
            `;
        }).join('');

        // Center Text
        const execPct = Math.round(((passed + failed + blocked) / total) * 100);

        donutCard.innerHTML = `
            <h3 style="margin-top: 0; color: #ddd; border-bottom: 1px solid #444; padding-bottom: 10px;">Execution Overview</h3>
            <div style="display: flex; align-items: center; justify-content: center; padding: 20px;">
                <svg viewBox="0 0 36 36" style="width: 200px; height: 200px; transform: rotate(0deg);">
                    <style>
                        circle:hover { stroke-width: 7; }
                    </style>
                    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#252525" stroke="#333" stroke-width="5"></circle> <!-- Background ring -->
                    ${svgSlices}
                    <g class="donut-text">
                        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-size="0.4rem" font-weight="bold">
                            ${execPct}%
                        </text>
                        <text x="50%" y="62%" dominant-baseline="middle" text-anchor="middle" fill="#aaa" font-size="0.15rem">
                            Executed
                        </text>
                    </g>
                </svg>
            </div>
            <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px; font-size: 0.9rem;">
                <span style="color: #28a745;">● Passed</span>
                <span style="color: #dc3545;">● Failed</span>
                <span style="color: #ffc107;">● Blocked</span>
                <span style="color: #666;">● Todo</span>
            </div>
        `;

        // CHART B: Suite Performance (Horizontal Bars)
        const suiteGroups = {};
        filteredTestCases.forEach(tc => {
            const suite = tc.test_suite || 'Other';
            if (!suiteGroups[suite]) suiteGroups[suite] = { total: 0, passed: 0, failed: 0 };
            suiteGroups[suite].total++;
            if (tc.status === 'Passed') suiteGroups[suite].passed++;
            if (tc.status === 'Failed') suiteGroups[suite].failed++;
        });

        const suiteCard = document.createElement('div');
        suiteCard.style.cssText = cardStyle;
        suiteCard.innerHTML = `
            <h3 style="margin-top: 0; color: #ddd; border-bottom: 1px solid #444; padding-bottom: 10px;">Suite Performance</h3>
            <div style="display: flex; flex-direction: column; gap: 15px; max-height: 300px; overflow-y: auto; padding-right: 5px;">
                ${Object.keys(suiteGroups).map(suite => {
            const s = suiteGroups[suite];
            const pct = Math.round((s.passed / s.total) * 100);
            return `
                        <div title="Passed: ${s.passed}, Failed: ${s.failed}, Total: ${s.total}">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem;">
                                <span>${escapeHtml(suite)}</span>
                                <span style="color: ${pct === 100 ? '#28a745' : '#aaa'}">${pct}%</span>
                            </div>
                            <div style="height: 8px; background: #333; border-radius: 4px; overflow: hidden; cursor: help;">
                                <div style="width: ${pct}%; height: 100%; background: linear-gradient(90deg, #4472C4, #28a745);"></div>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;

        chartsGrid.appendChild(donutCard);
        chartsGrid.appendChild(suiteCard);
        container.appendChild(chartsGrid);

        // --- 3. DEFECT HIGHLIGHTS ---
        const defects = filteredTestCases.filter(tc => tc.status === 'Failed').slice(0, 5); // Latest 5
        const defectRow = document.createElement('div');
        defectRow.style.cssText = cardStyle + ' margin-top: 20px;';

        defectRow.innerHTML = `
            <h3 style="margin-top: 0; color: #ddd; border-bottom: 1px solid #444; padding-bottom: 10px; color: #dc3545;">🔴 Recent Failures & Defects</h3>
            ${defects.length === 0 ? '<p style="color: #aaa;">No active defects. Good job!</p>' : `
                <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                        <tr style="color: #888; font-size: 0.9rem;">
                            <th style="padding: 10px;">ID</th>
                            <th style="padding: 10px;">Test Case</th>
                            <th style="padding: 10px;">Version</th>
                            <th style="padding: 10px;">Defect Ref</th>
                            <th style="padding: 10px;">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${defects.map(tc => `
                            <tr style="border-bottom: 1px solid #333;">
                                <td style="padding: 10px; color: #aaa;">TC-${tc.id}</td>
                                <td style="padding: 10px;">${escapeHtml(tc.test_case_name)}</td>
                                <td style="padding: 10px; color: #4472C4;">${escapeHtml(selectedVersion !== 'overall' ? selectedVersion : (tc.version || 'Latest'))}</td>
                                <td style="padding: 10px; color: #dc3545;">${escapeHtml(tc.defect_id || 'N/A')}</td>
                                <td style="padding: 10px; color: #888; font-size: 0.8rem;">${tc.executed_at || 'Just now'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `}
        `;
        container.appendChild(defectRow);


    } catch (error) {
        console.error('Error loading reports:', error);
        document.getElementById('reportsContainer').innerHTML = '<p>Error loading dashboard.</p>';
    }
}

// Tab Listener Update
const refreshReportsBtn = document.getElementById('refreshReportsBtn');
if (refreshReportsBtn) {
    refreshReportsBtn.addEventListener('click', () => {
        const versionSelector = document.getElementById('versionSelector');
        const selectedVersion = versionSelector ? versionSelector.value : 'overall';
        loadReports(selectedVersion);
    });
}

// Version Selector Change Event
const versionSelector = document.getElementById('versionSelector');
if (versionSelector) {
    versionSelector.addEventListener('change', (e) => {
        loadReports(e.target.value);
    });
}

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

        // If clicking execution tab, ensure data is fresh and load versions for autocomplete
        if (tabId === 'execution') {
            loadAllTestCases();
            populateVersionDatalist();
        }

        if (tabId === 'defects') {
            loadDefects();
        }

        if (tabId === 'reports') {
            // Load versions first, then load reports
            (async () => {
                await loadVersions();
                const versionSelector = document.getElementById('versionSelector');
                const selectedVersion = versionSelector ? versionSelector.value : 'overall';
                loadReports(selectedVersion);
            })();
        }

        if (tabId === 'coverage') {
            loadCoverageData();
        }
    }
});

// Refresh Execution Button
const refreshExecBtn = document.getElementById('refreshExecutionBtn');
if (refreshExecBtn) {
    refreshExecBtn.addEventListener('click', loadAllTestCases);
}

// Refresh Defects Button
const refreshDefectsBtn = document.getElementById('refreshDefectsBtn');
if (refreshDefectsBtn) refreshDefectsBtn.addEventListener('click', loadDefects);

async function loadDefects() {
    const container = document.getElementById('defectsGrid');
    container.innerHTML = '<div style="text-align:center; padding: 2rem;">Loading defects...</div>';
    try {
        const response = await fetch('/defects');
        const defects = await response.json();

        if (defects.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                    <p style="font-size: 1.2rem;">No active defects found. Great job!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = defects.map(d => `
            <div class="test-case-card" style="border-left: 4px solid #dc3545;">
                <div class="test-case-header">
                    <div class="test-case-title">
                        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 5px;">
                            <span style="background: #dc3545; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem;">DEFECT</span>
                            <span style="color: #aaa; font-size: 0.9rem;">${escapeHtml(d.executed_at || 'Unknown Date')}</span>
                        </div>
                        <h3>${escapeHtml(d.test_case_name)}</h3>
                        <div style="font-size: 0.9rem; color: #888; margin-top: 5px;">
                            Suite: ${escapeHtml(d.test_suite || 'General')} | Version: ${escapeHtml(d.version)}
                        </div>
                    </div>
                    <div class="test-case-actions">
                         <span class="badge badge-priority-${d.priority.toLowerCase()}">${d.priority}</span>
                    </div>
                </div>
                
                <div class="test-case-body">
                    <div class="test-case-field" style="background: rgba(220, 53, 69, 0.1); border-left: 3px solid #dc3545;">
                        <h4 style="color: #fca5a5;">Defect Report / Analysis</h4>
                        <p style="white-space: pre-wrap; font-family: monospace; font-size: 0.9rem;">${escapeHtml(d.comments || 'No details provided.')}</p>
                    </div>
                    
                    ${d.defect_id ? `
                    <div class="test-case-field">
                        <h4>External Reference</h4>
                        <p><strong>JIRA/Bug ID:</strong> ${escapeHtml(d.defect_id)}</p>
                    </div>` : ''}
                </div>
            </div>
        `).join('');

    } catch (e) {
        console.error(e);
        container.innerHTML = '<p>Error loading defects.</p>';
    }
}

// ===================================
// Coverage & Risk Analysis Functions
// ===================================
async function loadCoverageData() {
    const grid = document.getElementById('coverageGrid');
    const scoreEl = document.getElementById('overallCoverageScore');

    if (!grid) return;
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Analyzing requirements...</div>';

    // 1. Group test cases by Requirement ID
    const reqMap = {};

    allTestCases.forEach(tc => {
        const rid = tc.requirement_id || 'General';
        if (!reqMap[rid]) {
            reqMap[rid] = {
                id: rid,
                description: tc.requirement_description || 'No description available',
                testCases: [],
                status: 'Todo'
            };
        }
        reqMap[rid].testCases.push(tc);
    });

    const reqs = Object.values(reqMap);

    // 2. Determine Status for each Requirement
    // Status Logic:
    // - Passed: At least one test case has Passed, and NO test cases are currently Failed or Blocked
    // - Failed: At least one test case has Failed
    // - Partial: Some passed, some haven't run, none failed.
    // - Todo: None have run

    reqs.forEach(req => {
        const statuses = req.testCases.map(tc => tc.status);

        if (statuses.includes('Failed')) {
            req.status = 'Failed';
        } else if (statuses.includes('Passed')) {
            if (statuses.includes('Not Executed') || statuses.includes(null)) {
                req.status = 'Partial';
            } else {
                req.status = 'Passed';
            }
        } else {
            req.status = 'Todo';
        }
    });

    // 3. Calculate Stats
    const total = reqs.length;
    const covered = reqs.filter(r => r.status === 'Passed' || r.status === 'Partial').length;
    const gaps = reqs.filter(r => r.status === 'Todo' || r.status === 'Failed').length;
    const score = total > 0 ? Math.round((covered / total) * 100) : 0;

    // 4. Update Header Stats
    if (scoreEl) scoreEl.textContent = `${score}%`;
    document.getElementById('coveredReqCount').textContent = covered;
    document.getElementById('gapReqCount').textContent = gaps;
    document.getElementById('totalReqCount').textContent = total;

    // 5. Render Heatmap
    grid.innerHTML = reqs.map(req => `
        <div class="coverage-item status-${req.status.toLowerCase()}" title="${escapeHtml(req.description)}">
            <span class="req-id">${escapeHtml(req.id)}</span>
            <span class="req-status-text">${req.status}</span>
        </div>
    `).join('');

    // 6. Render Critical Gaps
    const gapContainer = document.getElementById('gapAnalysisContainer');
    const failedReqs = reqs.filter(r => r.status === 'Failed');
    const todoReqs = reqs.filter(r => r.status === 'Todo');

    let gapHtml = '';

    if (failedReqs.length > 0) {
        gapHtml += `
            <div class="gap-alert" style="margin-bottom: 1rem;">
                <div class="gap-icon">⚠️</div>
                <div class="gap-content">
                    <h4>Critical Failures Found</h4>
                    <p>${failedReqs.length} requirement(s) have failed test cases. This indicates high risk in core functionality.</p>
                </div>
            </div>
        `;
    }

    if (todoReqs.length > total * 0.3) { // More than 30% untested
        gapHtml += `
            <div class="gap-alert">
                <div class="gap-icon">📉</div>
                <div class="gap-content">
                    <h4>High Coverage Gap</h4>
                    <p>${Math.round((todoReqs.length / total) * 100)}% of your requirements have not been tested yet. Your shipment risk is currently HIGH.</p>
                </div>
            </div>
        `;
    }

    if (gapHtml === '') {
        gapHtml = `
            <div class="gap-alert" style="background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.2);">
                <div class="gap-icon" style="color: var(--secondary); background: rgba(16, 185, 129, 0.1);">🏆</div>
                <div class="gap-content">
                    <h4 style="color: var(--secondary);">Quality Goal Reached</h4>
                    <p>All requirements have active test coverage and no critical failures are blocking progress.</p>
                </div>
            </div>
        `;
    }

    gapContainer.innerHTML = gapHtml;
}

const refreshCoverageBtn = document.getElementById('refreshCoverageBtn');
if (refreshCoverageBtn) {
    refreshCoverageBtn.addEventListener('click', async () => {
        await loadAllTestCases();
        loadCoverageData();
        showToast('🔄 Coverage analysis updated!');
    });
}

// ===================================
// Jira Integration
// ===================================
const pushJiraBtn = document.getElementById('pushJiraBtn');
if (pushJiraBtn) {
    pushJiraBtn.addEventListener('click', async () => {
        const id = document.getElementById('failTestCaseId').value;
        const comments = document.getElementById('failComments').value;
        const evidenceFile = document.getElementById('failEvidence').files[0];

        if (!comments) {
            showToast('Please provide a failure report first (Manual or AI).');
            return;
        }

        const testCase = allTestCases.find(tc => tc.id == id) || latestTestCases.find(tc => tc.id == id);
        const summary = testCase ? `[Bug] ${testCase.test_case_name}` : 'Defect from QAutoX AI';

        // UI feedback
        const originalText = pushJiraBtn.innerHTML;
        pushJiraBtn.disabled = true;
        pushJiraBtn.innerHTML = 'Sending...';

        try {
            const formData = new FormData();
            formData.append('summary', summary);
            formData.append('description', comments);
            if (evidenceFile) formData.append('evidence', evidenceFile);

            const response = await fetch('/push-to-jira', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                document.getElementById('failDefectId').value = data.issue_key;
                showToast(`✅ Jira Ticket Created: ${data.issue_key}`);
            } else {
                throw new Error(data.error || 'Failed to push to Jira');
            }
        } catch (e) {
            console.error(e);
            alert(`Error pushing to Jira: ${e.message}\n\nPlease check your Jira credentials in settings.`);
        } finally {
            pushJiraBtn.disabled = false;
            pushJiraBtn.innerHTML = originalText;
        }
    });
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
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


