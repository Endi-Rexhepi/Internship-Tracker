# Internship Tracker

A full-stack app I built to manage my own internship applications. I got tired of maintaining a messy spreadsheet and wanted something with a better workflow, so I built this instead.

The main draw is the Kanban board — you can drag applications between stages (Applied, Interview, Offer, Rejected) and everything syncs to the database instantly. Each user has their own private data behind JWT auth.

## Live Demo

**Frontend:** [internship-tracker-gray.vercel.app](https://internship-tracker-gray.vercel.app)  
**Backend API:** Hosted on Render  
**Database:** MongoDB Atlas

> **Note:** The backend may take a minute or two to respond on the first request — Render spins it down when inactive. Just give it a moment.

## Features

- Register / Login / Logout with JWT authentication
- Add, edit, and delete applications
- Drag and drop Kanban board for tracking stages
- Dashboard with live counts per status
- Filter the list view by status
- Each application stores company, role, job link, date applied, and notes

## Tech Stack

**Frontend**
- React 18 + Vite
- Bootstrap 5
- Axios
- @dnd-kit/core for drag and drop

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken)
- bcrypt for password hashing
- helmet for security headers
- express-rate-limit on auth routes

## Running Locally

You'll need Node.js and a MongoDB instance (local or Atlas).

**1. Clone the repo**

```bash
git clone https://github.com/Endi-Rexhepi/Internship-Tracker.git
cd Internship-Tracker
```

**2. Set up the backend**

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and a JWT secret
npm install
npm run dev
```

**3. Set up the frontend**

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Or from the project root, run both at once:

```bash
npm install
npm run dev
```

The app will be at `http://localhost:5173` and the API at `http://localhost:8000`.

## API Routes

**Auth**
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — login, returns JWT

**Applications** (all protected, require Bearer token)
- `GET /api/applications` — get all for logged-in user (supports `?status=` filter)
- `POST /api/applications` — create new application
- `GET /api/applications/:id` — get one by ID
- `PUT /api/applications/:id` — update (status, notes, etc.)
- `DELETE /api/applications/:id` — delete

## Project Structure

```
internship-tracker/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── api.js
│   └── vite.config.js
├── server/          # Express + MongoDB backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env.example
│   └── server.js
└── package.json     # Root — run both with concurrently
```
