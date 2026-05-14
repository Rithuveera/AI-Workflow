import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChecklistItem, CategoryResult } from "@/types/security";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateCategoryScore(items: ChecklistItem[]): number {
    if (items.length === 0) return 100; // No findings means 100% score

    const passCount = items.filter(i => i.status === "pass").length;
    const warningCount = items.filter(i => i.status === "warning").length;
    const failCount = items.filter(i => i.status === "fail").length;

    if (failCount === 0 && warningCount === 0) return 100;

    // Weight the score: 100% minus penalties for fails and warnings
    // Each fail takes 25% (max 100%), each warning takes 10%
    const penalty = (failCount * 25) + (warningCount * 10);
    return Math.max(0, 100 - penalty);
}

export function getErrorCategory(name: string, icon: string, color: string): CategoryResult {
    return {
        category: name,
        icon,
        color,
        score: 0,
        items: [{
            name: "Analysis Error",
            status: "warning",
            severity: "Low",
            details: "Could not complete analysis for this category",
            recommendation: "Try running the scan again"
        }]
    };
}
