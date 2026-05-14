import express from 'express';
import db from '../database/db.js';
import upload from '../config/upload.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Helper to map DB result to frontend model
const mapRequirement = (req) => {
    if (!req) return null;
    return {
        id: req.id,
        title: req.title,
        description: req.description,
        attachmentName: req.attachment_name,
        attachmentPath: req.attachment_path,
        attachmentSize: req.attachment_size,
        attachmentType: req.attachment_type,
        createdAt: req.created_at,
        updatedAt: req.updated_at,
        product: req.product
    };
};

// Get all requirements
router.get('/', (req, res) => {
    try {
        const { product } = req.query;
        let query = 'SELECT * FROM requirements';
        const params = [];

        if (product) {
            query += ' WHERE product = ?';
            params.push(product);
        }

        query += ' ORDER BY created_at DESC';

        const requirements = db.prepare(query).all(...params);
        res.json(requirements.map(mapRequirement));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single requirement
router.get('/:id', (req, res) => {
    try {
        const requirement = db.prepare('SELECT * FROM requirements WHERE id = ?').get(req.params.id);
        if (!requirement) {
            return res.status(404).json({ error: 'Requirement not found' });
        }
        res.json(mapRequirement(requirement));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create requirement with file upload
router.post('/', upload.single('attachment'), (req, res) => {
    try {
        const { title, description, product } = req.body;

        console.log('Creating requirement with title:', title);
        console.log('Product:', product);
        console.log('File uploaded:', req.file);

        // Get first two letters from title
        let prefix = 'XX';
        if (title && title.trim().length > 0) {
            let cleanTitle = title.replace(/[^a-zA-Z]/g, '');
            if (cleanTitle.length === 0) {
                cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '');
            }
            if (cleanTitle.length >= 2) {
                prefix = cleanTitle.substring(0, 2).toUpperCase();
            } else if (cleanTitle.length === 1) {
                prefix = cleanTitle.toUpperCase() + 'X';
            }
        }

        // Generate sequential ID
        const existingIds = db.prepare("SELECT id FROM requirements WHERE id LIKE ?").all(`REQ_${prefix}_%`);
        let maxId = 0;

        existingIds.forEach(row => {
            const match = row.id.match(new RegExp(`^REQ_${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_(\\d+)$`));
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxId) {
                    maxId = num;
                }
            }
        });

        const id = `REQ_${prefix}_${String(maxId + 1).padStart(3, '0')}`;

        // Handle file attachment
        let attachmentName = null;
        let attachmentPath = null;
        let attachmentSize = null;
        let attachmentType = null;

        if (req.file) {
            attachmentName = req.file.originalname;
            attachmentPath = req.file.filename;
            attachmentSize = req.file.size;
            attachmentType = req.file.mimetype;
        }

        const stmt = db.prepare(`
            INSERT INTO requirements (id, title, description, attachment_name, attachment_path, attachment_size, attachment_type, product) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run(id, title, description, attachmentName, attachmentPath, attachmentSize, attachmentType, product || 'BSSTech ERP');

        const newRequirement = db.prepare('SELECT * FROM requirements WHERE id = ?').get(id);
        res.status(201).json(mapRequirement(newRequirement));
    } catch (error) {
        console.error('Error creating requirement:', error);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: error.message });
    }
});

// Update requirement
router.put('/:id', (req, res) => {
    try {
        const { title, description, product } = req.body;

        const stmt = db.prepare(`
            UPDATE requirements 
            SET title = ?, description = ?, product = ?
            WHERE id = ?
        `);

        const result = stmt.run(title, description, product, req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Requirement not found' });
        }

        const updated = db.prepare('SELECT * FROM requirements WHERE id = ?').get(req.params.id);
        res.json(mapRequirement(updated));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete requirement
router.delete('/:id', (req, res) => {
    try {
        // Get attachment info before deleting
        const requirement = db.prepare('SELECT attachment_path FROM requirements WHERE id = ?').get(req.params.id);

        const stmt = db.prepare('DELETE FROM requirements WHERE id = ?');
        const result = stmt.run(req.params.id);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Requirement not found' });
        }

        // Delete attachment file if exists
        if (requirement && requirement.attachment_path) {
            const filePath = path.join(__dirname, '../uploads', requirement.attachment_path);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.json({ message: 'Requirement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Download attachment
router.get('/:id/download', (req, res) => {
    try {
        const requirement = db.prepare('SELECT * FROM requirements WHERE id = ?').get(req.params.id);

        if (!requirement || !requirement.attachment_path) {
            return res.status(404).json({ error: 'Attachment not found' });
        }

        const filePath = path.join(__dirname, '../uploads', requirement.attachment_path);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found on server' });
        }

        res.download(filePath, requirement.attachment_name);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
