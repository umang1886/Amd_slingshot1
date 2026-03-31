# 🥗 NutriSense — Product Requirements Document

> **AMD Slingshot Hackathon** | Powered by H2S | Human Imagination Built with AI

---

## 1. Product Overview

**Product Name:** NutriSense  
**Tagline:** *Eat Smarter. Live Better. Powered by AI.*  
**Version:** 1.0.0  
**Last Updated:** 2025-01-01  
**Owner:** Team NutriSense  

### 1.1 Problem Statement

Millions of individuals struggle to make healthy food choices due to:
- Lack of real-time nutritional knowledge
- Information overload from conflicting diet advice
- Inability to personalize recommendations to their health goals
- No contextual guidance based on time, mood, or activity

### 1.2 Solution

NutriSense is an AI-powered web application that uses **Claude AI (via Anthropic API)**, **Google Stitch** for UI/UX design system, and **contextual user data** to deliver hyper-personalized food recommendations, meal tracking, and nutritional coaching — all in a beautiful, accessible interface.

---

## 2. Goals & Success Metrics

### 2.1 Primary Goals

| Goal | Metric | Target |
|------|--------|--------|
| User Engagement | Daily Active Users | > 500 DAU at launch |
| Habit Formation | 7-day streak rate | > 30% users |
| Recommendation Quality | AI suggestion acceptance rate | > 70% |
| Health Outcomes | Self-reported improvement | > 60% users after 30 days |

### 2.2 Business Goals
- Showcase AMD + AI synergy at Slingshot Hackathon
- Demonstrate real-world use of Claude AI for health applications
- Build a scalable, deployable product on Google Cloud Run

---

## 3. Target Users

### Primary Persona: "Health-Conscious Priya"
- Age: 25–40
- Goal: Lose weight / eat balanced meals
- Pain Point: Doesn't know what to eat, overwhelmed by apps
- Tech Comfort: Medium-High

### Secondary Persona: "Fitness-Focused Arjun"
- Age: 20–35
- Goal: Build muscle, track macros
- Pain Point: Hard to track protein intake consistently
- Tech Comfort: High

### Tertiary Persona: "Busy Professional Meera"
- Age: 30–50
- Goal: Quick, healthy meal options
- Pain Point: No time to research nutrition
- Tech Comfort: Medium

---

## 4. Feature Requirements

### 4.1 Core Features (MVP)

#### F1 — AI Food Advisor (Priority: P0)
- Natural language chat interface powered by Claude AI
- User asks: "What should I eat for lunch?" → AI responds with personalized suggestions
- Context-aware: considers user's health goals, dietary restrictions, time of day
- **Tech:** Anthropic Claude API (`claude-sonnet-4-20250514`)

#### F2 — Smart Meal Logger (Priority: P0)
- Log meals via text, photo description, or quick-select
- Automatic nutritional breakdown (calories, protein, carbs, fat, fiber)
- Daily/weekly nutrition dashboard
- **Tech:** Claude AI for nutritional parsing, Chart.js for visualization

#### F3 — Personalized Onboarding (Priority: P0)
- Collect: age, weight, height, health goal, dietary preference, allergies
- Generate personalized nutrition plan via AI
- Store profile in browser (localStorage) + backend session
- **Tech:** Google Stitch components, Claude AI for plan generation

#### F4 — Health Goal Tracker (Priority: P1)
- Set and track goals: weight loss, muscle gain, balanced diet, energy boost
- Visual progress indicators
- Weekly AI-generated insights and adjustments
- **Tech:** Recharts/Chart.js, Claude AI analysis

#### F5 — Food Scanner / Search (Priority: P1)
- Search food database with nutritional info
- Quick-add to meal log
- Barcode-style text input for packaged foods
- **Tech:** Open Food Facts API + Claude AI enrichment

#### F6 — Daily Nudges & Reminders (Priority: P2)
- AI-generated contextual reminders (e.g., "You haven't logged lunch yet")
- Motivational insights based on streak data
- **Tech:** Browser notifications API, scheduled Claude prompts

### 4.2 Nice-to-Have (Post-MVP)

- Voice input for meal logging
- Recipe generator based on available ingredients
- Integration with wearables (Fitbit, Apple Watch)
- Social sharing of meal streaks

---

## 5. User Stories

```
AS A new user
I WANT to set up my health profile
SO THAT the app can personalize recommendations to my goals

AS A daily user
I WANT to ask the AI what to eat based on how I feel
SO THAT I make better food choices without research

AS A health-conscious user
I WANT to log my meals quickly
SO THAT I can track my nutrition without friction

AS A goal-oriented user
I WANT to see my weekly nutritional progress
SO THAT I stay motivated and on track

AS A busy user
I WANT quick meal suggestions based on time of day
SO THAT I don't waste time deciding what to eat
```

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Page load time: < 2 seconds (LCP)
- AI response time: < 3 seconds for chat responses
- Mobile-responsive: 100% of views

### 6.2 Accessibility
- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation throughout

### 6.3 Security
- No sensitive health data stored in plain text
- API keys secured via environment variables (Cloud Run secrets)
- HTTPS enforced

### 6.4 Scalability
- Containerized via Docker
- Deployed on Google Cloud Run (auto-scaling)
- Stateless architecture for horizontal scaling

---

## 7. Design System

### 7.1 Design Tool: Google Stitch
- Use Stitch for component generation and design tokens
- Export design specs to Tailwind CSS utility classes
- Ensure design-to-code consistency

### 7.2 Visual Identity
- **Primary Color:** `#22C55E` (Vibrant Green — health, vitality)
- **Accent Color:** `#F97316` (Warm Orange — energy, warmth)
- **Background:** `#0F172A` (Deep Navy — sophistication, focus)
- **Surface:** `#1E293B` (Slate — cards, panels)
- **Typography:** `Sora` (headings) + `DM Sans` (body)

### 7.3 Key UI Patterns
- Glass-morphism cards for meal entries
- Animated progress rings for macro tracking
- Conversational AI chat bubbles
- Micro-animations on goal completions

---

## 8. Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS + Stitch Design Tokens |
| AI Engine | Anthropic Claude API (claude-sonnet-4-20250514) |
| Charts | Recharts |
| State | React Context + useReducer |
| Build Tool | Vite |
| Containerization | Docker |
| Deployment | Google Cloud Run |
| CI/CD | Google Cloud Build |

---

## 9. Constraints & Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| AI response latency | Medium | High | Streaming responses, loading states |
| API cost overrun | Low | Medium | Rate limiting, caching common queries |
| User data privacy | Medium | High | No PII stored externally, local-first |
| Mobile UX complexity | Low | Medium | Mobile-first design from day 1 |

---

## 10. Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Design (Stitch) | Day 1 | UI mockups, design tokens |
| Frontend Build | Day 1–2 | React app with all core screens |
| AI Integration | Day 2 | Claude API connected, chat working |
| Dockerize & Deploy | Day 2–3 | Live URL on Cloud Run |
| Testing & Polish | Day 3 | Final demo-ready build |

---

## 11. Acceptance Criteria

- [ ] User can complete onboarding in < 2 minutes
- [ ] AI advisor responds to food questions with relevant suggestions
- [ ] Meal log displays accurate nutritional breakdown
- [ ] Dashboard shows today's vs. target macros
- [ ] App is live and accessible via Cloud Run URL
- [ ] Mobile responsive on all major screen sizes

---

*Document prepared for AMD Slingshot Hackathon. All features subject to hackathon timeline constraints.*
