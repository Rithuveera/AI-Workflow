import React from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, FileText, CheckSquare, PlayCircle, BarChart2, LogOut } from 'lucide-react';

const Layout = () => {
    const navigate = useNavigate();
    const { selectedProduct, setSelectedProduct } = useApp();

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!selectedProduct && token) {
            navigate('/products');
        }
    }, [selectedProduct, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('selectedProduct');
        setSelectedProduct(null);
        navigate('/login');
    };

    if (!selectedProduct) return null;

    return (
        <div className="grid-layout">
            <aside className="sidebar">
                <div style={{ padding: '0 1rem 2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ background: 'var(--accent-gradient)', padding: '0.25rem', borderRadius: '0.5rem' }}>
                            <CheckSquare size={24} color="white" />
                        </span>
                        TestFlow
                    </h2>
                    <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        background: 'var(--bg-secondary)',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Product:</div>
                        <div style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{selectedProduct}</div>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                marginTop: '0.5rem',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                padding: 0
                            }}
                        >
                            Switch Product
                        </button>
                    </div>
                </div>
                <nav>
                    <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink to="/requirements" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <FileText size={20} />
                        Requirements
                    </NavLink>
                    <NavLink to="/test-cases" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <CheckSquare size={20} />
                        Test Cases
                    </NavLink>
                    <NavLink to="/execution" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <PlayCircle size={20} />
                        Execution
                    </NavLink>
                    <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <BarChart2 size={20} />
                        Reports
                    </NavLink>
                </nav>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        className="nav-item"
                        style={{ width: '100%', border: 'none', cursor: 'pointer', background: 'transparent', color: 'var(--error)' }}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
