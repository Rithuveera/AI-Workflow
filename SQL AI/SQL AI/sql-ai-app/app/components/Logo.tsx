import React from "react";

export const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34D399" /> {/* Emerald-400 */}
                    <stop offset="100%" stopColor="#22D3EE" /> {/* Cyan-400 */}
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Database Cylinder Style Base */}
            <path
                d="M20 30C20 22 35 15 50 15C65 15 80 22 80 30V70C80 78 65 85 50 85C35 85 20 78 20 70V30Z"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                fill="rgba(52, 211, 153, 0.1)"
                filter="url(#glow)"
            />
            <ellipse
                cx="50"
                cy="30"
                rx="30"
                ry="8"
                stroke="url(#logoGradient)"
                strokeWidth="4"
                fill="transparent"
            />

            {/* AI Network Nodes Overlay */}
            {/* Center Node */}
            <circle cx="50" cy="50" r="6" fill="#fff" filter="url(#glow)" />

            {/* Connecting Lines */}
            <path d="M50 50 L85 30" stroke="#fff" strokeWidth="2" opacity="0.6" />
            <path d="M50 50 L15 30" stroke="#fff" strokeWidth="2" opacity="0.6" />
            <path d="M50 50 L50 85" stroke="#fff" strokeWidth="2" opacity="0.6" />

            {/* Satellite Nodes */}
            <circle cx="85" cy="30" r="4" fill="#22D3EE" />
            <circle cx="15" cy="30" r="4" fill="#34D399" />
            <circle cx="50" cy="85" r="4" fill="#fff" />
        </svg>
    );
};
