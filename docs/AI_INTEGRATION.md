# 🤖 NutriSense — AI Integration Guide (Claude API)

---

## 1. Overview

NutriSense uses **Anthropic Claude** (`claude-sonnet-4-20250514`) as its AI backbone for:

| Feature | Claude Usage |
|---------|-------------|
| Food Advisor Chat | Conversational nutrition guidance |
| Meal Analysis | Parse meal descriptions → macros |
| Plan Generation | Create personalized weekly meal plans |
| Daily Insights | Generate motivational, data-driven insights |
| Food Search Enrichment | Enhance food database results with context |

---

## 2. Backend Service: `claude.ts`

```typescript
// backend/src/services/claude.ts
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ─────────────────────────────────────────
// 1. AI FOOD ADVISOR CHAT
// ─────────────────────────────────────────
export async function chatWithAdvisor(
  userMessage: string,
  userContext: UserContext,
  chatHistory: ChatMessage[]
): Promise<string> {
  const systemPrompt = buildSystemPrompt(userContext);

  const messages = [
    ...chatHistory.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user" as const, content: userMessage },
  ];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 400,
    system: systemPrompt,
    messages,
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}

// ─────────────────────────────────────────
// 2. MEAL NUTRITION ANALYSIS
// ─────────────────────────────────────────
export async function analyzeMeal(description: string): Promise<NutritionData> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    system: `You are a nutrition analysis engine. Given a meal description, 
    return ONLY a valid JSON object with nutritional estimates. No other text.
    Format: {"calories": number, "protein": number, "carbs": number, 
    "fat": number, "fiber": number, "confidence": "high"|"medium"|"low"}`,
    messages: [
      {
        role: "user",
        content: `Analyze this meal: "${description}"`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "{}";

  try {
    return JSON.parse(text) as NutritionData;
  } catch {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      confidence: "low",
    };
  }
}

// ─────────────────────────────────────────
// 3. WEEKLY MEAL PLAN GENERATOR
// ─────────────────────────────────────────
export async function generateMealPlan(
  profile: UserProfile,
  goals: NutritionGoals
): Promise<WeeklyMealPlan> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: `You are a professional dietitian creating personalized Indian meal plans.
    Return ONLY valid JSON with 7 days of meals. Include breakfast, lunch, dinner, snack.
    Each meal: {name, description, calories, protein, carbs, fat}.
    Consider cultural preferences and local ingredients.`,
    messages: [
      {
        role: "user",
        content: `Create meal plan for:
        - Goal: ${goals.primary}
        - Daily calories: ${goals.dailyCalories}
        - Diet: ${profile.dietaryPreference}
        - Allergies: ${profile.allergies.join(", ") || "none"}
        - Activity: ${profile.activityLevel}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "{}";

  try {
    return JSON.parse(text);
  } catch {
    return { days: [] };
  }
}

// ─────────────────────────────────────────
// 4. DAILY INSIGHT GENERATOR
// ─────────────────────────────────────────
export async function generateDailyInsight(
  todayMeals: MealEntry[],
  goals: NutritionGoals,
  streak: number
): Promise<string> {
  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = todayMeals.reduce((sum, m) => sum + m.protein, 0);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 120,
    system: `You are an encouraging nutrition coach. Give a brief, specific, 
    positive insight (max 2 sentences) based on today's eating data. 
    Be personal and actionable. Use a motivating tone.`,
    messages: [
      {
        role: "user",
        content: `Today: ${totalCalories} cal / ${goals.dailyCalories} goal. 
        Protein: ${totalProtein}g. Meals: ${todayMeals.length}. Streak: ${streak} days.`,
      },
    ],
  });

  return response.content[0].type === "text"
    ? response.content[0].text
    : "Keep up the great work today! 🌟";
}

