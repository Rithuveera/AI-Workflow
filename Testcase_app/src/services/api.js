const API_BASE_URL = '/api';

// Helper function to safely parse JSON responses
const safeJsonParse = async (response) => {
    const text = await response.text();
    if (!text || text.trim() === '') {
        throw new Error('Server returned an empty response');
    }
    try {
        return JSON.parse(text);
    } catch (error) {
        console.error('Failed to parse JSON:', text);
        throw new Error('Server returned invalid JSON: ' + text.substring(0, 100));
    }
};

// Helper function to handle fetch with better error messages
const fetchWithErrorHandling = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        // Check if response is ok
        if (!response.ok) {
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            try {
                const errorData = await safeJsonParse(response);
                errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
                // If we can't parse error, use status text
            }
            throw new Error(errorMessage);
        }

        return await safeJsonParse(response);
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Cannot connect to server. Please check if the backend is running.');
        }
        throw error;
    }
};

export const api = {
    // Requirements
    getRequirements: async (product) => {
        const url = product
            ? `${API_BASE_URL}/requirements?product=${encodeURIComponent(product)}`
            : `${API_BASE_URL}/requirements`;
        return await fetchWithErrorHandling(url);
    },

    createRequirement: async (data) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/requirements`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },

    updateRequirement: async (id, data) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/requirements/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },

    deleteRequirement: async (id) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/requirements/${id}`, {
            method: 'DELETE',
        });
    },

    // Test Cases
    getTestCases: async (product) => {
        const url = product
            ? `${API_BASE_URL}/test-cases?product=${encodeURIComponent(product)}`
            : `${API_BASE_URL}/test-cases`;
        return await fetchWithErrorHandling(url);
    },

    createTestCase: async (data) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/test-cases`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },

    updateTestCase: async (id, data) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/test-cases/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },

    deleteTestCase: async (id) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/test-cases/${id}`, {
            method: 'DELETE',
        });
    },

    // Executions
    getExecutions: async (product) => {
        const url = product
            ? `${API_BASE_URL}/executions?product=${encodeURIComponent(product)}`
            : `${API_BASE_URL}/executions`;
        return await fetchWithErrorHandling(url);
    },

    getStats: async (product) => {
        const url = product
            ? `${API_BASE_URL}/executions/stats?product=${encodeURIComponent(product)}`
            : `${API_BASE_URL}/executions/stats`;
        return await fetchWithErrorHandling(url);
    },

    createExecution: async (data) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/executions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },

    // Auth
    login: async (credentials) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
    },

    register: async (credentials) => {
        return await fetchWithErrorHandling(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
    }
};
