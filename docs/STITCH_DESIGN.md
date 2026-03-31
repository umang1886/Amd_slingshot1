# 🎨 NutriSense — Stitch Design System Guide

> Google Stitch is used to generate the design foundation, component library, and design tokens for NutriSense.

---

## 1. What is Google Stitch?

Google Stitch is an AI-powered design tool that converts natural language design descriptions into:
- **React components** with Tailwind CSS
- **Design tokens** (colors, typography, spacing)
- **Responsive layouts** ready for production

NutriSense uses Stitch to ensure design consistency and accelerate the frontend build.

---

## 2. Design Tokens (Stitch Export)

### 2.1 Color Palette

```css
/* stitch-tokens.css */
:root {
  /* Brand Colors */
  --color-primary: #22C55E;        /* Green — health, growth */
  --color-primary-dark: #16A34A;   /* Darker green for hover */
  --color-primary-light: #86EFAC;  /* Light green for accents */

  --color-accent: #F97316;         /* Orange — energy, warmth */
  --color-accent-dark: #EA580C;    /* Darker orange */
  --color-accent-light: #FED7AA;   /* Light orange */

  /* Backgrounds */
  --color-bg-primary: #0F172A;     /* Deep navy — main background */
  --color-bg-surface: #1E293B;     /* Slate — cards, panels */
  --color-bg-elevated: #334155;    /* Elevated surfaces */

  /* Text */
  --color-text-primary: #F1F5F9;   /* Near-white */
  --color-text-secondary: #94A3B8; /* Muted text */
  --color-text-tertiary: #64748B;  /* Placeholder text */

  /* Semantic */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Glassmorphism */
  --glass-bg: rgba(30, 41, 59, 0.7);
  --glass-border: rgba(148, 163, 184, 0.1);
  --glass-blur: blur(12px);
}
```

### 2.2 Typography

```css
/* Import in index.html */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

:root {
  --font-display: 'Sora', sans-serif;   /* Headings, brand elements */
  --font-body: 'DM Sans', sans-serif;   /* Body text, UI labels */

  /* Scale */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
}
```

### 2.3 Spacing & Radius

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
}
```

---

## 3. Stitch Component Prompts

Use these prompts in Google Stitch to generate each component:

### 3.1 Macro Progress Ring

```
Stitch Prompt:
"Create a circular progress ring component for tracking macros.
Dark background (#0F172A). Three rings: Calories (green #22C55E),
Protein (orange #F97316), Carbs (blue #3B82F6). Center shows
total calories eaten vs goal. Each ring has label and percentage.
Glassmorphism card container. Font: Sora. Animated fill on load."
```

### 3.2 AI Chat Interface

```
Stitch Prompt:
"Design a chat interface for AI nutrition advisor. Dark theme
(#1E293B background). AI messages on left with green avatar
bubble, user messages on right in #22C55E. Typing indicator
with 3 animated dots. Bottom input bar with send button.
Quick prompt chips above input. Sora font. Mobile-first layout."
```

### 3.3 Meal Log Card

```
Stitch Prompt:
"Create a meal entry card with glassmorphism effect. Dark card
on #0F172A background. Shows meal name, time logged, macro
pills (C/P/F/Cal). Swipe-to-delete gesture indicator. Green
checkmark icon. DM Sans font for details, Sora for meal name.
Subtle border with rgba(255,255,255,0.05)."
```

### 3.4 Onboarding Steps

```
Stitch Prompt:
"Multi-step onboarding form for health app. Dark theme. Step
indicator at top (3 dots, active = green #22C55E). Large
bold question headline in Sora. Answer options as selectable
pill buttons - inactive: dark slate, active: green gradient.
Animated transition between steps. Next button full-width green."
```

### 3.5 Dashboard Header

```
Stitch Prompt:
"App header for nutrition dashboard. Dark navy background.
Left: greeting 'Good morning, Priya 👋' in Sora bold white.
Right: streak counter with fire emoji and orange number.
Below: horizontal scroll chips for quick date navigation.
Subtle gradient bottom border. Glass effect on scroll."
```

---

## 4. Tailwind Config (from Stitch tokens)

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E',
          dark: '#16A34A',
          light: '#86EFAC',
        },
        accent: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          light: '#FED7AA',
        },
        surface: {
          DEFAULT: '#1E293B',
          elevated: '#334155',
        },
        background: '#0F172A',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      backdropBlur: {
        glass: '12px',
      },
      animation: {
        'ring-fill': 'ringFill 1.5s ease-out forwards',
        'fade-up': 'fadeUp 0.4s ease-out forwards',
        'pulse-dot': 'pulseDot 1.4s infinite',
      },
      keyframes: {
        ringFill: {
          from: { strokeDashoffset: '283' },
          to: { strokeDashoffset: 'var(--target-offset)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## 5. Stitch-Generated Screens Overview

| Screen | Stitch Template | Status |
|--------|----------------|--------|
| Onboarding Flow | Multi-step form template | ✅ Use |
| Dashboard | Health dashboard template | ✅ Use |
| AI Chat | Messaging interface template | ✅ Use |
| Meal Logger | Food log list template | ✅ Use |
| Food Search | Search results template | ✅ Use |
| Profile | Settings form template | ✅ Use |

---

## 6. Responsive Breakpoints

```css
/* Mobile-first approach */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
```

**Mobile** = Bottom navigation bar  
**Desktop** = Left sidebar navigation

---

## 7. Motion & Animation Principles

1. **Entrance animations**: `fadeUp` on page load, staggered by 50ms
2. **Progress rings**: Animate from 0 to actual value on mount
3. **AI typing**: 3-dot pulse animation while loading
4. **Page transitions**: Slide left/right between routes
5. **Micro-interactions**: Scale 0.97 on button press

---

*Stitch design assets should be exported to `/src/design-tokens/` and imported in `tailwind.config.js`.*
