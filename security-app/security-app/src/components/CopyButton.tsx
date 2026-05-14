"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
    text: string;
    label?: string;
}

export function CopyButton({ text, label = "COPY FIX" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-slate-300 transition-colors border border-slate-700 active:scale-95"
            title="Copy to clipboard"
        >
            {copied ? (
                <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                </>
            ) : (
                <>
                    <Copy className="h-3 w-3" />
                    <span>{label}</span>
                </>
            )}
        </button>
    );
}
