"use client";

import { useState } from "react";
import { Copy, Sparkles, Code2, ChevronRight, Terminal, RefreshCw, CheckCircle2 } from "lucide-react";
import { Logo } from "./components/Logo";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const DEFAULT_SCHEMA = `CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2),
    order_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);`;

export default function Home() {
  const [schema, setSchema] = useState(DEFAULT_SCHEMA);
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async (mode: "specific" | "auto-generate" = "specific") => {
    if (mode === "specific" && !prompt.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/generate-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schema,
          prompt: mode === "specific" ? prompt : "Generate examples",
          action: mode
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate SQL");

      // Normalize to array
      if (data.results) {
        setResults(data.results);
      } else {
        setResults([data]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8 relative overflow-hidden font-sans">

      {/* Ambient Background Elements (Titanium Theme) */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-zinc-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <main className="max-w-[1600px] mx-auto relative z-10 flex flex-col h-[calc(100vh-4rem)]">

        {/* Header */}
        <header className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-zinc-700 to-slate-800 rounded-xl shadow-lg shadow-zinc-500/20">
            <Logo className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 via-white to-cyan-200">
              HelperSQL
            </h1>
            <p className="text-xs text-zinc-400 tracking-wider uppercase font-medium">
              Your Personal SQL Assistant
            </p>
          </div>
        </header>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">

          {/* Left: Context / Schema */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 flex flex-col gap-4 h-full min-h-0"
          >
            <div className="glass-panel rounded-2xl p-1 flex-1 flex flex-col overflow-hidden border-zinc-700/50">
              <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm font-semibold">Schema Definition</span>
                </div>
                <span className="text-[10px] bg-white/5 text-zinc-400 px-2 py-0.5 rounded border border-white/10">DDL Mode</span>
              </div>
              <div className="relative flex-1 group">
                <textarea
                  className="w-full h-full bg-transparent p-5 font-mono text-sm leading-relaxed text-gray-300 resize-none focus:outline-none placeholder-zinc-600 selection:bg-white/20"
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  placeholder="Paste your schema here..."
                  spellCheck={false}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Interaction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 flex flex-col gap-6 h-full min-h-0"
          >

            {/* Input Section */}
            <div className="glass-panel rounded-2xl p-1 border-white/10">
              <div className="relative">
                <div className="absolute top-4 left-4 p-2 bg-white/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-zinc-300" />
                </div>
                <textarea
                  className="w-full bg-transparent pl-16 pr-32 py-5 text-lg text-white placeholder-zinc-500 focus:outline-none resize-none min-h-[100px]"
                  placeholder="Describe the query you need in plain English..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate("specific");
                    }
                  }}
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => handleGenerate("auto-generate")}
                    disabled={loading}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs transition-all duration-300 border border-white/10 text-zinc-300",
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "bg-white/5 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Generate Examples</span>
                  </button>

                  <button
                    onClick={() => handleGenerate("specific")}
                    disabled={loading || !prompt.trim()}
                    className={clsx(
                      "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 relative overflow-hidden group",
                      loading || !prompt.trim()
                        ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-zinc-200 to-white hover:from-white hover:to-zinc-100 text-black shadow-lg shadow-white/10 hover:scale-105"
                    )}
                  >
                    {/* Shiny effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-black/10 to-transparent z-0"></div>

                    <div className="relative z-10 flex items-center gap-2">
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
                      <span>Generate</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="flex-1 glass-panel rounded-2xl p-1 flex flex-col min-h-[300px] overflow-hidden relative border-white/10">
              {error ? (
                <div className="flex-1 flex flex-col items-center justify-center text-rose-400 p-8 text-center animate-in fade-in zoom-in">
                  <div className="p-3 bg-rose-500/10 rounded-full mb-4">
                    <RefreshCw className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-lg font-medium">Generation Failed</p>
                  <p className="text-sm opacity-60 mt-2 max-w-md">{error}</p>
                </div>
              ) : results.length === 0 && !loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 p-8">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full"></div>
                    <Code2 className="w-16 h-16 relative z-10 opacity-40" />
                  </div>
                  <p className="text-lg font-medium text-zinc-400">Ready to Architect</p>
                  <p className="text-sm opacity-60 mt-2">Enter your request or use Auto-Generate.</p>
                </div>
              ) : (
                <div className="flex flex-col h-full bg-[#0E1117]/50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="result-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col min-h-0 overflow-y-auto p-4 gap-4"
                    >
                      {results.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white/5 border border-white/5 rounded-xl overflow-hidden shrink-0 group hover:border-white/20 transition-colors"
                        >
                          <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-white/5 group-hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-zinc-400"></div>
                              <span className="text-xs font-medium text-zinc-300 uppercase tracking-widest">
                                {item.type || "Query"}
                              </span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(item.sql, idx)}
                              className="flex items-center gap-2 text-[10px] font-medium text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/5"
                            >
                              {copiedIndex === idx ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedIndex === idx ? "Copied" : "Copy"}</span>
                            </button>
                          </div>

                          <div className="p-4 bg-[#0E1117]/40 font-mono text-xs md:text-sm text-zinc-300/90 whitespace-pre-wrap leading-relaxed">
                            {item.sql}
                          </div>

                          {item.explanation && (
                            <div className="bg-white/5 px-4 py-3 border-t border-white/5 flex gap-3">
                              <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                              <p className="text-xs text-zinc-400 leading-relaxed">{item.explanation}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 bg-[#0E1117]/80 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-1 rounded-full bg-gradient-to-b from-zinc-500 to-white animate-spin"></div>
                    <span className="text-sm font-medium text-zinc-300 animate-pulse">Designing Query...</span>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
