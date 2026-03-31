# 🥗 NutriSense
### *Human Imagination Built with AI*

> **AMD Slingshot Hackathon** | Powered by H2S

[![Deploy to Cloud Run](https://img.shields.io/badge/Deploy-Cloud%20Run-4285F4?style=flat&logo=google-cloud)](https://cloud.google.com/run)
[![Built with Claude](https://img.shields.io/badge/AI-Claude%20Sonnet-D97757?style=flat&logo=anthropic)](https://anthropic.com)
[![Design by Stitch](https://img.shields.io/badge/Design-Google%20Stitch-34A853?style=flat&logo=google)](https://stitch.google.com)

---

## 🌟 What is NutriSense?

NutriSense is an AI-powered web application that helps individuals make **smarter food choices** and build **lasting healthy habits** through:

- 🤖 **AI Food Advisor** — Chat with Claude AI for personalized nutrition guidance
- 🍽️ **Smart Meal Logger** — Log meals and get instant nutritional breakdowns
- 📊 **Progress Dashboard** — Track macros, calories, and health goals visually
- 🎯 **Personalized Plans** — AI-generated meal plans tailored to your goals
- 🔥 **Streak Tracker** — Build habits with daily consistency tracking

---

## 📁 Documentation Index

| File | Description |
|------|-------------|
| **[PRD.md](./PRD.md)** | Product Requirements Document — features, personas, success metrics |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | System design, component tree, data flow |
| **[STITCH_DESIGN.md](./STITCH_DESIGN.md)** | Google Stitch design system, tokens, component prompts |
| **[AI_INTEGRATION.md](./AI_INTEGRATION.md)** | Claude API integration code, prompts, hooks |
| **[USER_FLOWS.md](./USER_FLOWS.md)** | User journeys, navigation, error states |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Docker, Cloud Run, Cloud Build setup |
| **[README.md](./README.md)** | This file — quickstart and overview |

---

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18  |  docker >= 24  |  gcloud CLI
```

### Local Development

```bash
# 1. Clone and install
git clone https://github.com/your-team/nutrisense
cd nutrisense

# 2. Setup environment
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# 3. Install dependencies
cd frontend && npm install
cd ../backend && npm install

# 4. Run development servers
# Terminal 1 (backend)
cd backend && npm run dev

# Terminal 2 (frontend)  
cd frontend && npm run dev

# Open http://localhost:5173
```

### Deploy to Cloud Run

```bash
# One-command deploy
chmod +x scripts/deploy.sh
./scripts/deploy.sh YOUR_GCP_PROJECT_ID
```

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for full deployment guide.

---

## 🛠️ Tech Stack

```
Frontend    →  React 18 + TypeScript + Tailwind CSS
Design      →  Google Stitch (design tokens + components)
AI Engine   →  Anthropic Claude API (claude-sonnet-4-20250514)
Charts      →  Recharts
Build       →  Vite
Backend     →  Node.js + Express
Container   →  Docker (multi-stage)
Deployment  →  Google Cloud Run
CI/CD       →  Google Cloud Build
```

---

## 🎨 Design Philosophy

Built with **Google Stitch** for design consistency:
- 🌿 **Health-forward palette**: Deep navy + vibrant green + warm orange
- ✨ **Glassmorphism UI**: Modern, layered card design
- 📱 **Mobile-first**: Optimized for on-the-go tracking
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🎭 **Typography**: Sora (display) + DM Sans (body)

---

## 🤖 AI Features Powered by Claude

```
"What should I eat for lunch today?"
    ↓ Claude analyzes your profile, goals, today's meals
    ↓ Returns personalized suggestions with portions
    ↓ Considers dietary restrictions and preferences
"2 rotis with dal and sabzi"
    ↓ Claude estimates: 380 cal | 14g protein | 62g carbs
    ↓ One-tap to add to meal log
```

---

## 📊 Project Structure

```
nutrisense/
├── 📄 README.md
├── 📄 PRD.md
├── 📄 ARCHITECTURE.md
├── 📄 STITCH_DESIGN.md
├── 📄 AI_INTEGRATION.md
├── 📄 USER_FLOWS.md
├── 📄 DEPLOYMENT.md
├── 🐳 Dockerfile
├── 📄 cloudbuild.yaml
├── 📄 .env.example
├── 📁 frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   └── utils/
│   └── package.json
└── 📁 backend/
    ├── src/
    │   ├── routes/
    │   ├── services/
    │   └── middleware/
    └── package.json
```

---

## 🏆 Hackathon Context

**Event:** AMD Slingshot — Human Imagination Built with AI  
**Problem Statement:** Smart solution for better food choices and healthy eating habits  
**Key Technologies:**
- ✅ Claude AI (Anthropic) — Intelligent nutrition advisor
- ✅ Google Stitch — Design system and component generation
- ✅ Google Cloud Run — Scalable serverless deployment
- ✅ React + TypeScript — Modern, type-safe frontend

---

## 👥 Team

Built with ❤️ for AMD Slingshot Hackathon

---

## 📜 License

MIT License — See LICENSE for details

---

*NutriSense — Eat Smarter. Live Better. Powered by AI.* 🥗
