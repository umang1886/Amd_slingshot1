# 🔄 NutriSense — User Flows

---

## 1. Onboarding Flow

```
[ Landing Page ]
      │
      ▼
[ Step 1: Goal Selection ]
  • Lose Weight
  • Build Muscle  
  • Eat Balanced
  • Boost Energy
      │
      ▼
[ Step 2: Profile Setup ]
  • Name
  • Age
  • Weight & Height
  • Activity Level (Sedentary / Light / Moderate / Active)
      │
      ▼
[ Step 3: Diet Preferences ]
  • Vegetarian / Vegan / Non-Veg / Jain
  • Allergies (multi-select)
  • Cuisine Preference (Indian / Mediterranean / etc.)
      │
      ▼
[ AI Plan Generation ]
  • Claude generates personalized calorie targets
  • Creates sample first-day meal plan
  • Shows macro breakdown
      │
      ▼
[ Dashboard ] ← Onboarding Complete
```

---

## 2. Daily Usage Flow

```
[ App Open ]
      │
      ▼
[ Dashboard ]
  • Good morning greeting
  • Today's macro ring (calories, protein, carbs, fat)
  • Meals logged today
  • AI daily insight
  • Quick-add button
      │
    ┌─┼──────────────────────────────┐
    │ │                              │
    ▼ ▼                              ▼
[ Log Meal ]              [ Ask AI Advisor ]
  • Search food              • Type question
  • Describe meal            • Use quick prompt
  • Select quick-add         • Get AI response
  • View nutrients           • Follow-up chat
  • Confirm & save                │
    │                             │
    └──────────────┬──────────────┘
                   ▼
         [ Dashboard Updated ]
           • Macros recalculated
           • Progress ring fills
           • Streak updated
```

---

## 3. AI Advisor Flow

```
[ Advisor Page ]
      │
      ▼
[ Chat Window Opens ]
  System: "Hi [Name]! How can I help you today?"
      │
  ┌───┴───────────────────────────────┐
  │                                   │
  ▼                                   ▼
[ User Types Question ]        [ Taps Quick Prompt ]
  "What should I eat           "Breakfast ideas"
  for lunch today?"                   │
  │                                   │
  └───────────────┬───────────────────┘
                  ▼
        [ API Call to /api/chat ]
          • User message
          • User profile context
          • Today's meal history
          • Time of day
                  │
                  ▼
        [ Claude AI Processing ]
          • Builds system prompt
          • Adds context
          • Generates response
                  │
                  ▼
        [ AI Response Displayed ]
          • Typing animation
          • Message bubble appears
          • Optional: Meal suggestions
                  │
                  ▼
        [ User Can Log Suggested Meal ]
          • Tap suggestion → Pre-fill meal logger
```

---

## 4. Meal Logging Flow

```
[ Meal Logger ]
      │
  ┌───┴──────────────────────┐
  │                          │
  ▼                          ▼
[ Search Food DB ]    [ Describe Meal (AI) ]
  • Type food name      • "2 rotis with dal"
  • Browse results      • AI analyzes description
  • Select item         • Returns macro estimate
  │                          │
  └──────────┬───────────────┘
             ▼
    [ Nutrition Preview ]
      • Calories, Protein, Carbs, Fat, Fiber
      • Confidence indicator (AI analysis)
      • Edit portions
             │
             ▼
    [ Confirm & Save ]
      • Added to today's log
      • Dashboard macros updated
      • Streak count checked
```

---

## 5. Goal Progress Flow

```
[ Profile / Goals Tab ]
      │
      ▼
[ Current Goals Display ]
  • Primary goal badge
  • Daily calorie target
  • Macro targets
  • Current streak
      │
      ▼
[ Weekly Progress View ]
  • Bar chart: calories each day
  • Line chart: protein trend
  • Goal hit days (checkmarks)
      │
      ▼
[ AI Weekly Insight ]
  • "You hit your protein goal 5/7 days!"
  • Recommendation for next week
  • Encouragement based on streak
```

---

## 6. Navigation Structure

### Mobile (Bottom Navigation)
```
[ 🏠 Home ] [ 🍽️ Log ] [ 🤖 AI ] [ 📊 Progress ] [ 👤 Profile ]
```

### Desktop (Left Sidebar)
```
NutriSense
─────────────
🏠 Dashboard
🤖 AI Advisor
🍽️ Log Meal
📊 Progress
🔍 Food Search
─────────────
⚙️ Settings
👤 Profile
```

---

## 7. Error States

| Scenario | User Experience |
|----------|----------------|
| AI timeout | "Thinking..." → "Try again" button after 8s |
| No meals logged | Empty state with CTA to log first meal |
| Goal not set | Prompt to complete onboarding |
| Offline | Toast: "Check your connection" |
| API error | Friendly message, retry option |

---

## 8. Success Micro-interactions

| Trigger | Animation |
|---------|-----------|
| Meal logged | ✅ Green checkmark pulse + macro ring fills |
| Goal reached | 🎉 Confetti burst + congratulation message |
| Streak milestone | 🔥 Fire animation + streak number grows |
| AI responds | Typing dots → smooth message slide-in |
| Onboarding complete | Full-screen success with personalized summary |
