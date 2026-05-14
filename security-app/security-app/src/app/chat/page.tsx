import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
    return (
        <div className="h-full flex flex-col relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-slate-950 to-cyan-950/30 animate-gradient"
                style={{ backgroundSize: '200% 200%' }} />
            <div className="absolute inset-0 bg-grid-animated opacity-50" />

            {/* Floating Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '0s', animationDuration: '8s' }} />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '2s', animationDuration: '10s' }} />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '4s', animationDuration: '12s' }} />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
                {/* Glassmorphism Header */}
                <div className="p-8 border-b border-sec-border/50 glass-strong sticky top-0 z-20">
                    <div className="max-w-5xl mx-auto">
                        <h1 className="text-4xl font-bold mb-2">
                            <span className="gradient-text">Security Validation Assistant</span>
                        </h1>
                        <p className="text-slate-300 text-base flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow" />
                            AI-powered security analysis • Paste your code or configuration for instant assessment
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    <ChatInterface />
                </div>
            </div>
        </div>
    );
}
