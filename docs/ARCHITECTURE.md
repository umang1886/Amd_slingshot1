# 🏗️ NutriSense — System Architecture

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              React SPA (Vite + TypeScript)          │  │
│   │                                                     │  │
│   │  ┌───────────┐  ┌───────────┐  ┌───────────────┐   │  │
│   │  │ Onboarding│  │ AI Chat   │  │  Meal Logger  │   │  │
│   │  │  Screen   │  │ Advisor   │  │  + Dashboard  │   │  │
│   │  └───────────┘  └───────────┘  └───────────────┘   │  │
│   │                                                     │  │
│   │         Tailwind CSS + Stitch Design Tokens         │  │
│   └──────────────────────┬──────────────────────────────┘  │
└─────────────────────────-│──────────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                   Google Cloud Run                           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              Node.js / Express API Server           │  │
│   │                                                     │  │
│   │  ┌──────────────────┐   ┌──────────────────────┐   │  │
│   │  │  /api/chat       │   │  /api/nutrition       │   │  │
│   │  │  AI Advisor      │   │  Food Analysis        │   │  │
│   │  └────────┬─────────┘   └──────────┬───────────┘   │  │
│   │           │                        │                │  │
│   │  ┌────────▼────────────────────────▼───────────┐   │  │
│   │  │         Anthropic Claude SDK                │   │  │
│   │  │         claude-sonnet-4-20250514            │   │  │
│   │  └─────────────────────────────────────────────┘   │  │
│   └─────────────────────────────────────────────────────┘  │
│                                                             │
│   Environment Variables (Cloud Run Secrets):               │
│   • ANTHROPIC_API_KEY                                       │
│   • NODE_ENV=production                                     │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│               External Services                              │
│                                                             │
│   ┌────────────────┐      ┌────────────────────────────┐   │
│   │ Anthropic API  │      │  Open Food Facts API       │   │
│   │ (Claude AI)    │      │  (Free food database)      │   │
│   └────────────────┘      └────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Component Tree

```
App
├── Router
│   ├── /onboarding          → OnboardingFlow
│   │   ├── Step1Goals
│   │   ├── Step2Profile
│   │   └── Step3Preferences
│   │
│   ├── /dashboard           → Dashboard
│   │   ├── MacroRingChart
│   │   ├── MealList
│   │   ├── QuickLogButton
│   │   └── DailyInsight (AI)
│   │
│   ├── /advisor             → AIAdvisor
│   │   ├── ChatWindow
│   │   ├── MessageBubble
│   │   ├── QuickPrompts
│   │   └── TypingIndicator
│   │
│   └── /log                 → MealLogger
│       ├── SearchFood
│       ├── FoodCard
│       ├── NutritionBreakdown
│       └── LogConfirm
│
├── Layout
│   ├── Navbar
│   ├── BottomNav (mobile)
│   └── Sidebar (desktop)
│
└── Providers
    ├── UserContextProvider
    ├── MealsContextProvider
    └── ThemeProvider
```

### 2.2 State Management

```typescript
// Global State Shape
interface AppState {
  user: {
    profile: UserProfile;
    goals: NutritionGoals;
    streak: number;
    onboardingComplete: boolean;
  };
  meals: {
    today: MealEntry[];
    history: WeeklyMeals;
    totals: MacroTotals;
  };
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
  };
}
```

### 2.3 Data Flow

```
User Input → Component State → Context Action → API Call → State Update → Re-render
```

---

## 3. Backend Architecture

### 3.1 API Endpoints

```
POST /api/chat
  Body: { message: string, context: UserContext }
  Response: { reply: string, suggestions?: FoodSuggestion[] }

POST /api/analyze-meal
  Body: { description: string }
  Response: { nutrients: NutritionData, confidence: number }

GET  /api/food-search?q={query}
  Response: { results: FoodItem[] }

POST /api/generate-plan
  Body: { profile: UserProfile, goals: NutritionGoals }
  Response: { plan: WeeklyMealPlan }
```

### 3.2 Claude AI Prompt Architecture

```
System Prompt (loaded once):
┌────────────────────────────────────────────────────┐
│ "You are NutriSense, a friendly nutrition coach.   │
│  You help users make better food choices based on  │
│  their personal health goals. Always be:           │
│  - Encouraging and positive                        │
│  - Specific with portion sizes                     │
│  - Culturally sensitive to Indian cuisine          │
│  - Brief but informative (max 150 words)           │
│                                                    │
│  User Profile: {injected per request}              │
│  Time of Day: {injected per request}               │
│  Recent Meals: {injected per request}              │
│ "                                                  │
└────────────────────────────────────────────────────┘

User Message → Context Enrichment → Claude API → Parse Response → Send to Frontend
```

---

## 4. Database / Storage Strategy

### 4.1 Client-Side Storage (MVP)
- **localStorage** for user profile and settings
- **sessionStorage** for current day's meal log
- **In-memory** for chat history (per session)

### 4.2 Future: Cloud Storage
- Firebase Firestore for user data persistence
- Firestore rules for user-specific data isolation

---

## 5. Security Architecture

```
┌──────────────────────────────────────────────────┐
│  Security Layers                                 │
│                                                  │
│  1. HTTPS only (enforced by Cloud Run)           │
│  2. ANTHROPIC_API_KEY in Cloud Run Secrets       │
│  3. CORS configured for app domain only          │
│  4. Rate limiting: 60 req/min per IP             │
│  5. Input sanitization on all AI prompts         │
│  6. No PII stored in AI conversation logs        │
└──────────────────────────────────────────────────┘
```

---

## 6. Performance Strategy

| Optimization | Technique |
|-------------|-----------|
| AI Streaming | Server-Sent Events for real-time Claude responses |
| Code Splitting | React.lazy() for route-based chunks |
| Asset Optimization | Vite build with tree-shaking |
| Caching | Cache common nutrition queries for 24h |
| Loading States | Skeleton UI for all async operations |

---

## 7. Monitoring & Observability

```
Google Cloud Logging  →  Structured logs from Express
Google Cloud Metrics  →  CPU, Memory, Request count
Error Tracking        →  Console errors streamed to Cloud Logging
```

---

*Architecture designed for hackathon MVP — optimized for speed of delivery and demo quality.*
