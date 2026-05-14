import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle size={20} color="#10b981" />,
        error: <XCircle size={20} color="#ef4444" />,
        info: <Info size={20} color="#3b82f6" />
    };

    return (
        <div className={`toast toast-${type}`}>
            {icons[type]}
            <span style={{ flex: 1 }}>{message}</span>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