// ─────────────────────────────────────────
// HELPER: System Prompt Builder
// ─────────────────────────────────────────
function buildSystemPrompt(context: UserContext): string {
  const hour = new Date().getHours();
  const timeOfDay =
    hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  return `You are NutriSense, a warm and knowledgeable AI nutrition coach. 
You help users make better food choices with practical, culturally-aware advice.

USER PROFILE:
- Name: ${context.name || "there"}
- Goal: ${context.goal || "healthy eating"}
- Diet: ${context.dietaryPreference || "no restrictions"}
- Allergies: ${context.allergies?.join(", ") || "none"}
- Daily calorie target: ${context.dailyCalories || 2000} kcal
- Current streak: ${context.streak || 0} days

CONTEXT:
- Time of day: ${timeOfDay}
- Calories consumed today: ${context.todayCalories || 0} kcal
- Meals logged today: ${context.mealsLogged || 0}

GUIDELINES:
- Be encouraging, specific, and brief (max 150 words)
- Suggest portion sizes and preparation methods
- Favor Indian/South Asian cuisine when relevant
- If asked for meal ideas, give 2-3 specific options
- Never give medical advice; recommend doctors for medical issues
- Use food emojis sparingly for friendliness 🥗`;
}
```

---

## 3. API Routes

```typescript
// backend/src/routes/chat.ts
import { Router } from "express";
import { chatWithAdvisor, generateDailyInsight } from "../services/claude";

const router = Router();

// POST /api/chat
router.post("/", async (req, res) => {
  const { message, context, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await chatWithAdvisor(message, context, history);
    res.json({ reply, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "AI service temporarily unavailable" });
  }
});

// POST /api/insight
router.post("/insight", async (req, res) => {
  const { meals, goals, streak } = req.body;

  try {
    const insight = await generateDailyInsight(meals, goals, streak);
    res.json({ insight });
  } catch (error) {
    res.status(500).json({ insight: "You're doing great — keep it up! 💪" });
  }
});

export default router;
```

---

## 4. Frontend Hook: `useAIAdvisor`

```typescript
// frontend/src/hooks/useAIAdvisor.ts
import { useState, useCallback } from "react";
import { useUser } from "../contexts/UserContext";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function useAIAdvisor() {
  const { profile, goals, todayMeals } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi ${profile.name || "there"}! 👋 I'm your NutriSense AI advisor. 
      Ask me anything about nutrition, meal ideas, or your health goals!`,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      // Add user message immediately
      const userMsg: ChatMessage = {
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            context: {
              name: profile.name,
              goal: goals.primary,
              dietaryPreference: profile.dietary,
              allergies: profile.allergies,
              dailyCalories: goals.dailyCalories,
              todayCalories: todayMeals.reduce((s, m) => s + m.calories, 0),
              mealsLogged: todayMeals.length,
              streak: profile.streak,
            },
            history: messages.slice(-6), // Last 6 messages for context
          }),
        });

        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I'm having trouble connecting right now. Please try again! 🙏",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, profile, goals, todayMeals]
  );

  return { messages, isLoading, sendMessage };
}
```

---

## 5. Quick Prompts Configuration

```typescript
// frontend/src/config/quickPrompts.ts
export const QUICK_PROMPTS = [
  { label: "🌅 Breakfast ideas", message: "What are good breakfast options for my goal?" },
  { label: "💪 High protein meals", message: "Suggest high-protein meals I can have today" },
  { label: "🌙 Light dinner", message: "What's a light but filling dinner option?" },
  { label: "⚡ Energy boost", message: "I'm feeling tired. What should I eat for energy?" },
  { label: "🥗 Healthy snacks", message: "What are healthy snacks I can have between meals?" },
  { label: "📊 Review my day", message: "How is my nutrition looking today?" },
];
```

---

## 6. Rate Limiting

```typescript
// backend/src/middleware/rateLimit.ts
import rateLimit from "express-rate-limit";

export const chatRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,             // 20 requests per minute per IP
  message: { error: "Too many requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});
```

---

## 7. Error Handling Strategy

| Error Type | Handling | User Message |
|-----------|----------|-------------|
| API timeout | Retry once, then fallback | "Taking a moment... please try again" |
| Rate limit hit | Queue or reject | "You're chatting fast! Wait a moment" |
| Invalid API key | Log + alert | "Service temporarily unavailable" |
| JSON parse error | Return empty object | Silent fallback with defaults |
| Network error | Catch + fallback | "Check your connection" |

---

*Using `claude-sonnet-4-20250514` for balance of speed and quality. Adjust `max_tokens` per endpoint to control costs.*
