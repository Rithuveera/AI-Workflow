"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, LayoutDashboard, MessageSquareCode, FileText, Settings, Lock, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Security Coach", href: "/chat", icon: MessageSquareCode },
    { name: "Scan Reports", href: "/reports", icon: FileText },
    { name: "Coverage Checklist", href: "/checklist", icon: ClipboardList },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r border-sec-border bg-sec-panel">
            <div className="flex items-center gap-2 p-6 border-b border-sec-border">
                <ShieldCheck className="h-8 w-8 text-sec-primary" />
                <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-white">SecValid AI</span>
                    <span className="text-[10px] font-bold text-cyan-400 -mt-1 tracking-wide">Security Validated by Intelligence</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                                isActive
                                    ? "bg-sec-primary/10 text-sec-primary"
                                    : "text-slate-400 hover:bg-sec-primary/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-sec-primary" : "text-slate-500 group-hover:text-white")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-sec-border">
                <div className="rounded-lg bg-slate-950 p-4 border border-sec-border/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-medium text-slate-300">Status: Protected</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                        <div className="h-1.5 w-3/4 rounded-full bg-sec-primary animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
