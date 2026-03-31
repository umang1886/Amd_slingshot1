"use client";

import { useEffect, useState } from "react";
import { Flame, Plus, ChevronRight, Activity, Calendar } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Dummy data
const DAILY_GOALS = {
  calories: 2200,
  protein: 150,
  carbs: 200,
  fats: 65
};

const CONSUMED = {
  calories: 1450,
  protein: 85,
  carbs: 120,
  fats: 45
};

const RECENT_MEALS = [
  { id: 1, name: "Oatmeal Bowl", time: "8:30 AM", calories: 350, type: "Breakfast" },
  { id: 2, name: "Grilled Chicken Salad", time: "1:15 PM", calories: 450, type: "Lunch" },
  { id: 3, name: "Protein Shake", time: "4:00 PM", calories: 200, type: "Snack" },
];

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Good Morning");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17) setGreeting("Good Evening");

    const saved = localStorage.getItem("nutrisense_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.profile?.name) setUserName(parsed.profile.name);
      } catch (e) {}
    }
  }, []);

  return (
    <div className="space-y-8 pb-20 md:pb-0 animate-fade-up">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            {greeting}, <span className="text-primary">{userName}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Ready to crush your goals today?</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full font-bold">
          <Flame className="w-5 h-5" />
          <span>12 Day Streak</span>
        </div>
      </div>

      {/* Main Rings Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-surface/50 border-border backdrop-blur-glass p-6 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <h3 className="text-lg font-bold font-display w-full mb-6">Daily Calories</h3>
          <div className="relative flex items-center justify-center">
            <ProgressRing 
              percent={(CONSUMED.calories / DAILY_GOALS.calories) * 100} 
              size={220} 
              strokeWidth={16} 
              color="var(--color-primary)" 
            />
            <div className="absolute text-center">
              <span className="block text-4xl font-display font-bold">{CONSUMED.calories}</span>
              <span className="text-muted-foreground text-sm">/ {DAILY_GOALS.calories} kcal</span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <MacroCard 
            title="Protein" 
            consumed={CONSUMED.protein} 
            total={DAILY_GOALS.protein} 
            color="var(--color-accent)" 
            unit="g" 
          />
          <MacroCard 
            title="Carbs" 
            consumed={CONSUMED.carbs} 
            total={DAILY_GOALS.carbs} 
            color="var(--color-info)" 
            unit="g" 
          />
          <MacroCard 
            title="Fats" 
            consumed={CONSUMED.fats} 
            total={DAILY_GOALS.fats} 
            color="var(--color-warning)" 
            unit="g" 
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="flex gap-4">
        <Link 
          href="/log" 
          className="flex-1 bg-primary text-primary-foreground p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" /> Log Meal
        </Link>
        <Link 
          href="/advisor" 
          className="flex-1 bg-surface border border-border text-foreground p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-elevated transition-colors"
        >
          <Activity className="w-5 h-5 text-accent" /> Ask AI
        </Link>
      </section>

      {/* Recent Meals */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-display font-bold">Today's Meals</h2>
          <Link href="/log" className="text-sm font-medium text-primary hover:underline flex items-center">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {RECENT_MEALS.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between p-4 bg-surface/40 border border-border backdrop-blur-sm rounded-2xl hover:bg-surface/60 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UtensilIcon />
                </div>
                <div>
                  <h4 className="font-bold">{meal.name}</h4>
                  <p className="text-sm text-muted-foreground">{meal.type} • {meal.time}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-lg">{meal.calories}</span>
                <span className="text-xs text-muted-foreground block">kcal</span>
              </div>
            </div>
          ))}

          {RECENT_MEALS.length === 0 && (
             <div className="text-center p-8 bg-surface border border-border border-dashed rounded-2xl">
               <Calendar className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
               <p className="text-muted-foreground">No meals logged today yet.</p>
             </div>
          )}
        </div>
      </section>
    </div>
  );
}

// --- Helper Components ---

function MacroCard({ title, consumed, total, color, unit }: { title: string, consumed: number, total: number, color: string, unit: string }) {
  const percent = Math.min((consumed / total) * 100, 100);
  
  return (
    <Card className="bg-surface/50 border-border backdrop-blur-glass p-4 rounded-2xl flex items-center gap-6">
      <div className="relative flex items-center justify-center">
        <ProgressRing percent={percent} size={60} strokeWidth={6} color={color} />
        <div className="absolute text-xs font-bold" style={{ color }}>
          {Math.round(percent)}%
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-bold font-display text-lg">{title}</h4>
        <div className="w-full bg-border rounded-full h-2 mt-2">
          <div 
            className="h-2 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${percent}%`, backgroundColor: color }} 
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1 font-medium">
          {consumed}{unit} <span className="opacity-50">/ {total}{unit}</span>
        </p>
      </div>
    </Card>
  );
}

function ProgressRing({ percent, size, strokeWidth, color }: { percent: number, size: number, strokeWidth: number, color: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        className="opacity-10"
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress circle */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

function UtensilIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}
