"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Target, TrendingDown, TrendingUp, Heart, Battery, ArrowRight, Loader2 } from "lucide-react";

type Goal = "Lose Weight" | "Build Muscle" | "Eat Balanced" | "Boost Energy";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  const [goal, setGoal] = useState<Goal | "">("");
  const [profile, setProfile] = useState({ name: "", age: "", weight: "", height: "", activity: "Sedentary" });
  const [diet, setDiet] = useState({ preference: "Non-Veg", allergies: "", cuisine: "Indian" });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else generatePlan();
  };

  const generatePlan = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      // Save to localStorage or context here
      localStorage.setItem("nutrisense_user", JSON.stringify({ goal, profile, diet }));
      router.push("/dashboard");
    }, 3000);
  };

  // --- Render Steps ---

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-2">What's your primary goal?</h2>
        <p className="text-muted-foreground">This helps AI personalize your nutrition plan.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: "Lose Weight", icon: TrendingDown, desc: "Burn fat and get leaner" },
          { id: "Build Muscle", icon: TrendingUp, desc: "Increase strength and mass" },
          { id: "Eat Balanced", icon: Heart, desc: "Maintain overall health" },
          { id: "Boost Energy", icon: Battery, desc: "Stay active all day long" }
        ].map((g) => {
          const Icon = g.icon;
          const isSelected = goal === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setGoal(g.id as Goal)}
              className={`flex flex-col items-start p-6 rounded-2xl border text-left transition-all ${
                isSelected 
                  ? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2 ring-offset-background" 
                  : "border-border bg-surface hover:border-primary/50 hover:bg-surface-elevated"
              }`}
            >
              <div className={`p-3 rounded-full mb-4 ${isSelected ? "bg-primary text-white" : "bg-primary/20 text-primary"}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1">{g.id}</h3>
              <p className="text-sm text-muted-foreground">{g.desc}</p>
            </button>
          );
        })}
      </div>
      
      <div className="pt-8">
        <button 
          onClick={handleNext} 
          disabled={!goal}
          className="w-full flex items-center justify-center p-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-[0.98]"
        >
          Continue <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">Basic info for accurate macro calculations.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">What should we call you?</label>
          <input 
            type="text" 
            value={profile.name} 
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            placeholder="e.g. Priya"
            className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground placeholder-muted-foreground transition-all"
          />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Age</label>
            <input 
              type="number" 
              value={profile.age} 
              onChange={(e) => setProfile({...profile, age: e.target.value})}
              placeholder="e.g. 28"
              className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Weight (kg)</label>
            <input 
              type="number" 
              value={profile.weight} 
              onChange={(e) => setProfile({...profile, weight: e.target.value})}
              placeholder="e.g. 65"
              className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary outline-none"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium mb-1 text-muted-foreground">Height (cm)</label>
            <input 
              type="number" 
              value={profile.height} 
              onChange={(e) => setProfile({...profile, height: e.target.value})}
              placeholder="e.g. 170"
              className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-muted-foreground">Activity Level</label>
          <select 
            value={profile.activity}
            onChange={(e) => setProfile({...profile, activity: e.target.value})}
            className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary outline-none appearance-none"
          >
            <option value="Sedentary">Sedentary (Little to no exercise)</option>
            <option value="Light">Light (Light exercise 1-3 days/week)</option>
            <option value="Moderate">Moderate (Moderate exercise 3-5 days/week)</option>
            <option value="Active">Active (Hard exercise 6-7 days/week)</option>
          </select>
        </div>
      </div>

      <div className="pt-8 flex gap-4">
        <button 
          onClick={() => setStep(1)} 
          className="w-1/3 p-4 rounded-xl bg-surface border border-border text-foreground font-bold hover:bg-surface-elevated transition-colors"
        >
          Back
        </button>
        <button 
          onClick={handleNext} 
          disabled={!profile.name || !profile.age || !profile.weight || !profile.height}
          className="w-2/3 flex items-center justify-center p-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg disabled:opacity-50 transition-transform active:scale-[0.98]"
        >
          Continue <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-2">Dietary Preferences</h2>
        <p className="text-muted-foreground">Customizing your food options.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3 text-muted-foreground">Diet Type</label>
          <div className="flex flex-wrap gap-3">
            {["Non-Veg", "Vegetarian", "Vegan", "Jain", "Keto"].map((pref) => (
              <button
                key={pref}
                onClick={() => setDiet({...diet, preference: pref})}
                className={`px-5 py-2.5 rounded-full border transition-colors ${
                  diet.preference === pref 
                    ? "bg-primary text-primary-foreground border-primary font-medium" 
                    : "bg-surface border-border text-foreground hover:border-primary/50"
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium mb-1 text-muted-foreground">Cuisine Preference</label>
           <select 
            value={diet.cuisine}
            onChange={(e) => setDiet({...diet, cuisine: e.target.value})}
            className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary outline-none appearance-none"
          >
            <option value="Indian">Indian (Default)</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Continental">Continental</option>
            <option value="Mixed">Mixed Cuisine</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-muted-foreground">Allergies or Dislikes (Optional)</label>
          <input 
            type="text" 
            value={diet.allergies} 
            onChange={(e) => setDiet({...diet, allergies: e.target.value})}
            placeholder="e.g. Peanuts, Gluten, Dairy"
            className="w-full p-4 rounded-xl bg-surface border border-border focus:border-primary outline-none"
          />
        </div>
      </div>

      <div className="pt-8 flex gap-4">
        <button 
          onClick={() => setStep(2)} 
          className="w-1/3 p-4 rounded-xl bg-surface border border-border text-foreground font-bold hover:bg-surface-elevated transition-colors"
        >
          Back
        </button>
        <button 
          onClick={handleNext} 
          className="w-2/3 flex items-center justify-center p-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg transition-transform active:scale-[0.98]"
        >
          Generate Plan <SparklesIcon className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderGenerating = () => (
    <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-up">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        <Target className="absolute inset-0 m-auto w-10 h-10 text-primary" />
      </div>
      <h2 className="text-3xl font-display font-bold mb-4">Crafting Your Plan</h2>
      <p className="text-muted-foreground max-w-sm">
        Claude AI is crunching the numbers and designing a daily plan tailored to your goal to {goal.toLowerCase()}.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl">
        
        {/* Step Indicator */}
        {!isGenerating && (
          <div className="flex items-center justify-center gap-3 mb-12">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  step >= num ? "bg-primary" : "bg-border"
                }`} />
                {num < 3 && (
                  <div className={`h-[2px] w-12 mx-2 rounded-full transition-colors ${
                    step > num ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content Box */}
        <div className="bg-surface/50 backdrop-blur-glass border border-border rounded-[32px] p-6 sm:p-10 shadow-2xl">
          {isGenerating ? renderGenerating() : (
            <>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a4.4 4.4 0 0 1 0-8.962L8.5 1.936A2 2 0 0 0 9.937.5l1.582-6.135a4.4 4.4 0 0 1 8.962 0L22.063 8.5a2 2 0 0 0 1.437 1.438l6.135 1.582a4.4 4.4 0 0 1 0 8.962l-6.135 1.582a2 2 0 0 0-1.437 1.438l-1.582 6.135a4.4 4.4 0 0 1-8.962 0z" />
    </svg>
  );
}
