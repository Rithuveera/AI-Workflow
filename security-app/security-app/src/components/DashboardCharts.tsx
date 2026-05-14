"use client";

import { Report } from "@/lib/store";
import { useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

interface DashboardChartsProps {
    reports: Report[];
}

const COLORS = {
    Critical: "#ef4444", // Red 500
    High: "#f97316", // Orange 500
    Medium: "#eab308", // Yellow 500
    Low: "#3b82f6", // Blue 500
    Safe: "#10b981", // Emerald 500
    Unknown: "#64748b", // Slate 500
};

export default function DashboardCharts({ reports }: DashboardChartsProps) {
    // 1. Prepare Data for Pie Chart (Severity Breakdown)
    const pieData = useMemo(() => {
        const counts: Record<string, number> = {
            Critical: 0,
            High: 0,
            Medium: 0,
            Low: 0,
            Safe: 0,
        };

        reports.forEach((r) => {
            const status = r.status || "Unknown";
            if (counts[status] !== undefined) {
                counts[status]++;
            } else {
                // Handle unexpected statuses if any, or group them
                if (!counts[status]) counts[status] = 0;
                counts[status]++;
            }
        });

        return Object.keys(counts)
            .filter((key) => counts[key] > 0)
            .map((key) => ({
                name: key,
                value: counts[key],
                color: COLORS[key as keyof typeof COLORS] || COLORS.Unknown,
            }));
    }, [reports]);

    // 2. Prepare Data for Area Chart (Trend over time)
    const areaData = useMemo(() => {
        // Group by date
        const dateMap: Record<string, number> = {};

        // Sort reports by date ascending
        const sortedReports = [...reports].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        sortedReports.forEach((r) => {
            // Only count vulnerable scans (issues > 0) or total scans? 
            // Let's show "Issues Found" over time
            const date = r.date;
            dateMap[date] = (dateMap[date] || 0) + r.issues;
        });

        // Take last 7 days or all available days
        return Object.entries(dateMap).map(([date, count]) => ({
            date,
            issues: count,
        }));
    }, [reports]);

    if (reports.length === 0) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Severity Breakdown */}
            <div className="bg-sec-panel border border-sec-border p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Vulnerability Distribution</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Issues Trend */}
            <div className="bg-sec-panel border border-sec-border p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Issues Trend (Last 30 Days)</h3>
                <div className="h-[250px] w-full">
                    {areaData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData}>
                                <defs>
                                    <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#94a3b8"
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    tick={{ fontSize: 12 }}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="issues"
                                    stroke="#ef4444"
                                    fillOpacity={1}
                                    fill="url(#colorIssues)"
                                    name="Issues Found"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-500">
                            Not enough data for trend analysis
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
