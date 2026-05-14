import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, CheckCircle, XCircle, AlertTriangle, MinusCircle } from 'lucide-react';
import Toast from './Toast';

const Execution = () => {
    const { testCases, executions, addExecution } = useApp();
    const [filter, setFilter] = useState('All');
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const getLatestExecution = (tcId) => {
        const tcExecs = executions.filter(e => e.testCaseId === tcId);
        return tcExecs.length > 0 ? tcExecs[0] : null;
    };

    const handleStatusChange = async (tcId, status) => {
        try {
            console.log('Updating status:', { tcId, status });
            await addExecution({
                testCaseId: tcId,
                status,
                notes: '',
            });
            showToast(`Status updated to ${status}`);
        } catch (error) {
            console.error('Error updating status:', error);
            showToast('Failed to update status', 'error');
        }
    };

    return (
        <div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <h1>Test Execution</h1>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Test Case</th>
                                <th>Steps</th>
                                <th>Expected Result</th>
                                <th>Latest Status</th>
                                <th>Execute</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testCases.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        No test cases to execute.
                                    </td>
                                </tr>
                            ) : (
                                testCases.map(tc => {
                                    const latest = getLatestExecution(tc.id);
                                    return (
                                        <tr key={tc.id}>
                                            <td style={{ fontFamily: 'monospace', color: 'var(--accent-primary)' }}>{tc.id}</td>
                                            <td style={{ fontWeight: '600' }}>{tc.title}</td>
                                            <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{tc.steps}</td>
                                            <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{tc.expectedResult}</td>
                                            <td>
                                                {latest ? (
                                                    <span className={`badge badge-${latest.status.toLowerCase().replace(' ', '')}`}>
                                                        {latest.status}
                                                    </span>
                                                ) : (
                                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.1)' }}>Pending</span>
                                                )}
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <button
                                                        className="btn"
                                                        style={{
                                                            padding: '0.5rem',
                                                            background: latest?.status === 'Passed' ? '#10b981' : 'rgba(16, 185, 129, 0.1)',
                                                            color: latest?.status === 'Passed' ? 'white' : '#10b981',
                                                            border: latest?.status === 'Passed' ? '2px solid #10b981' : 'none',
                                                            transform: latest?.status === 'Passed' ? 'scale(1.1)' : 'scale(1)',
                                                            boxShadow: latest?.status === 'Passed' ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none'
                                                        }}
                                                        title="Pass"
                                                        onClick={() => handleStatusChange(tc.id, 'Passed')}
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        style={{
                                                            padding: '0.5rem',
                                                            background: latest?.status === 'Failed' ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
                                                            color: latest?.status === 'Failed' ? 'white' : '#ef4444',
                                                            border: latest?.status === 'Failed' ? '2px solid #ef4444' : 'none',
                                                            transform: latest?.status === 'Failed' ? 'scale(1.1)' : 'scale(1)',
                                                            boxShadow: latest?.status === 'Failed' ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none'
                                                        }}
                                                        title="Fail"
                                                        onClick={() => handleStatusChange(tc.id, 'Failed')}
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        style={{
                                                            padding: '0.5rem',
                                                            background: latest?.status === 'Blocked' ? '#f59e0b' : 'rgba(245, 158, 11, 0.1)',
                                                            color: latest?.status === 'Blocked' ? 'white' : '#f59e0b',
                                                            border: latest?.status === 'Blocked' ? '2px solid #f59e0b' : 'none',
                                                            transform: latest?.status === 'Blocked' ? 'scale(1.1)' : 'scale(1)',
                                                            boxShadow: latest?.status === 'Blocked' ? '0 0 10px rgba(245, 158, 11, 0.5)' : 'none'
                                                        }}
                                                        title="Blocked"
                                                        onClick={() => handleStatusChange(tc.id, 'Blocked')}
                                                    >
                                                        <AlertTriangle size={18} />
                                                    </button>
                                                    <button
                                                        className="btn"
                                                        style={{
                                                            padding: '0.5rem',
                                                            background: latest?.status === 'NA' ? '#94a3b8' : 'rgba(148, 163, 184, 0.1)',
                                                            color: latest?.status === 'NA' ? 'white' : '#94a3b8',
                                                            border: latest?.status === 'NA' ? '2px solid #94a3b8' : 'none',
                                                            transform: latest?.status === 'NA' ? 'scale(1.1)' : 'scale(1)',
                                                            boxShadow: latest?.status === 'NA' ? '0 0 10px rgba(148, 163, 184, 0.5)' : 'none'
                                                        }}
                                                        title="Not Applicable"
                                                        onClick={() => handleStatusChange(tc.id, 'NA')}
                                                    >
                                                        <MinusCircle size={18} />
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

export default Execution;
