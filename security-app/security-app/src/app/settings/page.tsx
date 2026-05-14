import { Save, User, Bell, Shield, Lock, Mail, CheckCircle2 } from "lucide-react";
import { getSettings } from "@/lib/settings";
import { updateSettings } from "@/actions/settings";

export const dynamic = 'force-dynamic';

export default async function SettingsPage({
    searchParams,
}: {
    searchParams: Promise<{ saved?: string }>;
}) {
    const settings = await getSettings();
    const params = await searchParams;
    const showSuccess = params.saved === 'true';

    return (
        <div className="p-8 space-y-8 max-w-4xl">
            <div className="border-b border-sec-border pb-6">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your security assistant configuration.</p>
            </div>

            {showSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <p className="text-emerald-400 font-medium">Settings saved successfully!</p>
                </div>
            )}

            <form action={updateSettings} className="space-y-6">
                {/* API Configuration */}
                <section className="bg-sec-panel border border-sec-border rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-sec-primary/10 rounded-lg text-sec-primary">
                            <Shield className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">AI Configuration</h2>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-slate-300">AI Model Provider</label>
                            <select
                                name="aiProvider"
                                defaultValue={settings.aiProvider}
                                className="bg-slate-950 border border-sec-border rounded-md p-2 text-white text-sm focus:ring-2 focus:ring-sec-primary/50 outline-none"
                            >
                                <option value="gemini-2.0-flash">Gemini 2.0 Flash (Next Gen & Fastest)</option>
                                <option value="gemini-flash-latest">Gemini 1.5 Flash (Stable)</option>
                                <option value="gemini-pro-latest">Gemini 1.5 Pro (Analytical)</option>
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-slate-300">Analysis Sensitivity</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-slate-400 text-sm">
                                    <input
                                        type="radio"
                                        name="sensitivity"
                                        value="strict"
                                        defaultChecked={settings.sensitivity === "strict"}
                                        className="text-sec-primary focus:ring-sec-primary bg-slate-900 border-slate-700"
                                    />
                                    Strict (Low tolerance)
                                </label>
                                <label className="flex items-center gap-2 text-slate-400 text-sm">
                                    <input
                                        type="radio"
                                        name="sensitivity"
                                        value="standard"
                                        defaultChecked={settings.sensitivity === "standard"}
                                        className="text-sec-primary focus:ring-sec-primary bg-slate-900 border-slate-700"
                                    />
                                    Standard
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="bg-sec-panel border border-sec-border rounded-lg p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Bell className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">Notifications & Alerts</h2>
                    </div>

                    {/* Email Configuration */}
                    <div className="grid gap-2 pb-3 border-b border-sec-border/50">
                        <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="emailAddress"
                            defaultValue={settings.emailAddress || ""}
                            placeholder="your.email@example.com"
                            className="bg-slate-950 border border-sec-border rounded-md p-2 text-white text-sm focus:ring-2 focus:ring-sec-primary/50 outline-none placeholder:text-slate-600"
                        />
                        <p className="text-xs text-slate-500">Required for email alerts and weekly summaries</p>
                    </div>

                    {/* Notification Toggles */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-start justify-between p-3 rounded-md hover:bg-slate-900/50 transition-colors cursor-pointer group">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Email Alerts for Critical Vulnerabilities</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Get instant email notifications when critical or high-severity vulnerabilities are detected</p>
                            </div>
                            <input
                                type="checkbox"
                                name="emailAlerts"
                                defaultChecked={settings.emailAlerts}
                                className="rounded border-slate-700 bg-slate-900 text-sec-primary focus:ring-sec-primary mt-1 flex-shrink-0"
                            />
                        </label>

                        <label className="flex items-start justify-between p-3 rounded-md hover:bg-slate-900/50 transition-colors cursor-pointer group">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Weekly Security Summary</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Receive a comprehensive weekly report with all scans, trends, and security insights</p>
                            </div>
                            <input
                                type="checkbox"
                                name="weeklyReports"
                                defaultChecked={settings.weeklyReports}
                                className="rounded border-slate-700 bg-slate-900 text-sec-primary focus:ring-sec-primary mt-1 flex-shrink-0"
                            />
                        </label>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="bg-sec-primary hover:bg-emerald-400 text-slate-950 font-bold py-2 px-6 rounded-md flex items-center gap-2 transition-colors">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
