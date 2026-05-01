# Personal Expense Tracker

A modern, responsive expense tracking web app built with **React 19**, **TanStack Start**, **Vite**, **Tailwind CSS v4**, and **shadcn/ui**. Track daily expenses, analyze monthly spending, and manage money you've lent or borrowed — all with a clean, production-grade UI.

> ⚠️ This is a frontend-only build. All data is persisted to `localStorage` via a service layer, so swapping in a real backend (Node.js + MongoDB Atlas, Supabase, etc.) is a one-file change.

---

## ✨ Features

### 🔐 Authentication (mock)

- Signup with username, password, confirm password
- Login with username / password
- Session persisted in `localStorage`
- Auth-guarded routes (auto-redirect to `/login` when logged out)

### 🏠 Dashboard

- Total spent this month
- Number of transactions
- Pending "to receive" / "to pay" totals
- Recent transactions list

### 💸 Expenses

- Add expenses with **date**, **category** (EMI, Investment, Food, Medical, Travel, Other), **amount**, and notes
- Today's expenses table with delete action

### 📊 Monthly Report

- Filter by **category**, **date range**, and **search**
- Bar chart breakdown by category (Recharts)
- Total spent + transaction count for the filtered period

### 🤝 Lending Tracker

- Track money **you will receive** or **you will pay**
- Toggle entries between **Pending** and **Settled**
- Per-person notes and dates

### 🎨 UI / UX

- Fully responsive (mobile → desktop)
- **Dark mode** toggle (persisted)
- Collapsible sidebar navigation
- Semantic design tokens (oklch) defined in `src/styles.css`
- Toast notifications via Sonner

---

## 🧱 Tech Stack

| Layer           | Tech                                          |
| --------------- | --------------------------------------------- |
| Framework       | React 19 + TanStack Start (file-based routes) |
| Build tool      | Vite 7                                        |
| Styling         | Tailwind CSS v4 + shadcn/ui                   |
| Charts          | Recharts                                      |
| Forms           | react-hook-form + zod                         |
| Icons           | lucide-react                                  |
| State / storage | `localStorage` + `useSyncExternalStore`       |
| Language        | TypeScript (strict)                           |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── AppSidebar.tsx        # Collapsible sidebar with nav + theme toggle
│   ├── StatCard.tsx          # Reusable metric card
│   └── ui/                   # shadcn/ui primitives
├── hooks/
│   ├── useStore.ts           # Reactive bindings to the service layer
│   └── use-mobile.tsx
├── routes/
│   ├── __root.tsx            # Root shell (html/head/body)
│   ├── index.tsx             # Redirects to /dashboard or /login
│   ├── login.tsx
│   ├── signup.tsx
│   ├── _app.tsx              # Auth-guarded layout w/ sidebar
│   ├── _app.dashboard.tsx
│   ├── _app.expenses.tsx
│   ├── _app.report.tsx
│   └── _app.lending.tsx
├── services/
│   ├── authService.ts        # Mock auth + theme hook
│   └── expenseService.ts     # Expenses + lending CRUD (swap for API later)
├── lib/utils.ts
└── styles.css                # Design tokens + Tailwind theme
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (or **Bun** ≥ 1.0)

### 1. Install dependencies

```bash
bun install
# or
npm install
```

### 2. Run the dev server

```bash
bun run dev
# or
npm run dev
```

Then open http://localhos-t:5173

### 3. Build for production

```bash
bun run build
```

### 4. Preview the production build

```bash
bun run preview
```

### Other scripts

```bash
bun run lint     # ESLint
bun run format   # Prettier
```

---

## 🔑 Using the App

1. Visit `/` → you'll be redirected to `/login`.
2. Click **Sign up** to create a local account (stored in `localStorage`).
3. After signup/login you'll land on the **Dashboard**.
4. Use the sidebar to navigate to **Expenses**, **Monthly Report**, and **Lending**.
5. Toggle dark mode from the sidebar footer.

To reset all data, clear your browser's `localStorage` for the site (keys are prefixed with `pet:`):

- `pet:users`
- `pet:session`
- `pet:expenses`
- `pet:lending`
- `pet:theme`

---

## 🔌 Connecting a Real Backend

All data operations are isolated inside `src/services/`:

- `authService.ts` → replace `signup`, `login`, `logout`, `getSession` with real API calls (e.g. JWT against `Node.js + MongoDB Atlas`).
- `expenseService.ts` → replace the `read`/`write` helpers with `fetch` calls to your REST endpoints. Keep the exported method signatures identical (`list`, `add`, `remove`, `toggleStatus`, `subscribe`) and **no UI code needs to change**.

Suggested REST shape:

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/expenses
POST   /api/expenses
DELETE /api/expenses/:id
GET    /api/lending
POST   /api/lending
PATCH  /api/lending/:id
DELETE /api/lending/:id
```

---

## 📝 Notes

- Passwords in the mock auth are stored in plain text in `localStorage` — **for demo purposes only**. Never ship this pattern to production.
- The service layer dispatches custom `storage:*` events so multiple components stay in sync without a global store.

---

## 📄 License

MIT — free to use, modify, and distribute.
