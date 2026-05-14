"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle, Info, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComprehensiveScanResult, CategoryResult, ChecklistItem } from "@/types/security";
import { CopyButton } from "@/components/CopyButton";

interface ChecklistReportProps {
    result: ComprehensiveScanResult;
}

export function ChecklistReport({ result }: ChecklistReportProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    const getSeverityColor = (severity?: string) => {
        switch (severity?.toLowerCase()) {
            case "critical": return "text-red-500";
            case "high": return "text-orange-500";
            case "medium": return "text-amber-500";
            case "low": return "text-yellow-500";
            case "safe": return "text-emerald-500";
            default: return "text-slate-400";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pass": return <CheckCircle className="h-5 w-5 text-emerald-500" />;
            case "fail": return <XCircle className="h-5 w-5 text-red-500" />;
            case "warning": return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            case "not_applicable": return <Info className="h-5 w-5 text-slate-500" />;
            default: return <Info className="h-5 w-5 text-slate-500" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Overall Summary */}
            <div className="glass-strong border border-sec-border/50 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-3xl font-bold gradient-text mb-2">Security Score</h3>
                            <p className="text-slate-300 text-sm">Comprehensive Security Analysis</p>
                        </div>
                        <div className="text-right">
                            <div className="text-5xl font-bold gradient-text mb-1">{result.overallScore}%</div>
                            <div className={`text-sm font-bold uppercase tracking-wider ${getSeverityColor(result.severity)}`}>
                                {result.severity} Risk
                            </div>
                            {result.riskScore !== undefined && (
                                <div className="mt-2 text-xs text-slate-400">
                                    Risk Score: <span className="text-white font-mono">{result.riskScore}/100</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-slate-100 leading-relaxed">{result.summary}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                                ⏱️ {result.duration.toFixed(1)}s
                            </span>
                            <span>•</span>
                            <span>{result.timestamp}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Results */}
            <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Security Categories</h4>

                {result.categoryResults.map((category) => (
                    <CategoryCard
                        key={category.category}
                        category={category}
                        isExpanded={expandedCategories.has(category.category)}
                        onToggle={() => toggleCategory(category.category)}
                        getStatusIcon={getStatusIcon}
                        getSeverityColor={getSeverityColor}
                    />
                ))}
            </div>

            {/* Recommendations */}
            {result.recommendation && (
                <div className="glass-strong border border-sec-border/50 rounded-2xl p-6">
                    <h4 className="text-xl font-bold gradient-text mb-4">🎯 Recommendations</h4>
                    <div className="prose prose-invert prose-sm max-w-none">
                        <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">{result.recommendation}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface CategoryCardProps {
    category: CategoryResult;
    isExpanded: boolean;
    onToggle: () => void;
    getStatusIcon: (status: string) => React.ReactElement;
    getSeverityColor: (severity?: string) => string;
}

function CategoryCard({ category, isExpanded, onToggle, getStatusIcon, getSeverityColor }: CategoryCardProps) {
    const passCount = category.items.filter(i => i.status === "pass").length;
    const failCount = category.items.filter(i => i.status === "fail").length;
    const warningCount = category.items.filter(i => i.status === "warning").length;

    return (
        <div className="glass border border-sec-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-sec-border hover:shadow-lg hover:shadow-purple-500/10">
            <button
                onClick={onToggle}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-800/30 transition-all duration-300 group"
            >
                <div className="flex items-center gap-4">
                    <div className={`text-3xl ${category.color} transition-transform duration-300 group-hover:scale-110`}>
                        {getCategoryIcon(category.icon)}
                    </div>
                    <div className="text-left">
                        <h5 className="font-semibold text-white text-base mb-1">{category.category}</h5>
                        <div className="flex items-center gap-3 text-xs">
                            <span className="text-emerald-400 font-medium">✓ {passCount} passed</span>
                            {failCount > 0 && <span className="text-red-400 font-medium">✗ {failCount} failed</span>}
                            {warningCount > 0 && <span className="text-amber-400 font-medium">⚠ {warningCount} warnings</span>}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-xl font-bold gradient-text">{category.score}%</div>
                    </div>
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-purple-400 transition-transform duration-300" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:text-purple-400" />
                    )}
                </div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="border-t border-sec-border p-4 space-y-3">
                            {category.items.map((item, idx) => (
                                <ChecklistItemCard
                                    key={idx}
                                    item={item}
                                    getStatusIcon={getStatusIcon}
                                    getSeverityColor={getSeverityColor}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface ChecklistItemCardProps {
    item: ChecklistItem;
    getStatusIcon: (status: string) => React.ReactElement;
    getSeverityColor: (severity?: string) => string;
}

function ChecklistItemCard({ item, getStatusIcon, getSeverityColor }: ChecklistItemCardProps) {
    return (
        <div className={`p-4 rounded-xl border transition-all duration-300 ${item.status === "fail" ? "border-red-500/40 bg-red-500/10 hover:bg-red-500/15" :
            item.status === "warning" ? "border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/15" :
                item.status === "pass" ? "border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/15" :
                    "border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50"
            }`}>
            <div className="flex items-start gap-4 min-w-0">
                <div className="mt-1 flex-shrink-0">{getStatusIcon(item.status)}</div>
                <div className="flex-1 space-y-3 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                        <h6 className="font-semibold text-white text-base">{item.name || "Security Finding"}</h6>
                        {item.severity && (
                            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${getSeverityColor(item.severity)}`}>
                                {item.severity}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{item.details || "Details not provided for this specific finding."}</p>
                    {item.recommendation && (
                        <div className="mt-3 p-3 glass rounded-lg border border-sec-border/30">
                            <p className="text-xs text-purple-400 font-bold mb-1.5">💡 Recommendation:</p>
                            <p className="text-xs text-slate-200 leading-relaxed">{item.recommendation}</p>
                        </div>
                    )}
                    {item.affectedCode && (
                        <div className="mt-3">
                            <p className="text-xs text-purple-400 font-bold mb-2">📝 Affected Code:</p>
                            <pre className="text-xs glass p-3 rounded-lg border border-sec-border/30 overflow-x-auto">
                                <code className="text-slate-200">{item.affectedCode}</code>
                            </pre>
                        </div>
                    )}
                    {item.fixCode && (
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Shield className="h-3 w-3" />
                                    AI Suggested Fix
                                </p>
                                <CopyButton text={item.fixCode} />
                            </div>
                            <div className="bg-black/60 p-4 rounded-lg border border-emerald-500/20 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                                {item.fixCode}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import { Shield } from "lucide-react";

function getCategoryIcon(iconName: string) {
    // Return emoji icons based on category
    const icons: Record<string, string> = {
        "database": "🗄️",
        "lock": "🔒",
        "globe": "🌐",
        "server": "⚙️",
        "shield-check": "🛡️",
        "alert-octagon": "⚠️",
        "package": "📦",
        "mouse-pointer-click": "🖱️",
        "code": "💻",
        "scale": "⚖️",
        "shield": "🛡️"
    };
    return icons[iconName] || "🔍";
}
