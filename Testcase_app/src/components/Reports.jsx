import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Reports = () => {
    const { testCases, executions } = useApp();
    const [hoveredStatus, setHoveredStatus] = useState(null);

    // Calculate latest status for each test case
    const latestStatuses = testCases.map(tc => {
        const tcExecs = executions.filter(e => e.testCaseId === tc.id);
        return tcExecs.length > 0 ? tcExecs[0].status : 'Pending';
    });

    const total = testCases.length;
    const passed = latestStatuses.filter(s => s === 'Passed').length;
    const failed = latestStatuses.filter(s => s === 'Failed').length;
    const blocked = latestStatuses.filter(s => s === 'Blocked').length;
    const na = latestStatuses.filter(s => s === 'NA').length;
    const pending = latestStatuses.filter(s => s === 'Pending').length;

    const getPercent = (count) => total === 0 ? 0 : Math.round((count / total) * 100);

    // Get display values based on hover state
    const getDisplayValue = () => {
        if (!hoveredStatus) return { count: total, label: 'Total Tests' };

        const statusMap = {
            'Passed': { count: passed, label: 'Passed', color: '#10b981' },
            'Failed': { count: failed, label: 'Failed', color: '#ef4444' },
            'Blocked': { count: blocked, label: 'Blocked', color: '#f59e0b' },
            'NA': { count: na, label: 'Not Applicable', color: '#94a3b8' },
            'Pending': { count: pending, label: 'Pending', color: 'rgba(255,255,255,0.3)' }
        };

        return statusMap[hoveredStatus] || { count: total, label: 'Total Tests' };
    };

    const displayValue = getDisplayValue();

    const ProgressBar = ({ label, count, color }) => (
        <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                <span>{label}</span>
                <span style={{ fontWeight: '600' }}>{count} ({getPercent(count)}%)</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                    height: '100%',
                    width: `${getPercent(count)}%`,
                    background: color,
                    transition: 'width 0.5s ease-out'
                }} />
            </div>
        </div>
    );

    return (
        <div>
            <h1>Test Reports</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="card animate-fade-in">
                    <h2>Execution Summary</h2>
                    <div style={{ padding: '1rem 0' }}>
                        <ProgressBar label="Passed" count={passed} color="#10b981" />
                        <ProgressBar label="Failed" count={failed} color="#ef4444" />
                        <ProgressBar label="Blocked" count={blocked} color="#f59e0b" />
                        <ProgressBar label="Not Applicable" count={na} color="#94a3b8" />
                        <ProgressBar label="Pending" count={pending} color="rgba(255,255,255,0.2)" />
                    </div>
                </div>

                <div className="card animate-fade-in">
                    <h2>Overall Health</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
                        {/* Donut Chart */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '50%',
                                        background: `conic-gradient(
                            #10b981 0% ${getPercent(passed)}%, 
                            #ef4444 ${getPercent(passed)}% ${getPercent(passed) + getPercent(failed)}%,
                            #f59e0b ${getPercent(passed) + getPercent(failed)}% ${getPercent(passed) + getPercent(failed) + getPercent(blocked)}%,
                            #94a3b8 ${getPercent(passed) + getPercent(failed) + getPercent(blocked)}% ${getPercent(passed) + getPercent(failed) + getPercent(blocked) + getPercent(na)}%,
                            rgba(255,255,255,0.1) ${getPercent(passed) + getPercent(failed) + getPercent(blocked) + getPercent(na)}% 100%
                          )`,
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'transform 0.2s'
                                    }}
                                    title={`Passed: ${passed} (${getPercent(passed)}%) | Failed: ${failed} (${getPercent(failed)}%) | Blocked: ${blocked} (${getPercent(blocked)}%) | NA: ${na} (${getPercent(na)}%) | Pending: ${pending} (${getPercent(pending)}%)`}
                                >
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        background: 'var(--bg-card)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <span style={{
                                            fontSize: '2rem',
                                            fontWeight: '700',
                                            color: displayValue.color || 'var(--text-primary)',
                                            transition: 'color 0.3s ease'
                                        }}>
                                            {displayValue.count}
                                        </span>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            color: 'var(--text-secondary)',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            {displayValue.label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Legend */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%', fontSize: '0.75rem' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.25rem',
                                        borderRadius: '0.25rem',
                                        transition: 'background 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={() => setHoveredStatus('Passed')}
                                    onMouseLeave={() => setHoveredStatus(null)}
                                    title={`${passed} test cases passed (${getPercent(passed)}% of total)`}
                                >
                                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#10b981' }}></div>
                                    <span>Passed: {passed} ({getPercent(passed)}%)</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.25rem',
                                        borderRadius: '0.25rem',
                                        transition: 'background 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={() => setHoveredStatus('Failed')}
                                    onMouseLeave={() => setHoveredStatus(null)}
                                    title={`${failed} test cases failed (${getPercent(failed)}% of total)`}
                                >
                                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#ef4444' }}></div>
                                    <span>Failed: {failed} ({getPercent(failed)}%)</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.25rem',
                                        borderRadius: '0.25rem',
                                        transition: 'background 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={() => setHoveredStatus('Blocked')}
                                    onMouseLeave={() => setHoveredStatus(null)}
                                    title={`${blocked} test cases blocked (${getPercent(blocked)}% of total)`}
                                >
                                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#f59e0b' }}></div>
                                    <span>Blocked: {blocked} ({getPercent(blocked)}%)</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.25rem',
                                        borderRadius: '0.25rem',
                                        transition: 'background 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={() => setHoveredStatus('NA')}
                                    onMouseLeave={() => setHoveredStatus(null)}
                                    title={`${na} test cases marked as not applicable (${getPercent(na)}% of total)`}
                                >
                                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#94a3b8' }}></div>
                                    <span>NA: {na} ({getPercent(na)}%)</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        gridColumn: 'span 2',
                                        padding: '0.25rem',
                                        borderRadius: '0.25rem',
                                        transition: 'background 0.2s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={() => setHoveredStatus('Pending')}
                                    onMouseLeave={() => setHoveredStatus(null)}
                                    title={`${pending} test cases pending execution (${getPercent(pending)}% of total)`}
                                >
                                    <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)' }}></div>
                                    <span>Pending: {pending} ({getPercent(pending)}%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Stats */}
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>{passed}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Passed</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444' }}>{failed}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Failed</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>{blocked}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Blocked</div>
                                </div>
                                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(148, 163, 184, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#94a3b8' }}>{na}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Not Applicable</div>
                                </div>
                            </div>

                            {/* Total Summary */}
                            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--glass)', borderRadius: '0.5rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    Total Test Cases: <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{total}</span>
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                    Executed: <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{total - pending}</span> |
                                    Pending: <span style={{ fontWeight: '700', color: 'var(--warning)' }}>{pending}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
