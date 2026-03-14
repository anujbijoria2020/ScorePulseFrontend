# ScorePulse — Frontend

> Real-time sports scores and live play-by-play commentary dashboard built with React, TypeScript, and WebSockets.

---

## Features

- 🔴 **Live match scores** across football, cricket, and basketball
- 📡 **WebSocket-powered commentary feed** — updates instantly without page refresh
- 🎯 **Match watching mode** — select any match to pull up its live commentary panel inline
- 🔐 **Role-based access** via Clerk — admins can create matches and add commentary, viewers get read-only access
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ⚡ **Optimistic UI** with TanStack Query — fast, cache-aware data fetching

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS |
| Data fetching | TanStack Query (React Query) |
| Real-time | WebSockets (native) |
| Auth | Clerk |
| Routing | React Router v6 |
| Notifications | React Hot Toast |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Sticky yellow navbar with auth state
│   ├── Layout.tsx           # Two-column page shell
│   ├── MatchCard.tsx        # Score card with watch/close controls
│   ├── CommentaryItem.tsx   # Single commentary event row
│   ├── AddCommentaryForm.tsx # Admin-only commentary form
│   ├── StatusBadge.tsx      # Live / Scheduled / Finished badge
│   └── SkeletonCard.tsx     # Loading placeholder
├── pages/
│   ├── MatchListPage.tsx    # Home — match grid + inline commentary panel
│   ├── MatchDetailPage.tsx  # Standalone match + commentary view
│   └── CreateMatchPage.tsx  # Admin-only match creation form
├── lib/
│   ├── api.ts               # All REST API calls
│   └── useMatchSocket.ts    # WebSocket hook for live updates
└── main.tsx                 # App entry — ClerkProvider + Router
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [ScorePulse backend](https://github.com/your-username/scorepulse-backend)
- A [Clerk](https://clerk.com) account for auth

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/scorepulse-frontend.git
cd scorepulse-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxx
```

> Never commit your `.env` file. It is already listed in `.gitignore`.

### Run in Development

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Authentication & Roles

ScorePulse uses [Clerk](https://clerk.com) for authentication.

| Role | Permissions |
|---|---|
| **Viewer** (default) | Browse matches, read live commentary |
| **Admin** | Everything above + create matches, add commentary |

To grant admin access, go to your **Clerk Dashboard → Users → Edit user → Public Metadata** and set:

```json
{ "role": "admin" }
```

---

## API & WebSocket

The frontend connects to the ScorePulse backend REST API and WebSocket server.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/matches` | Fetch all matches |
| POST | `/api/matches` | Create a match (admin) |
| GET | `/api/matches/:id/commentary` | Fetch commentary for a match |
| POST | `/api/matches/:id/commentary` | Add commentary (admin) |
| WS | `/ws` | Live commentary and score updates |

---

## Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler check
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

MIT © [Anuj kurmi](https://github.com/anujbijoria2020)
