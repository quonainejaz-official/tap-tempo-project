# Tap Tempo & BPM Toolkit

A full-stack BPM toolkit for musicians, producers, and DJs — built with **Next.js 15**, **MongoDB**, and **Tailwind CSS 4**.

**Live:** [tap-tempo.vercel.app](https://tap-tempo.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.9](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) |
| **UI** | [shadcn/ui](https://ui.shadcn.com) (Radix UI primitives) |
| **Database** | [MongoDB Atlas](https://mongodb.com) (M0 free tier) |
| **Images** | [Cloudinary](https://cloudinary.com) (free tier) |
| **Rich Editor** | [TipTap](https://tiptap.dev) |
| **Animation** | [Framer Motion](https://framer.com/motion) |
| **Hosting** | [Vercel](https://vercel.com) |

---

## Tools

- **Tap Tempo** — Tap any rhythm with weighted rolling average + outlier rejection
- **Metronome** — Precision Web Audio API metronome with accented beats
- **BPM Calculator** — Calculate BPM from duration or bar length
- **BPM to ms Converter** — Exact ms values for all note subdivisions
- **Delay Time Calculator** — Synced delay times for any tempo
- **Tempo Markings** — Italian tempo terms with BPM ranges
- **Beats Per Bar Calculator** — Interactive time signature explorer

---

## Project Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── tap-tempo/          # Tap Tempo tool
│   │   ├── metronome/          # Metronome tool
│   │   ├── bpm-calculator/     # BPM Calculator tool
│   │   ├── bpm-to-ms/          # BPM to ms converter
│   │   ├── delay-time-calculator/
│   │   ├── tempo-markings/     # Tempo dictionary
│   │   ├── beats-per-bar-calculator/
│   │   ├── blog/               # Blog listing + articles
│   │   ├── [slug]/             # Custom pages from admin
│   │   ├── admin/              # Admin dashboard
│   │   │   ├── login/          # Admin login
│   │   │   ├── blogs/          # Blog CRUD
│   │   │   ├── pages/          # Custom page CRUD
│   │   │   └── page.tsx        # Dashboard
│   │   ├── api/                # REST API routes
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   └── robots.ts           # Robots config
│   ├── components/             # UI components
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, models, engine
│   └── models/                 # MongoDB models
├── public/                     # Static assets
├── scripts/                    # Seed scripts
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Local Development

### Prerequisites
- Node.js 18+
- pnpm 9+

### Setup

```bash
git clone https://github.com/quonainejaz-official/tap-tempo-project.git
cd tap-tempo-project

# Install dependencies
pnpm install

# Copy environment variables
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your MongoDB URI and Cloudinary credentials

# Seed admin user (first time only)
cd apps/web
pnpm exec tsx scripts/seed-admin.ts

# Start dev server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Start Next.js dev server |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run typecheck` | TypeScript type check |

---

## Admin Panel

Visit `/admin/login` and sign in with:

- **Email:** `Taptempous@gmail.com`
- **Password:** `Ppuyyu@77`

From the dashboard you can:
- Create/edit/delete blog posts with TipTap rich editor
- Create/edit/delete custom pages (auto-routed at `/[slug]`)
- Upload images to Cloudinary

---

## Deployment

Push to GitHub → Import in Vercel → Set environment variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas SRV connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `JWT_SECRET` | JWT signing secret |
| `NEXT_PUBLIC_SITE_URL` | Production URL |

Vercel auto-detects `apps/web` as root directory via `vercel.json`.

---

## License

MIT
