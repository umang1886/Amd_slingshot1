import Link from "next/link";
import { ArrowRight, Sparkles, Activity, Utensils } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
      
      <main className="container px-4 md:px-6 flex flex-col items-centertext-center z-10 max-w-4xl mx-auto items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 animate-fade-up" style={{ animationDelay: "0ms" }}>
          <span>AMD Slingshot Hackathon</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
          Eat Smarter.<br className="hidden md:block" /> Live Better.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Powered by AI.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl animate-fade-up" style={{ animationDelay: "200ms" }}>
          NutriSense uses advanced AI to deliver hyper-personalized food recommendations, meal tracking, and nutritional coaching.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-up" style={{ animationDelay: "300ms" }}>
          <Link href="/onboarding" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary-dark">
            Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/dashboard" className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-surface/50 backdrop-blur-md px-8 text-base font-medium transition-colors hover:bg-surface hover:text-foreground">
            View Dashboard
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-border backdrop-blur-glass">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display mb-2">AI Advisor</h3>
            <p className="text-muted-foreground text-sm">Chat with Claude to get personalized meal suggestions anytime.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-border backdrop-blur-glass">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
              <Utensils className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display mb-2">Smart Logging</h3>
            <p className="text-muted-foreground text-sm">Instantly analyze your meals and track essential macros.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 border border-border backdrop-blur-glass">
            <div className="h-12 w-12 rounded-full bg-info/20 flex items-center justify-center text-info mb-4">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold font-display mb-2">Goal Tracking</h3>
            <p className="text-muted-foreground text-sm">Visual progress rings and weekly insights to maintain streaks.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
