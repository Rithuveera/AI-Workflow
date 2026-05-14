import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, CheckSquare, PlayCircle, AlertCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</p>
                <h3 style={{ fontSize: '2rem', fontWeight: '700' }}>{value}</h3>
            </div>
            <div style={{ padding: '0.75rem', background: `rgba(${color}, 0.1)`, borderRadius: '0.75rem', color: `rgb(${color})` }}>
                <Icon size={24} />
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { requirements, testCases, executions } = useApp();

    const passed = executions.filter(e => e.status === 'Passed').length;
    const failed = executions.filter(e => e.status === 'Failed').length;

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Requirements" value={requirements.length} icon={FileText} color="99, 102, 241" />
                <StatCard title="Total Test Cases" value={testCases.length} icon={CheckSquare} color="139, 92, 246" />
                <StatCard title="Executions Run" value={executions.length} icon={PlayCircle} color="16, 185, 129" />
                <StatCard title="Failed Tests" value={failed} icon={AlertCircle} color="239, 68, 68" />
            </div>

            <div className="card animate-fade-in">
                <h2>Recent Activity</h2>
                {executions.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)' }}>No executions yet.</p>
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Test Case</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {executions.slice(0, 5).map(exec => (
                                    <tr key={exec.id}>
                                        <td>{exec.testCaseTitle || 'Unknown Test Case'}</td>
                                        <td>
                                            <span className={`badge badge-${exec.status.toLowerCase().replace(' ', '')}`}>
                                                {exec.status}
                                            </span>
                                        </td>
                                        <td>{new Date(exec.executionDate).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
