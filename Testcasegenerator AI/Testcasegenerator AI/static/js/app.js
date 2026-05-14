// ===================================
// State Management
// ===================================
let currentTestCases = [];
let currentEditingId = null;
let currentFilter = 'all';
let currentFilename = null; // Track the current file

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
browseBtn.addEventListener('click', () => {
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
    uploadArea.style.display = 'none';
    selectedFile.style.display = 'block';
}

// ===================================
// Generate Test Cases
// ===================================
generateBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
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
            uploadArea.style.display = 'block';

            // Load and display test cases for this file only
            currentFilename = data.filename;
            await loadTestCases(data.filename);
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
async function loadTestCases(filename = null) {
    try {
        // Build URL with optional filename parameter
        let url = '/test-cases';
        if (filename) {
            url += `?filename=${encodeURIComponent(filename)}`;
            currentFilename = filename;
        }

        const response = await fetch(url);
        const testCases = await response.json();

        currentTestCases = testCases;
        displayTestCases(testCases);
        updateStats(testCases);

        // Show sections
        statsSection.style.display = 'grid';
        document.getElementById('typeBreakdown').style.display = testCases.length > 0 ? 'block' : 'none';
        document.getElementById('filterButtons').style.display = testCases.length > 0 ? 'flex' : 'none';
        testCasesSection.style.display = 'block';
    } catch (error) {
        console.error('Error loading test cases:', error);
        showToast('Error loading test cases');
    }
}

// ===================================
// Display Test Cases
// ===================================
function displayTestCases(testCases) {
    if (testCases.length === 0) {
        testCasesGrid.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                <p style="font-size: 1.2rem;">No test cases yet. Upload a requirement document to get started!</p>
            </div>
        `;
        return;
    }

    testCasesGrid.innerHTML = testCases.map(tc => `
        <div class="test-case-card" data-id="${tc.id}">
            <div class="test-case-header">
                <div class="test-case-title">
                    <h3>${escapeHtml(tc.test_case_name)}</h3>
                    <div class="test-case-meta">
                        <span class="badge badge-priority-${tc.priority.toLowerCase()}">${tc.priority}</span>
                        <span class="badge badge-type">${tc.test_type}</span>
                    </div>
                </div>
                <div class="test-case-actions">
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
// Edit Test Case
// ===================================
function editTestCase(id) {
    const testCase = currentTestCases.find(tc => tc.id === id);
    if (!testCase) return;

    currentEditingId = id;

    // Populate form
    document.getElementById('editTestCaseId').value = id;
    document.getElementById('editTestCaseName').value = testCase.test_case_name;
    document.getElementById('editDescription').value = testCase.description || '';
    document.getElementById('editPriority').value = testCase.priority;
    document.getElementById('editTestType').value = testCase.test_type;
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
            await loadTestCases();
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
            await loadTestCases();
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
            currentTestCases = [];
            testCasesGrid.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    <p style="font-size: 1.2rem;">No test cases yet. Upload a requirement document to get started!</p>
                </div>
            `;

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
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Get filter value
        const filter = e.target.dataset.filter;
        currentFilter = filter;

        // Filter and display
        const filteredCases = filter === 'all'
            ? currentTestCases
            : currentTestCases.filter(tc => tc.test_type === filter);

        displayTestCases(filteredCases);
    }
});

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
document.addEventListener('DOMContentLoaded', async () => {
    // Clear all test cases on page load for a fresh start
    try {
        await fetch('/test-cases/clear-all', { method: 'DELETE' });
        console.log('Test cases cleared on page load');
    } catch (error) {
        console.error('Error clearing test cases:', error);
    }

    // Initialize with empty state
    currentTestCases = [];
    displayTestCases([]);
    updateStats([]);
});
