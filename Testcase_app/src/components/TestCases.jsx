import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Edit2, X } from 'lucide-react';
import Toast from './Toast';

const TestCases = () => {
    const { testCases, requirements, addTestCase, updateTestCase, deleteTestCase } = useApp();
    const [isAdding, setIsAdding] = useState(false);
    const [newTC, setNewTC] = useState({
        title: '',
        description: '',
        requirementId: '',
        steps: '',
        expectedResult: '',
        actualResult: '',
        priority: 'Medium'
    });
    const [editingTC, setEditingTC] = useState(null);
    const [editData, setEditData] = useState({
        title: '',
        description: '',
        requirementId: '',
        steps: '',
        expectedResult: '',
        actualResult: '',
        priority: 'Medium'
    });
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTC.title || !newTC.requirementId) return;
        try {
            await addTestCase(newTC);
            setNewTC({ title: '', description: '', requirementId: '', steps: '', expectedResult: '', actualResult: '', priority: 'Medium' });
            setIsAdding(false);
            showToast('Test case created successfully!');
        } catch (error) {
            showToast('Failed to create test case', 'error');
        }
    };

    const handleEdit = (tc) => {
        setEditingTC(tc);
        setEditData({
            title: tc.title,
            description: tc.description || '',
            requirementId: tc.requirementId,
            steps: tc.steps || '',
            expectedResult: tc.expectedResult || '',
            actualResult: tc.actualResult || '',
            priority: tc.priority || 'Medium'
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editData.title || !editData.requirementId) return;
        try {
            await updateTestCase(editingTC.id, editData);
            setEditingTC(null);
            showToast('Test case updated successfully!');
        } catch (error) {
            showToast('Failed to update test case', 'error');
        }
    };

    const handleCancelEdit = () => {
        setEditingTC(null);
        setEditData({ title: '', description: '', requirementId: '', steps: '', expectedResult: '', actualResult: '', priority: 'Medium' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this test case? This action cannot be undone.')) {
            try {
                await deleteTestCase(id);
                showToast('Test case deleted successfully!');
            } catch (error) {
                showToast('Failed to delete test case', 'error');
            }
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return '#ef4444';
            case 'Medium': return '#f59e0b';
            case 'Low': return '#10b981';
            default: return '#94a3b8';
        }
    };

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Test Cases</h1>
                <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
                    <Plus size={18} />
                    New Test Case
                </button>
            </div>

            {isAdding && (
                <div className="card animate-fade-in" style={{ marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Requirement *</label>
                            <select
                                className="input"
                                value={newTC.requirementId}
                                onChange={e => setNewTC({ ...newTC, requirementId: e.target.value })}
                                required
                            >
                                <option value="">Select Requirement...</option>
                                {requirements.map(req => (
                                    <option key={req.id} value={req.id}>{req.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Title *</label>
                            <input
                                className="input"
                                value={newTC.title}
                                onChange={e => setNewTC({ ...newTC, title: e.target.value })}
                                placeholder="e.g., Verify valid login"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                className="input"
                                value={newTC.description}
                                onChange={e => setNewTC({ ...newTC, description: e.target.value })}
                                placeholder="Brief description of the test case"
                                style={{ minHeight: '60px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Priority *</label>
                            <select
                                className="input"
                                value={newTC.priority}
                                onChange={e => setNewTC({ ...newTC, priority: e.target.value })}
                                required
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Steps</label>
                            <textarea
                                className="input"
                                value={newTC.steps}
                                onChange={e => setNewTC({ ...newTC, steps: e.target.value })}
                                placeholder="1. Go to login page&#10;2. Enter credentials&#10;3. Click login button"
                                style={{ minHeight: '80px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Expected Result</label>
                            <textarea
                                className="input"
                                value={newTC.expectedResult}
                                onChange={e => setNewTC({ ...newTC, expectedResult: e.target.value })}
                                placeholder="User should be redirected to dashboard"
                                style={{ minHeight: '60px' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Actual Result</label>
                            <textarea
                                className="input"
                                value={newTC.actualResult}
                                onChange={e => setNewTC({ ...newTC, actualResult: e.target.value })}
                                placeholder="Actual outcome of the test (optional)"
                                style={{ minHeight: '60px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Test Case</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Edit Modal */}
            {editingTC && (
                <div className="modal-overlay" onClick={handleCancelEdit}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Edit Test Case</h2>
                            <button className="modal-close" onClick={handleCancelEdit}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label className="form-label">Requirement *</label>
                                <select
                                    className="input"
                                    value={editData.requirementId}
                                    onChange={e => setEditData({ ...editData, requirementId: e.target.value })}
                                    required
                                >
                                    {requirements.map(req => (
                                        <option key={req.id} value={req.id}>{req.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Title *</label>
                                <input
                                    className="input"
                                    value={editData.title}
                                    onChange={e => setEditData({ ...editData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="input"
                                    value={editData.description}
                                    onChange={e => setEditData({ ...editData, description: e.target.value })}
                                    placeholder="Brief description of the test case"
                                    style={{ minHeight: '60px' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Priority *</label>
                                <select
                                    className="input"
                                    value={editData.priority}
                                    onChange={e => setEditData({ ...editData, priority: e.target.value })}
                                    required
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Steps</label>
                                <textarea
                                    className="input"
                                    value={editData.steps}
                                    onChange={e => setEditData({ ...editData, steps: e.target.value })}
                                    style={{ minHeight: '80px' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Expected Result</label>
                                <textarea
                                    className="input"
                                    value={editData.expectedResult}
                                    onChange={e => setEditData({ ...editData, expectedResult: e.target.value })}
                                    style={{ minHeight: '60px' }}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Actual Result</label>
                                <textarea
                                    className="input"
                                    value={editData.actualResult}
                                    onChange={e => setEditData({ ...editData, actualResult: e.target.value })}
                                    style={{ minHeight: '60px' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Update Test Case</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Requirement</th>
                                <th>Priority</th>
                                <th>Steps</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testCases.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        No test cases added yet.
                                    </td>
                                </tr>
                            ) : (
                                testCases.map(tc => {
                                    const req = requirements.find(r => r.id === tc.requirementId);
                                    return (
                                        <tr key={tc.id}>
                                            <td style={{ fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{tc.id}</td>
                                            <td style={{ fontWeight: '600' }}>{tc.title}</td>
                                            <td>
                                                {req ? (
                                                    <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
                                                        {req.title}
                                                    </span>
                                                ) : 'N/A'}
                                            </td>
                                            <td>
                                                <span className="badge" style={{
                                                    background: `${getPriorityColor(tc.priority)}20`,
                                                    color: getPriorityColor(tc.priority),
                                                    fontWeight: '600'
                                                }}>
                                                    {tc.priority || 'Medium'}
                                                </span>
                                            </td>
                                            <td style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{tc.steps}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        onClick={() => handleEdit(tc)}
                                                        style={{ padding: '0.5rem', background: 'var(--accent-primary)', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: 'white' }}
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(tc.id)}
                                                        style={{ padding: '0.5rem', background: 'var(--error)', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', color: 'white' }}
                                                        title="Delete"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TestCases;
