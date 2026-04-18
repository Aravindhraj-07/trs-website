# The Robotic Society - TRS Website 🚀🤖


## 🎯 Overview

**The Robotic Society (TRS)** is a student innovation club at **Sathyabama University, Chennai**, focused on robotics, AI/ML, cybersecurity, design, and engineering. This is the **production-ready single-page application (SPA)** website built with **React 19 + Vite**.

### Key Features
- **Animated Hero** with particle canvas, loading sequence, robot SVG, orbs, and circuit background.
- **7 Specialized Teams**: Technical (Web/AI/Cyber), Design, Management, Logistics, Media, Marketing, Photography—complete with leads, domains, bios.
- **Interactive Chatbot (ARIA)**: AI assistant for joining, events, teams—powered by rule-based responses with quick replies.
- **Events Calendar**: Current (Hackathon 3.0, CTF CyberBlitz) + Future 2026 (National Robotics Summit).
- **Join Overlay**: Multi-step membership form (name, team, domain, experience).
- **Selection Process**: 5-step visualization (application → interview → task → onboarding).
- **Quiz/Trivia**: Interactive TRS knowledge test.
- **Idea Submission**: Form for project proposals.
- **Dark/Light Theme Toggle**, scroll progress, back-to-top, responsive mobile nav.
- **Advanced Animations**: CSS keyframes, IntersectionObserver reveals, particle systems, typing indicators.
- **Deployment-Ready**: Vercel config (`npm run build` → `dist/`).

**Live Demo**: [Deployed on Vercel](https://theroboticsociecty2026.vercel.app/) (or run locally).

![Hero Preview](https://via.placeholder.com/1200x600/020408/00D4FF?text=TRS+Hero+Section+%F0%9F%A4%96)
![Teams Grid](https://via.placeholder.com/1200x400/020408/00FF88?text=7+Teams+-+Technical+Design+Management+etc.)

## 🚀 Quick Start

```bash
# Clone & Navigate
git clone <your-repo-url>
cd "c:/trs projects/trs-website"
cd trs-project  # Source in subdir

# Install Dependencies
npm install

# Development Server (localhost:5173)
npm run dev

# Build for Production
npm run build   # Outputs to ./dist/

# Preview Build
npm run preview
```

**Scripts Explained**:
| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server (HMR, hot reload) |
| `npm run build` | Production build (`dist/`) |
| `npm run lint` | ESLint checks (React hooks, refresh) |
| `npm run preview` | Local production preview |

## 📁 Project Structure

```
trs-website/
├── README.md                 # This file
├── trs-project/              # App source
│   ├── index.html            # Entry point (React root)
│   ├── package.json          # React 19 + Vite 8 deps
│   ├── vite.config.js        # React plugin config
│   ├── vercel.json           # Build: npm install && npm run build
│   ├── src/
│   │   ├── App.jsx           # Main app (imports team.jsx)
│   │   ├── main.jsx          # ReactDOM.render
│   │   ├── index.css         # 1000+ lines: themes, keyframes, responsive
│   │   └── components/
│   │       └── team.jsx      # Exports team data (TEAMS, EVENTS_DATA)
│   └── dist/                 # Build output
└── node_modules/             # Installed deps
```

## 🛠 Tech Stack

| Category | Tech |
|----------|------|
| **Framework** | React 19 (hooks: useState, useEffect, useRef, useCallback) |
| **Build Tool** | Vite 8 (@vitejs/plugin-react) |
| **Styling** | Vanilla CSS (CSS vars, keyframes, grid/flex, backdrop-filter) |
| **Linting** | ESLint 9 (react-hooks, react-refresh) |
| **Deployment** | Vercel (auto-deploys from `vercel.json`) |
| **Fonts** | Orbitron (display), Inter (body), JetBrains Mono (mono) |
| **Animations** | CSS-only + Canvas particles + IntersectionObserver |

**No external UI libs**—pure React/CSS for 60fps performance.


## 🔧 Development Guidelines

### Theme Toggle
- Toggle via nav button → `data-theme="light/dark"`.
- CSS vars handle colors (`--cyan: #00D4FF`, etc.).

### Custom Hooks
- `useScrollReveal()`: Animate `.reveal` elements.
- `useCounter()`: Animated counters (achievements).
- `useParticles()`: Hero canvas particles.

### Key Components
- **Chatbot**: Rule-based (greets, join Q&A) with typing animation.
- **Loader**: 100% animated hex + progress + boot steps.
- **JoinOverlay**: Form → success state.
- **Teams Grid**: Hover effects, LinkedIn links.

### Run Linting
```bash
npm run lint
```

## 📱 Responsive & Performance
- **Mobile-First**: Hamburger nav, touch-friendly.
- **Scroll Animations**: Smooth reveals, progress bar.
- **Lightweight**: ~150KB gzipped, no heavy deps.

## 🤝 Contributing

1. Fork → Clone → `npm install`.
2. Create branch: `git checkout -b feature/cool-thing`.
3. Commit → PR to `main`.
4. Follow ESLint + semantic commits.

**Good First Issues**: Add more quiz questions, new animations, team member cards.


---

**Built with ❤️ by Aravindhraj M .** 

