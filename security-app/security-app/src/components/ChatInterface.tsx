"use client";

import { analyzeCode } from "@/actions/analyze";
import { ChecklistReport } from "./ChecklistReport";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, AlertTriangle, CheckCircle, Loader2, Zap, ListChecks } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ScanType, ComprehensiveScanResult } from "@/types/security";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    type?: "text" | "analysis" | "comprehensive";
    severity?: "safe" | "warning" | "critical";
    timestamp: Date;
    comprehensiveResult?: ComprehensiveScanResult;
};

export function ChatInterface() {
    const [input, setInput] = useState("");
    const [scanType, setScanType] = useState<ScanType>("quick");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello. I am your Security Validation Assistant. Paste any code snippet, URL, or architecture description, and I will analyze it for vulnerabilities.\n\nChoose Quick Analysis for fast results, or Comprehensive Scan for complete OWASP checklist coverage.",
            type: "text",
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        const currentInput = input;
        const currentScanType = scanType;
        setInput("");
        setIsTyping(true);

        // Real AI Analysis Logic
        try {
            const result = await analyzeCode(currentInput, currentScanType);

            // Check if it's a comprehensive scan result
            if (result && 'scanType' in result && result.scanType === 'comprehensive') {
                const comprehensiveResult = result as ComprehensiveScanResult;
                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: comprehensiveResult.summary,
                    type: "comprehensive",
                    severity: comprehensiveResult.severity.toLowerCase() as "safe" | "warning" | "critical",
                    timestamp: new Date(),
                    comprehensiveResult
                };
                setMessages((prev) => [...prev, aiMsg]);
            } else {
                // Quick analysis result
                let severity: "safe" | "warning" | "critical" = "safe";
                if (result.severity) {
                    severity = result.severity.toLowerCase();
                    if (!["safe", "warning", "critical"].includes(severity)) severity = "warning";
                } else if (result.error) {
                    severity = "warning";
                }

                let content = "";
                if (result.error) {
                    content = `⚠️ System Error: ${result.error}`;
                } else {
                    content = `**${result.summary}**\n\n${result.details}\n\n**Recommendation:**\n${result.recommendation}`;
                }

                const aiMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: content,
                    type: "analysis",
                    severity: severity as "safe" | "warning" | "critical",
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, aiMsg]);
            }
        } catch (e) {
            const errorMsg: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "An unexpected error occurred while contacting the security agent.",
                type: "text",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-5xl mx-auto">
            <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "flex gap-4",
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center shrink-0 relative",
                                msg.role === "assistant"
                                    ? "bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px]"
                                    : "bg-gradient-to-br from-slate-600 to-slate-700 p-[2px]"
                            )}>
                                <div className={cn(
                                    "h-full w-full rounded-full flex items-center justify-center",
                                    msg.role === "assistant" ? "bg-slate-900" : "bg-slate-800"
                                )}>
                                    {msg.role === "assistant" ? <Bot className="h-5 w-5 text-purple-400" /> : <User className="h-5 w-5 text-slate-300" />}
                                </div>
                            </div>

                            <div className={cn(
                                "rounded-2xl p-5 max-w-[80%] transition-all duration-300",
                                msg.role === "user"
                                    ? "gradient-primary text-white rounded-tr-none shadow-lg shadow-purple-500/20"
                                    : "glass border border-sec-border/50 rounded-tl-none hover:border-sec-border transition-colors"
                            )}>
                                {msg.role === "assistant" && msg.type === "analysis" && (
                                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-700/30">
                                        {msg.severity === "critical" && <AlertTriangle className="h-5 w-5 text-red-400" />}
                                        {msg.severity === "warning" && <AlertTriangle className="h-5 w-5 text-amber-400" />}
                                        {msg.severity === "safe" && <CheckCircle className="h-5 w-5 text-emerald-400" />}
                                        <span className={cn(
                                            "text-xs font-bold uppercase tracking-wider",
                                            msg.severity === "critical" ? "text-red-400" : msg.severity === "warning" ? "text-amber-400" : "text-emerald-400"
                                        )}>
                                            {msg.severity} Analysis
                                        </span>
                                    </div>
                                )}

                                {msg.type === "comprehensive" && msg.comprehensiveResult ? (
                                    <ChecklistReport result={msg.comprehensiveResult} />
                                ) : (
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-100">
                                        {msg.content}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-4"
                    >
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px] flex items-center justify-center">
                            <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="glass border border-sec-border/50 rounded-2xl rounded-tl-none p-4 flex items-center gap-3">
                            <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
                            <span className="text-sm text-slate-300">
                                {scanType === "comprehensive"
                                    ? "Running comprehensive security scan across all OWASP categories..."
                                    : "Analyzing security posture..."}
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="p-6 glass-strong border-t border-sec-border/50">
                {/* Scan Mode Toggle */}
                <div className="mb-4 flex items-center justify-center gap-3">
                    <button
                        onClick={() => setScanType("quick")}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                            scanType === "quick"
                                ? "gradient-primary text-white shadow-lg shadow-purple-500/30 scale-105"
                                : "glass border border-sec-border/50 text-slate-400 hover:text-slate-200 hover:border-sec-border"
                        )}
                    >
                        <Zap className="h-4 w-4" />
                        Quick Analysis
                    </button>
                    <button
                        onClick={() => setScanType("comprehensive")}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                            scanType === "comprehensive"
                                ? "gradient-primary text-white shadow-lg shadow-purple-500/30 scale-105"
                                : "glass border border-sec-border/50 text-slate-400 hover:text-slate-200 hover:border-sec-border"
                        )}
                    >
                        <ListChecks className="h-4 w-4" />
                        Comprehensive Scan
                    </button>
                </div>

                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={scanType === "comprehensive"
                            ? "Paste a URL for comprehensive OWASP checklist scan..."
                            : "Paste code, URL, or describe functionality here..."}
                        className="w-full glass border border-sec-border/50 rounded-xl p-4 pr-14 text-sm focus:outline-none focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 text-white placeholder:text-slate-500 min-h-[120px] resize-none font-mono transition-all duration-300"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="absolute bottom-4 right-4 p-2.5 gradient-primary text-white rounded-lg hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-lg shadow-purple-500/30"
                        title="Send for Analysis"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
                <p className="text-center text-xs text-slate-500 mt-3">
                    {scanType === "comprehensive"
                        ? "🔍 Comprehensive scan checks all 8 OWASP categories • May take 15-30 seconds"
                        : "⚡ AI-powered instant analysis • Please verify critical security findings manually"}
                </p>
            </div>
        </div>
    );
}
