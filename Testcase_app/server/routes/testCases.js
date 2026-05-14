import express from 'express';
import db from '../database/db.js';

const router = express.Router();

// Helper to map DB result to frontend model
const mapTestCase = (tc) => {
    if (!tc) return null;
    return {
        id: tc.id,
        title: tc.title,
        description: tc.description,
        steps: tc.steps,
        expectedResult: tc.expected_result,
        actualResult: tc.actual_result,
        priority: tc.priority,
        requirementId: tc.requirement_id,
        createdAt: tc.created_at,
        requirementTitle: tc.requirement_title,
        product: tc.product
    };
};

// Get all test cases
router.get('/', (req, res) => {
    try {
        const { product } = req.query;
        let query = `
            SELECT tc.*, r.title as requirement_title 
            FROM test_cases tc
            LEFT JOIN requirements r ON tc.requirement_id = r.id
        `;
        const params = [];

        if (product) {
            query += ' WHERE tc.product = ?';
            params.push(product);
        }

        query += ' ORDER BY tc.created_at DESC';

        const testCases = db.prepare(query).all(...params);
        res.json(testCases.map(mapTestCase));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get test cases by requirement
router.get('/requirement/:requirementId', (req, res) => {
    try {
        const testCases = db.prepare(`
            SELECT * FROM test_cases 
            WHERE requirement_id = ?
            ORDER BY created_at DESC
        `).all(req.params.requirementId);
        res.json(testCases.map(mapTestCase));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single test case
router.get('/:id', (req, res) => {
    try {
        const testCase = db.prepare(`
            SELECT tc.*, r.title as requirement_title 
            FROM test_cases tc
            LEFT JOIN requirements r ON tc.requirement_id = r.id
            WHERE tc.id = ?
        `).get(req.params.id);

        if (!testCase) {
            return res.status(404).json({ error: 'Test case not found' });
        }
        res.json(mapTestCase(testCase));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create test case
router.post('/', (req, res) => {
    try {
        console.log('Received POST /test-cases body:', req.body);
        // Accept camelCase from frontend
        const { requirementId, title, description, steps, expectedResult, actualResult, priority, product } = req.body;

        // Also support snake_case just in case
        const reqId = requirementId || req.body.requirement_id;
        const expRes = expectedResult || req.body.expected_result;
        const actRes = actualResult || req.body.actual_result;

        // Get first two letters from Test Case title, skipping common verbs/articles
        let prefix = 'XX';
        if (title && title.trim().length > 0) {
            const ignoredWords = [
                'verify', 'check', 'checking', 'validate', 'validating', 'test', 'testing',
                'ensure', 'assert', 'confirm', 'the', 'a', 'an', 'that', 'should', 'can',
                'will', 'to', 'for', 'of', 'in', 'on', 'at', 'verfiy'
            ];

            // Split into words
            const words = title.trim().split(/\s+/);

            // Find first word that is NOT in ignored list
            let targetWord = words.find(w => {
                const cleanW = w.toLowerCase().replace(/[^a-z0-9]/g, '');
                return cleanW.length > 0 && !ignoredWords.includes(cleanW);
            });

            // Fallback to first word if all are ignored or empty
            if (!targetWord) {
                targetWord = words[0];
            }

            // Generate prefix from target word
            // First, get only alphabetic characters (prioritize letters over numbers)
            let cleanTitle = targetWord.replace(/[^a-zA-Z]/g, '');

            // If no letters found, try alphanumeric
            if (cleanTitle.length === 0) {
                cleanTitle = targetWord.replace(/[^a-zA-Z0-9]/g, '');
            }

            if (cleanTitle.length >= 2) {
                prefix = cleanTitle.substring(0, 2).toUpperCase();
            } else if (cleanTitle.length === 1) {
                prefix = cleanTitle.toUpperCase() + 'X';
            }
        }

        // Generate sequential ID based on prefix
        const existingIds = db.prepare("SELECT id FROM test_cases WHERE id LIKE ?").all(`TC_${prefix}_%`);
        let maxId = 0;

        existingIds.forEach(row => {
            // Match IDs like TC_MA_001
            const match = row.id.match(new RegExp(`^TC_${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_(\\d+)$`));
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxId) {
                    maxId = num;
                }
            }
        });

        const id = `TC_${prefix}_${String(maxId + 1).padStart(3, '0')}`;

        const stmt = db.prepare(`
            INSERT INTO test_cases (id, requirement_id, title, description, steps, expected_result, actual_result, priority, product) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run(id, reqId, title, description, steps, expRes, actRes, priority || 'Medium', product || 'BSSTech ERP');

        const newTestCase = db.prepare('SELECT * FROM test_cases WHERE id = ?').get(id);
        res.status(201).json(mapTestCase(newTestCase));
    } catch (error) {
        console.error('Error creating test case:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update test case
router.put('/:id', (req, res) => {
    try {
        const { requirementId, title, description, steps, expectedResult, actualResult, priority, product } = req.body;

        const reqId = requirementId || req.body.requirement_id;
        const expRes = expectedResult || req.body.expected_result;
        const actRes = actualResult || req.body.actual_result;

        const stmt = db.prepare(`
            UPDATE test_cases 
            SET requirement_id = ?, title = ?, description = ?, steps = ?, expected_result = ?, actual_result = ?, priority = ?, product = ?
            WHERE id = ?
        `);

        const result = stmt.run(reqId, title, description, steps, expRes, actRes, priority, product, req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Test case not found' });
        }

        const updated = db.prepare('SELECT * FROM test_cases WHERE id = ?').get(req.params.id);
        res.json(mapTestCase(updated));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete test case
router.delete('/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM test_cases WHERE id = ?');
        const result = stmt.run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Test case not found' });
        }

        res.json({ message: 'Test case deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
