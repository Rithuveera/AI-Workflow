import { AlertTriangle, CheckCircle, ShieldAlert, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getReports } from "@/lib/store";
import DashboardCharts from "@/components/DashboardCharts";
import DeleteReportButton from "@/components/DeleteReportButton";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const reports = await getReports();

  const totalScans = reports.length;
  const criticalIssues = reports.filter(r => r.status === 'Critical' || r.status === 'High').length;
  // Simple score calculation: Start at 100, deduct 10 for each critical/high issue
  const securityScore = Math.max(0, 100 - (criticalIssues * 10));
  const resolved = 0; // we don't track resolution yet

  const recentReports = reports.slice(0, 3);

  return (
    <div className="p-8 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Security Overview</h1>
          <p className="text-slate-400 mt-1">System Status: <span className="text-sec-primary font-medium">Operational</span></p>
        </div>
        <Link href="/chat" className="bg-sec-primary hover:bg-emerald-400 text-slate-950 font-bold py-2 px-4 rounded-md flex items-center gap-2 transition-colors">
          <ShieldAlert className="h-5 w-5" />
          New Security Analysis
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Scans" value={totalScans.toString()} icon={Activity} color="text-blue-400" />
        <StatCard title="Critical Issues" value={criticalIssues.toString()} icon={AlertTriangle} color="text-red-500" />
        <StatCard title="Resolved" value={resolved.toString()} icon={CheckCircle} color="text-emerald-400" />
        <StatCard title="Security Score" value={`${securityScore}%`} icon={ShieldAlert} color="text-amber-400" />
      </div>

      {/* Visual Analytics */}
      <DashboardCharts reports={reports} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-white">Recent Analysis</h2>
          {recentReports.length === 0 ? (
            <div className="bg-sec-panel border border-sec-border p-8 rounded-lg text-center text-slate-500">
              No recent activity. Start a new scan!
            </div>
          ) : (
            <div className="space-y-3">
              {recentReports.map(report => (
                <ScanRow
                  key={report.id}
                  id={report.id}
                  target={report.target}
                  status={report.status}
                  time={report.date}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions / Tips */}
        <div className="bg-sec-panel border border-sec-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Security Coach Tips</h2>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex gap-3 items-start">
              <div className="h-2 w-2 rounded-full bg-sec-primary mt-2" />
              <span>Always validate inputs on both client and server side.</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="h-2 w-2 rounded-full bg-sec-primary mt-2" />
              <span>Avoid committing .env files. Use secrets management.</span>
            </li>
            <li className="flex gap-3 items-start">
              <div className="h-2 w-2 rounded-full bg-sec-primary mt-2" />
              <span>Regularly rotate API keys and tokens.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) {
  return (
    <div className="bg-sec-panel border border-sec-border p-6 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <Icon className={`h-8 w-8 ${color} opacity-80`} />
    </div>
  )
}

function ScanRow({ id, target, status, time }: { id: string, target: string, status: string, time: string }) {
  const isCritical = status === "Critical" || status === "High";
  const isSafe = status === "Safe";

  return (
    <div className="bg-sec-panel border border-sec-border p-4 rounded-lg flex items-center justify-between hover:bg-slate-900 transition-colors group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isCritical ? 'bg-red-500/10 text-red-500' : isSafe ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
          {isCritical ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="font-medium text-white group-hover:text-sec-primary transition-colors truncate max-w-[300px]" title={target}>{target}</h3>
          <p className="text-xs text-slate-500">{id} • {time}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${isCritical ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
          {status}
        </span>
        <div className="flex items-center gap-1">
          <Link href={`/reports/${id}`} className="p-2 text-slate-600 hover:text-white transition-colors">
            <ArrowRight className="h-4 w-4" />
          </Link>
          <DeleteReportButton id={id} />
        </div>
      </div>
    </div>
  )
}
