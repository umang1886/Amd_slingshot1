"use client";

import { useState } from "react";
import { Search, History, TrendingUp, Plus } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-fade-up">
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold mb-2">Food Search</h1>
        <p className="text-muted-foreground">Find nutritional info for millions of foods.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
           type="text"
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           placeholder="Search for a food, brand, or recipe..."
           className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg shadow-sm"
        />
      </div>

      {!query && (
        <>
          <section>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-muted-foreground" /> Recent Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {["Oatmeal", "Greek Yogurt", "Grilled Chicken", "Banana", "Almonds"].map(item => (
                <button key={item} className="px-4 py-2 bg-surface border border-border rounded-xl text-sm font-medium hover:border-primary/50 transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-muted-foreground" /> Popular Foods
            </h2>
            <div className="space-y-3">
               {[
                 { name: "Avocado Toast", cals: 320, p: 12, c: 30, f: 18 },
                 { name: "Protein Shake", cals: 150, p: 25, c: 5, f: 2 },
                 { name: "Caesar Salad", cals: 450, p: 15, c: 20, f: 35 }
               ].map((food, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-surface/50 border border-border rounded-2xl hover:bg-surface-elevated transition-colors cursor-pointer group">
                   <div>
                     <h4 className="font-bold">{food.name}</h4>
                     <p className="text-xs text-muted-foreground mt-1">
                       {food.cals} kcal • P: {food.p}g • C: {food.c}g • F: {food.f}g
                     </p>
                   </div>
                   <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Plus className="w-4 h-4" />
                   </button>
                 </div>
               ))}
            </div>
          </section>
        </>
      )}

      {query && (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Searching database for "{query}"...</p>
        </div>
      )}
    </div>
  );
}
