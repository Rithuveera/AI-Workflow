import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutGrid, Users, Home, Activity, LogOut } from 'lucide-react';

const ProductSelection = () => {
    const { products, setSelectedProduct } = useApp();
    const navigate = useNavigate();

    const handleSelect = (product) => {
        setSelectedProduct(product);
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('selectedProduct');
        setSelectedProduct(null);
        navigate('/login');
    };

    const getIcon = (product) => {
        if (product.includes('ERP')) return <LayoutGrid size={48} />;
        if (product.includes('HRMS')) return <Users size={48} />;
        if (product.includes('Accomodation')) return <Home size={48} />;
        return <Activity size={48} />;
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'var(--bg-primary)',
            position: 'relative'
        }}>
            <button
                onClick={handleLogout}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    color: 'var(--error)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
            >
                <LogOut size={20} />
                Logout
            </button>

            <h1 style={{ marginBottom: '3rem', fontSize: '2.5rem', textAlign: 'center' }}>
                Select a Product
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                width: '100%',
                maxWidth: '1200px'
            }}>
                {products.map((product) => (
                    <button
                        key={product}
                        onClick={() => handleSelect(product)}
                        className="card"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3rem 2rem',
                            cursor: 'pointer',
                            border: '2px solid transparent',
                            transition: 'all 0.3s ease',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div style={{
                            marginBottom: '1.5rem',
                            color: 'var(--accent-primary)',
                            background: 'rgba(99, 102, 241, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '50%'
                        }}>
                            {getIcon(product)}
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center' }}>
                            {product}
                        </h3>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductSelection;
