"use client";

import { BarChart3, TrendingDown, Target, Award, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProgressPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Your Progress</h1>
          <p className="text-muted-foreground">Track your journey and celebrate wins.</p>
        </div>
        <div className="bg-surface/50 border border-border px-4 py-2 rounded-xl flex items-center gap-3 w-fit">
          <CalendarDays className="w-5 h-5 text-primary" />
          <span className="font-bold">This Week</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Award />} label="Current Streak" value="12 Days" color="text-accent" bg="bg-accent/10" />
        <StatCard icon={<TrendingDown />} label="Weight Lost" value="2.4 kg" color="text-info" bg="bg-info/10" />
        <StatCard icon={<Target />} label="Goals Hit" value="5/7" color="text-primary" bg="bg-primary/10" />
        <StatCard icon={<BarChart3 />} label="Avg Calories" value="2,140 kcal" color="text-warning" bg="bg-warning/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="bg-surface/50 border-border p-6 rounded-3xl">
          <h3 className="text-lg font-bold font-display mb-6">Weight Trend</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {[66.5, 66.2, 65.8, 65.9, 65.4, 65.1, 64.8].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-primary/10 rounded-t-lg relative group-hover:bg-primary/20 transition-colors" style={{ height: `${(val - 60) * 15}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-border text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {val}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-surface/50 border-border p-6 rounded-3xl">
          <h3 className="text-lg font-bold font-display mb-6">Macro Averages</h3>
          <div className="space-y-6">
            <MacroProgress label="Protein" value={85} color="var(--color-accent)" />
            <MacroProgress label="Carbs" value={110} color="var(--color-info)" />
            <MacroProgress label="Fats" value={45} color="var(--color-warning)" />
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, bg }: { icon: React.ReactNode, label: string, value: string, color: string, bg: string }) {
  return (
    <Card className="bg-surface/50 border-border p-4 rounded-2xl flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-xl font-bold font-display mt-0.5">{value}</p>
      </div>
    </Card>
  );
}

function MacroProgress({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-sm text-muted-foreground">{label}</span>
        <span className="font-bold">{value}g</span>
      </div>
      <div className="w-full bg-border rounded-full h-3">
        <div className="h-3 rounded-full" style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
