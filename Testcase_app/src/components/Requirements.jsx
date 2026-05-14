import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit2, Check, X, FileText, Download } from 'lucide-react';
import Toast from './Toast';

const API_BASE_URL = '/api';

const Requirements = () => {
    const { requirements, addRequirement, updateRequirement, deleteRequirement, selectedProduct } = useApp();
    const [isAdding, setIsAdding] = useState(false);
    const [newReq, setNewReq] = useState({ title: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ title: '', description: '' });
    const [toast, setToast] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState('');

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const validateFile = (file) => {
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            setFileError('Only PDF, Word (.doc, .docx), and Excel (.xls, .xlsx) files are allowed');
            return false;
        }

        if (file.size > maxSize) {
            setFileError('File size must be less than 5MB');
            return false;
        }

        setFileError('');
        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
            setSelectedFile(file);
        } else {
            setSelectedFile(null);
            e.target.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReq.title) return;
        try {
            const formData = new FormData();
            formData.append('title', newReq.title);
            formData.append('description', newReq.description);
            if (selectedProduct) {
                formData.append('product', selectedProduct);
            }
            if (selectedFile) {
                formData.append('attachment', selectedFile);
            }

            const response = await fetch(`${API_BASE_URL}/requirements`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to create requirement');

            const newRequirement = await response.json();
            await addRequirement(newRequirement, true);

            setNewReq({ title: '', description: '' });
            setSelectedFile(null);
            setIsAdding(false);
            showToast('Requirement created successfully!');
        } catch (error) {
            showToast('Failed to create requirement', 'error');
        }
    };

    const handleEdit = (req) => {
        setEditingId(req.id);
        setEditData({ title: req.title, description: req.description });
    };

    const handleUpdate = async (id) => {
        if (!editData.title) return;
        try {
            await updateRequirement(id, editData);
            setEditingId(null);
            showToast('Requirement updated successfully!');
        } catch (error) {
            showToast('Failed to update requirement', 'error');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditData({ title: '', description: '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this requirement? This action cannot be undone and will delete all associated test cases.')) {
            try {
                await deleteRequirement(id);
                showToast('Requirement deleted successfully!');
            } catch (error) {
                showToast('Failed to delete requirement', 'error');
            }
        }
    };

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Requirements</h1>
                <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
                    <Plus size={18} />
                    New Requirement
                </button>
            </div>

            {isAdding && (
                <div className="card animate-fade-in" style={{ marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                className="input"
                                value={newReq.title}
                                onChange={e => setNewReq({ ...newReq, title: e.target.value })}
                                placeholder="e.g., User Login"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                className="input"
                                value={newReq.description}
                                onChange={e => setNewReq({ ...newReq, description: e.target.value })}
                                placeholder="Detailed requirement description..."
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Attachment (Optional)</label>
                            <input
                                type="file"
                                className="input"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                style={{ padding: '0.5rem' }}
                            />
                            <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>
                                Allowed: PDF, Word (.doc, .docx), Excel (.xls, .xlsx) | Max size: 5MB
                            </small>
                            {fileError && (
                                <div style={{ color: 'var(--error)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                    {fileError}
                                </div>
                            )}
                            {selectedFile && (
                                <div style={{ color: 'var(--success)', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                                    ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Requirement</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Attachment</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requirements.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        No requirements added yet.
                                    </td>
                                </tr>
                            ) : (
                                requirements.map(req => (
                                    <tr key={req.id}>
                                        <td style={{ fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{req.id}</td>
                                        <td style={{ fontWeight: '600' }}>
                                            {editingId === req.id ? (
                                                <input
                                                    className="input"
                                                    value={editData.title}
                                                    onChange={e => setEditData({ ...editData, title: e.target.value })}
                                                    style={{ marginBottom: 0 }}
                                                />
                                            ) : (
                                                req.title
                                            )}
                                        </td>
                                        <td style={{ color: 'var(--text-secondary)' }}>
                                            {editingId === req.id ? (
                                                <textarea
                                                    className="input"
                                                    value={editData.description}
                                                    onChange={e => setEditData({ ...editData, description: e.target.value })}
                                                    style={{ marginBottom: 0, minHeight: '60px' }}
                                                />
                                            ) : (
                                                req.description
                                            )}
                                        </td>
                                        <td>
                                            {req.attachmentName ? (
                                                <a
                                                    href={`${API_BASE_URL}/requirements/${req.id}/download`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        color: 'var(--accent-primary)',
                                                        textDecoration: 'none',
                                                        fontSize: '0.875rem'
                                                    }}
                                                    title={`Download ${req.attachmentName}`}
                                                >
                                                    <FileText size={16} />
                                                    {req.attachmentName.length > 15 ? req.attachmentName.substring(0, 12) + '...' : req.attachmentName}
                                                </a>
                                            ) : (
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>-</span>
                                            )}
                                        </td>
                                        <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            {editingId === req.id ? (
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        onClick={() => handleUpdate(req.id)}
                                                        style={{ padding: '0.5rem', background: 'var(--success)', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: 'white' }}
                                                        title="Save"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        style={{ padding: '0.5rem', background: 'var(--error)', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: 'white' }}
                                                        title="Cancel"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        onClick={() => handleEdit(req)}
                                                        style={{ padding: '0.5rem', background: 'var(--accent-primary)', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: 'white' }}
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(req.id)}
                                                        style={{ padding: '0.5rem', background: 'var(--error)', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: 'white' }}
                                                        title="Delete"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Requirements;
