# 🎵 Tap Tempo & BPM Toolkit

<div align="center">

**The most accurate tap tempo & BPM toolkit for musicians, producers, and DJs.**  
Tap any rhythm, calculate BPM instantly — right in your browser.

[![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

</div>

---

## ✨ Features

### 🔧 Tools

| # | Tool | Description |
|---|------|-------------|
| 1 | **Tap Tempo** | 🖱️ Tap any rhythm (click, spacebar, or keyboard) — weighted rolling average over last 8 taps with automatic outlier rejection. BPM displayed in real-time with an interactive graph |
| 2 | **Metronome** | 🥁 Precision audio-engine metronome built with Web Audio API. Accented beats, adjustable BPM & volume. Perfect for practice |
| 3 | **BPM Calculator** | 🧮 Calculate BPM from a given duration, or figure out how long a specific number of bars will last at your tempo |
| 4 | **BPM to ms Converter** | ⏱️ Convert any BPM value to exact millisecond values for quarter, eighth, sixteenth notes & dotted/triplet subdivisions |
| 5 | **Delay Time Calculator** | ⏳ Get precise millisecond delay times synced to your track's tempo — quarter, dotted, triplet, and more |
| 6 | **Tempo Markings** | 📖 A dictionary of classical Italian tempo terms (Largo, Andante, Allegro, Presto…) with their BPM ranges |
| 7 | **Beats Per Bar Calculator** | 📐 Interactive tool for time signatures — see how different meters (4/4, 3/4, 6/8, etc.) divide the bar |

### 📝 Blog

Educational articles covering:
- How to find the BPM of any song
- Best BPM for house music
- Understanding time signatures
- Metronome training exercises
- Delay time calculator guide
- BPM vs tempo explained
- And more…

### 🎯 Key Highlights

- ⚡ **Real-time BPM detection** — see results instantly as you tap
- 📊 **Live graph** — visualize each tap's BPM with variance indicators
- 🎹 **Multiple input methods** — click, spacebar, or any keyboard key
- 🔇 **Sleep detection** — auto-dims when idle, wakes on interaction
- 🔊 **Audio feedback** — kick, clap, hi-hat, or cowbell sounds on each tap
- 🌗 **Dark/light theme** — automatic or manual theme switching
- 📋 **Copy & history** — one-click copy BPM, session history drawer
- 📱 **Fully responsive** — works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 7](https://vite.dev) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **Components** | [shadcn/ui](https://ui.shadcn.com) (built on [Radix UI](https://www.radix-ui.com/)) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Routing** | [wouter](https://github.com/molefrog/wouter) — lightweight React router |
| **Audio** | Web Audio API (custom `AudioEngine` singleton) |
| **State** | [TanStack React Query](https://tanstack.com/query/latest) |
| **Forms** | React Hook Form + Zod |
| **Package Manager** | [pnpm](https://pnpm.io) (workspace monorepo) |

---

## 📂 Project Structure

```
tap-tempo-project/
│
├── 📁 artifacts/
│   └── 📁 taptempo/                    # Main application
│       ├── 📁 src/
│       │   ├── 📁 components/
│       │   │   └── 📁 ui/              # shadcn/ui components (50+ atomic components)
│       │   ├── 📁 hooks/
│       │   │   ├── use-tap-tempo.ts    # Core tap detection algorithm
│       │   │   ├── use-audio-engine.ts # Web Audio API wrapper
│       │   │   ├── use-sleep-detect.ts # Idle/sleep detection
│       │   │   ├── use-mobile.tsx      # Responsive detection
│       │   │   └── use-toast.ts        # Toast notifications
│       │   ├── 📁 lib/
│       │   │   ├── audio-engine.ts     # AudioEngine singleton (kick/clap/hihat/cowbell/metronome)
│       │   │   ├── utils.ts            # Utility functions
│       │   │   ├── theme-provider.tsx  # Dark/light theme provider
│       │   │   └── 📁 content/
│       │   │       ├── bpmDescriptions.ts
│       │   │       ├── tempoMarkings.ts
│       │   │       ├── timeSignatures.ts
│       │   │       └── genres.ts
│       │   ├── 📁 pages/
│       │   │   ├── home.tsx                  # Landing page
│       │   │   ├── tap-tempo.tsx             # 🖱️ Tap Tempo (core tool)
│       │   │   ├── metronome.tsx             # 🥁 Metronome
│       │   │   ├── bpm-calculator.tsx        # 🧮 BPM Calculator
│       │   │   ├── bpm-to-ms.tsx             # ⏱️ BPM to ms Converter
│       │   │   ├── delay-time-calculator.tsx # ⏳ Delay Time Calculator
│       │   │   ├── tempo-markings.tsx        # 📖 Tempo Markings Dictionary
│       │   │   ├── beats-per-bar-calculator.tsx # 📐 Beats Per Bar
│       │   │   ├── blog.tsx                  # 📝 Blog listing
│       │   │   ├── blog-post.tsx             # Blog article
│       │   │   └── not-found.tsx             # 404 page
│       │   ├── App.tsx              # Root app with routing
│       │   ├── main.tsx             # Entry point
│       │   └── index.css            # Global styles
│       │
│       ├── 📁 public/
│       │   ├── favicon.svg
│       │   ├── robots.txt
│       │   └── opengraph.jpg
│       │
│       ├── index.html
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── vercel.json              # Vercel deployment configuration
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # pnpm workspace definition
├── tsconfig.base.json       # Shared TypeScript config
└── .gitignore
```

---

## 🚀 How the Tap Tempo Algorithm Works

The tap tempo engine in `use-tap-tempo.ts` uses a **weighted rolling average** with **outlier rejection**:

1. 🎯 Records timestamps of each tap (up to last 8)
2. 📏 Calculates intervals between consecutive taps
3. 🚫 **Outlier rejection**: Discards intervals more than 2.5× the simple mean (eliminates accidental double-taps or pauses)
4. ⚖️ **Weighted average**: More recent taps are weighted more heavily (linear weighting: `w = index + 1`)
5. 🔄 **Auto-reset**: If no tap for 3 seconds, the buffer clears automatically
6. 📊 BPM = `60000 / averageInterval` (rounded to nearest integer)

---

## 🏗️ Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/installation) (v9+)

### Setup

```bash
# Clone the repository
git clone https://github.com/quonainejaz-official/tap-tempo-project.git
cd tap-tempo-project

# Install all dependencies (workspace-aware)
pnpm install

# Start the development server
cd artifacts/taptempo
pnpm run dev
```

The dev server will start at `http://localhost:3000` (or the port specified in your `PORT` env variable).

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start Vite dev server with HMR |
| `pnpm run build` | Production build → `dist/` |
| `pnpm run serve` | Preview the production build |
| `pnpm run typecheck` | Run TypeScript type checking |

---

## ☁️ Deploy to Vercel

### Option 1: Auto-deploy from GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import the GitHub repo: `quonainejaz-official/tap-tempo-project`
4. Configure the following settings (or Vercel will auto-detect from `vercel.json`):

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Other` (ya blank — Vite auto-detect se bachne ke liye) |
| **Build Command** | `pnpm run build` |
| **Output Directory** | `artifacts/taptempo/dist` |
| **Install Command** | `pnpm install` |

5. Click **Deploy** ✅

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy from the project root
vercel --prod
```

> The `vercel.json` file in the repo root already has all the correct settings pre-configured.

### Environment Variables (Optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Dev server port |
| `BASE_PATH` | `/` | Base URL path for the app |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/quonainejaz-official/tap-tempo-project/issues).

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/quonainejaz-official">Quonain Ejaz</a>
</div>
