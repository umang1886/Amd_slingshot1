"use client";

import { User, Settings, Bell, Shield, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-up">
      <h1 className="text-3xl font-display font-bold">Profile & Settings</h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-surface/50 border border-border p-8 rounded-3xl backdrop-blur-sm">
        <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center">
          <User className="w-10 h-10" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold font-display">Priya Sharma</h2>
          <p className="text-muted-foreground mt-1 text-lg">Goal: Build Muscle • 65kg</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">Non-Veg</span>
            <span className="px-3 py-1 bg-info/10 text-info rounded-full text-sm font-medium">Active Lifestyle</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-surface border border-border rounded-xl font-bold hover:bg-surface-elevated transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SettingCard icon={<Settings />} title="Account Settings" desc="Update email, password" />
        <SettingCard icon={<Bell />} title="Notifications" desc="Meal reminders, insights" />
        <SettingCard icon={<Shield />} title="Privacy" desc="Data sharing, permissions" />
      </div>

      <div className="pt-8">
        <button className="w-full md:w-auto px-8 py-3 bg-destructive/10 text-destructive font-bold rounded-xl hover:bg-destructive/20 transition-colors">
          Sign Out
        </button>
      </div>
    </div>
  );
}

function SettingCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-surface/50 border border-border rounded-2xl cursor-pointer hover:bg-surface-elevated transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}
