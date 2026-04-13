# Progress & Changelog

Keeping track of what I've worked on and fixed as this project evolved.

---

## Deployment

The app is fully deployed and live:

- **Frontend** — Vercel (auto-deploys on every push to `main`)
- **Backend** — Render (auto-deploys on every push to `main`)
- **Database** — MongoDB Atlas

No manual setup needed to use the app — just visit the live URL.

---

## Round 2 — Full Cleanup & Polish

Went back through the whole codebase and fixed a bunch of things I either missed the first time or just left as "good enough."

### Bugs Fixed

**Register was completely broken**
The Register.jsx file was accidentally a copy of Login.jsx — like, byte for byte identical. So clicking Register just hit the login endpoint and showed "Login failed." Rewrote it properly with name, email, password, confirm password fields and it now hits `/api/auth/register`. Also added a loading state so the button doesn't just sit there after you click it.

**Duplicate card headers everywhere**
ApplicationForm and ApplicationList were both rendering their own card/header wrapper, but App.jsx was already wrapping them with a header too. Every section had the label shown twice with two different card styles nested inside each other. Removed the redundant wrappers from the components.

**getOne had no ownership check**
Every other route filtered by `userId` but `getOne` just did `findById(id)` with no ownership check. Meaning any logged-in user could read another user's application if they guessed the ID. Fixed it to `findOne({ _id, userId })` to match how the other routes work.

**Raw Mongoose errors were going straight to the client**
The create/update/delete handlers were sending `res.json(err)` directly, which leaked schema internals and sometimes stack traces. Replaced with clean `{ message: "..." }` responses.

### Security

**Removed .env from git**
Had the .env file committed by accident with the JWT secret in it. Ran `git rm --cached server/.env` and added it to .gitignore. Added a .env.example with placeholder values so anyone cloning knows what to fill in.

**Locked down CORS**
Was using `cors()` with no config, which allows any origin. Now it only allows `CLIENT_URL` from the environment (defaults to `http://localhost:5173`).

**Added Helmet**
Installed `helmet` and added it to the Express app. It sets a bunch of security headers automatically.

**Added rate limiting on auth routes**
Installed `express-rate-limit` and applied it to `/api/auth/*`. Limits to 20 requests per 15 minutes per IP, which should cut down on brute force attempts on login.

### New Features

**Edit applications**
Previously the only thing you could change was the status dropdown. Now there's an Edit button on each application in the list view that expands an inline form to edit the company name, role, link, date applied, and notes.

**Date applied picker**
The model already had a `dateApplied` field but the form wasn't exposing it — it just defaulted to right now. Added a date input that defaults to today but lets you set it to when you actually applied.

**Success notifications**
Added a green success alert that shows briefly after adding or editing an application, then fades away after 3 seconds.

### Code Quality

**Removed pointless handleMove wrapper**
There was a `handleMove` function in App.jsx that just called `handleUpdateStatus`. No reason for it to exist. Removed it and passed `handleUpdateStatus` directly.

**Fixed the log message in mongoose.config**
It said "Connected to MongoDB Atlas" even when connecting to a local instance. Changed to just "Connected to MongoDB."

**Fixed page title**
index.html still had `<title>client</title>` from the Vite template. Changed to "Internship Tracker."

**Added custom favicon**
Was still using the Vite logo. Made a simple SVG favicon with the "IT" initials to match the logo in the app header.

**Deleted dead index.css**
The default Vite index.css was still in the project with dark-mode overrides that conflicted with the light theme in App.css. It wasn't even imported anywhere, just sitting there as noise.

**Fixed `type="url"` and `type="email"` on inputs**
Job link inputs were plain text — changed to `type="url"` so the browser validates the format. Email inputs in Login/Register were also plain text, changed to `type="email"`.

**Added explicit value attrs to select options**
The status select options in ApplicationForm had no `value` prop. Browsers use text content as a fallback so it worked, but it's not correct. Added explicit values.

### Developer Experience

**Added Vite proxy for API calls**
The api.js baseURL was hardcoded to `http://localhost:8000`. Now it defaults to an empty string and Vite proxies `/api` requests to the backend in development. Makes it easier to deploy and removes the hardcoded localhost.

**Root package.json with concurrently**
Added a root-level package.json so you can run `npm run dev` from the project root and it starts both the client and server at the same time instead of needing two terminals.

**Added .env.example**
Committed a .env.example to the server folder so anyone cloning the repo knows what environment variables to set up.

---

## Round 1 — Initial Build

Built the core app from scratch:

- JWT-based register/login/logout flow
- Full CRUD for internship applications
- Kanban board with drag and drop (@dnd-kit)
- Dashboard showing application counts by status
- Status filter for the list view
- Each application scoped to the logged-in user
