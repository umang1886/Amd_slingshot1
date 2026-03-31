"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Search, Plus, CheckCircle2, RotateCcw, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LogMealPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAnalyzing(true);
    // Simulate AI Macro estimation
    setTimeout(() => {
      setResult({
        name: query,
        calories: Math.floor(Math.random() * 300) + 200,
        macros: {
          protein: Math.floor(Math.random() * 30) + 10,
          carbs: Math.floor(Math.random() * 50) + 20,
          fats: Math.floor(Math.random() * 20) + 5
        },
        healthScore: Math.floor(Math.random() * 3) + 7 // 7-9
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleSave = () => {
    // In real app, save to db
    router.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-fade-up">
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold mb-2">Log Your Meal</h1>
        <p className="text-muted-foreground">Type what you ate or upload a photo.</p>
      </div>

      {!result && !isAnalyzing && (
        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 2 eggs and a slice of toast"
              className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              className="flex flex-col items-center justify-center p-6 bg-surface border border-border rounded-2xl hover:border-primary/50 hover:bg-surface-elevated transition-colors"
            >
              <Camera className="w-8 h-8 text-primary mb-3" />
              <span className="font-bold">Take Photo</span>
              <span className="text-xs text-muted-foreground mt-1">AI Vision Analysis</span>
            </button>
            <button 
              type="submit"
              disabled={!query.trim()}
              className="flex flex-col items-center justify-center p-6 bg-primary text-primary-foreground rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
            >
              <Search className="w-8 h-8 mb-3" />
              <span className="font-bold">Analyze Text</span>
              <span className="text-xs text-primary-foreground/80 mt-1">Get Macros</span>
            </button>
          </div>
        </form>
      )}

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-up">
           <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
           <h3 className="text-xl font-bold font-display">Analyzing Meal...</h3>
           <p className="text-muted-foreground mt-2">Claude is estimating portions and macros.</p>
        </div>
      )}

      {result && !isAnalyzing && (
        <div className="space-y-6 animate-fade-up">
          <Card className="bg-surface/50 backdrop-blur-md border-border p-6 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="flex justify-between items-start mb-6">
               <div>
                 <h2 className="text-2xl font-display font-bold text-foreground capitalize">{result.name}</h2>
                 <p className="text-primary font-medium flex items-center gap-1 mt-1">
                   <Activity className="w-4 h-4" /> Health Score: {result.healthScore}/10
                 </p>
               </div>
               <div className="text-right">
                 <span className="block text-3xl font-display font-bold text-foreground">{result.calories}</span>
                 <span className="text-sm text-muted-foreground">Calories</span>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="bg-background border border-border rounded-xl p-4 text-center">
                 <div className="text-xl font-bold text-accent">{result.macros.protein}g</div>
                 <div className="text-xs text-muted-foreground font-medium uppercase mt-1">Protein</div>
               </div>
               <div className="bg-background border border-border rounded-xl p-4 text-center">
                 <div className="text-xl font-bold text-info">{result.macros.carbs}g</div>
                 <div className="text-xs text-muted-foreground font-medium uppercase mt-1">Carbs</div>
               </div>
               <div className="bg-background border border-border rounded-xl p-4 text-center">
                 <div className="text-xl font-bold text-warning">{result.macros.fats}g</div>
                 <div className="text-xs text-muted-foreground font-medium uppercase mt-1">Fats</div>
               </div>
            </div>

            <div className="flex gap-4">
               <button 
                 onClick={() => setResult(null)}
                 className="flex-1 py-4 border border-border bg-background rounded-xl font-bold hover:bg-surface transition-colors flex items-center justify-center gap-2"
               >
                 <RotateCcw className="w-4 h-4" /> Retake
               </button>
               <button 
                 onClick={handleSave}
                 className="flex-[2] py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
               >
                 <CheckCircle2 className="w-5 h-5" /> Log Meal
               </button>
            </div>
          </Card>
          
          <div className="p-4 bg-info/10 border border-info/20 rounded-2xl flex gap-3 text-info text-sm">
             <Activity className="w-5 h-5 flex-shrink-0" />
             <p><strong>AI Insight:</strong> Great choice! This meal provides excellent lean protein towards your daily goal.</p>
          </div>
        </div>
      )}
    </div>
  );
}
