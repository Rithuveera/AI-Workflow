import express from 'express';
import db from '../database/db.js';

const router = express.Router();

// Helper to map DB result to frontend model
const mapExecution = (exec) => {
    if (!exec) return null;
    return {
        id: exec.id,
        testCaseId: exec.test_case_id,
        status: exec.status,
        notes: exec.notes,
        executedBy: exec.executed_by,
        executionDate: exec.execution_date,
        testCaseTitle: exec.test_case_title,
        requirementTitle: exec.requirement_title,
        product: exec.product
    };
};

// Get all executions
router.get('/', (req, res) => {
    try {
        const { product } = req.query;
        let query = `
            SELECT e.*, tc.title as test_case_title, r.title as requirement_title
            FROM executions e
            LEFT JOIN test_cases tc ON e.test_case_id = tc.id
            LEFT JOIN requirements r ON tc.requirement_id = r.id
        `;
        const params = [];

        if (product) {
            query += ' WHERE e.product = ?';
            params.push(product);
        }

        query += ' ORDER BY e.execution_date DESC';

        const executions = db.prepare(query).all(...params);
        res.json(executions.map(mapExecution));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get executions by test case
router.get('/testcase/:testCaseId', (req, res) => {
    try {
        const executions = db.prepare(`
            SELECT * FROM executions 
            WHERE test_case_id = ?
            ORDER BY execution_date DESC
        `).all(req.params.testCaseId);
        res.json(executions.map(mapExecution));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get execution statistics
router.get('/stats', (req, res) => {
    try {
        const { product } = req.query;
        let query = `
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'Passed' THEN 1 ELSE 0 END) as passed,
                SUM(CASE WHEN status = 'Failed' THEN 1 ELSE 0 END) as failed,
                SUM(CASE WHEN status = 'Blocked' THEN 1 ELSE 0 END) as blocked,
                SUM(CASE WHEN status = 'NA' THEN 1 ELSE 0 END) as notApplicable
            FROM executions
        `;
        const params = [];

        if (product) {
            query += ' WHERE product = ?';
            params.push(product);
        }

        const stats = db.prepare(query).get(...params);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single execution
router.get('/:id', (req, res) => {
    try {
        const execution = db.prepare(`
            SELECT e.*, tc.title as test_case_title
            FROM executions e
            LEFT JOIN test_cases tc ON e.test_case_id = tc.id
            WHERE e.id = ?
        `).get(req.params.id);

        if (!execution) {
            return res.status(404).json({ error: 'Execution not found' });
        }
        res.json(mapExecution(execution));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create execution
router.post('/', (req, res) => {
    try {
        console.log('Received POST /executions body:', req.body);

        // Accept camelCase from frontend
        const { testCaseId, status, notes, executedBy, product } = req.body;

        // Also support snake_case
        const tcId = testCaseId || req.body.test_case_id;
        const execBy = executedBy || req.body.executed_by;

        const id = 'exec-' + Date.now();

        // Validate status
        const validStatuses = ['Passed', 'Failed', 'Blocked', 'NA'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value. Must be one of: Passed, Failed, Blocked, NA' });
        }

        const stmt = db.prepare(`
            INSERT INTO executions (id, test_case_id, status, notes, executed_by, product) 
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        stmt.run(id, tcId, status, notes || '', execBy || 'User', product || 'BSSTech ERP');

        const newExecution = db.prepare(`
            SELECT e.*, tc.title as test_case_title
            FROM executions e
            LEFT JOIN test_cases tc ON e.test_case_id = tc.id
            WHERE e.id = ?
        `).get(id);
        res.status(201).json(mapExecution(newExecution));
    } catch (error) {
        console.error('Error creating execution:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update execution
router.put('/:id', (req, res) => {
    try {
        const { status, notes, executedBy } = req.body;
        const execBy = executedBy || req.body.executed_by;

        // Validate status
        const validStatuses = ['Passed', 'Failed', 'Blocked', 'NA'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const stmt = db.prepare(`
            UPDATE executions 
            SET status = ?, notes = ?, executed_by = ?
            WHERE id = ?
        `);

        const result = stmt.run(status, notes, execBy, req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Execution not found' });
        }

        const updated = db.prepare('SELECT * FROM executions WHERE id = ?').get(req.params.id);
        res.json(mapExecution(updated));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete execution
router.delete('/:id', (req, res) => {
    try {
        const stmt = db.prepare('DELETE FROM executions WHERE id = ?');
        const result = stmt.run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Execution not found' });
        }

        res.json({ message: 'Execution deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
