# Internship Application Tracker (Full-Stack)

A full-stack web application that helps users manage and track internship/job applications using a dashboard, list view, and a Kanban board workflow.

## Features
- **User Authentication (JWT)**
  - Register / Login / Logout
  - Secure API access using JWT tokens
- **Application Management (CRUD)**
  - Create, view, update, and delete applications
  - Each application belongs to the logged-in user (data isolation)
- **Kanban Board**
  - Drag and drop applications between statuses:
    - Applied → Interview → Offer / Rejected
  - Status updates are saved instantly in the database
- **Dashboard Overview**
  - Displays counts of applications per status
- **Filtering**
  - Filter applications by status (Applied, Interview, Offer, Rejected)

## Tech Stack
**Frontend**
- React (Vite)
- Bootstrap 5
- Axios
- @dnd-kit/core (Drag & Drop)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)

## API Routes
### Auth
- `POST /api/auth/register` → Create new user
- `POST /api/auth/login` → Login and receive JWT token

### Applications (Protected)
- `GET /api/applications` → Get all applications for logged-in user
- `POST /api/applications` → Create new application
- `PUT /api/applications/:id` → Update application (status, notes, etc.)
- `DELETE /api/applications/:id` → Delete application

## Run Locally
### 1) Backend Setup
Create a `.env` file inside the `server/` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/internshipTracker
PORT=8000
JWT_SECRET=your_secret_key
