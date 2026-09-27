# BatchSync — Technical Architecture & Implementation Guide

## 1. Executive Summary

**BatchSync** is a unified University Academic Coordination & Management Operating System built on a modern, robust JavaScript stack:

- **Frontend**: React 19 + Vite 6 + Tailwind CSS + Pure JSX/JS (`frontend/src/`)
- **Backend API**: Node.js + Express.js (`backend/src/server.js`) on port `5080`
- **Database**: MySQL (`batchsync_db`) on port `3306` with connection pooling via `mysql2/promise`
- **Security & Tokens**: JWT (JSON Web Tokens) with Bearer scheme & bcrypt password hashing
- **Real-Time Integration**: Dynamic auto-propagation for faculties, batches, routine schedules, and Telegram webhook syncing.

---

## 2. Directory Structure & Key Files

```text
BatchX/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              <-- MySQL connection pool & health checks
│   │   │   └── initDb.js          <-- Auto-initialization for tables & seed data
│   │   ├── controllers/
│   │   │   ├── faculties.controller.js
│   │   │   ├── schedules.controller.js
│   │   │   ├── clearances.controller.js
│   │   │   ├── memberships.controller.js
│   │   │   ├── notes.controller.js
│   │   │   ├── polls.controller.js
│   │   │   ├── funds.controller.js
│   │   │   ├── notices.controller.js
│   │   │   ├── teacher.controller.js
│   │   │   ├── auditLogs.controller.js
│   │   │   └── dashboard.controller.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── notFound.js
│   │   ├── routes/                <-- Express REST routers
│   │   ├── app.js                 <-- Express app configuration & middleware
│   │   └── server.js              <-- Entry point (Port 5080)
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         <-- Top navigation & role switcher
│   │   │   └── Sidebar.jsx        <-- Collapsible portal navigation
│   │   ├── data/
│   │   │   └── mockData.js        <-- Initial fallback dataset
│   │   ├── services/
│   │   │   └── api.js             <-- Pure JS async CRUD API client
│   │   ├── views/
│   │   │   ├── LandingView.jsx
│   │   │   ├── AdminDashboardView.jsx
│   │   │   ├── AdminFacultiesView.jsx
│   │   │   ├── DeanPortalView.jsx
│   │   │   ├── TeacherCentralView.jsx
│   │   │   ├── CrHubView.jsx
│   │   │   └── StudentNotesView.jsx
│   │   ├── App.jsx                <-- Root Component & State Management
│   │   ├── main.jsx               <-- React DOM entry point
│   │   └── index.css              <-- Styling tokens & Tailwind directives
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── database/
│   ├── schema.sql                 <-- Complete relational MySQL database schema
│   └── seed.sql                   <-- Initial university seed data
│
├── start-all.cmd                  <-- One-click startup for Backend + Frontend
├── start-backend.cmd              <-- Starts Express server on port 5080
├── start-frontend.cmd             <-- Starts Vite dev server on port 5173
└── stop-all.cmd                   <-- Gracefully stops all services
```

---

## 3. Database Architecture (MySQL)

Database schema is located in `database/schema.sql` and includes:

1. `faculties` & `departments` (Hierarchical academic structure)
2. `batches` & `batch_memberships` (Student cohort verification queue)
3. `teachers` & `teaching_assignments` (Faculty routine workloads)
4. `courses`, `classrooms`, & `schedules` (Master & live academic routine matrix)
5. `class_notes` (Peer-reviewed Topper's Vault vs Private Study Drafts)
6. `democratic_polls` & `poll_options` (CR election & voting ballots)
7. `fund_transactions` (Batch treasury accounting & receipts)
8. `notices` & `pending_clearances` (Deanery approvals & Telegram sync)

---

## 4. API Endpoints

All endpoints are accessible via `/api/...` and `/api/v1/...`:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/health/db` | MySQL connection status |
| `GET/POST` | `/api/faculties` | List or create faculties |
| `PUT/DELETE`| `/api/faculties/:id` | Update or delete faculty |
| `GET` | `/api/schedules` | Get routine timetable (supports `batch`, `teacher`, `status` filters) |
| `GET/POST` | `/api/notes` | List Topper notes or create student draft |
| `POST` | `/api/notes/:id/submit-cr` | Submit note to CR for review |
| `GET/POST` | `/api/polls` | Manage democratic polls |
| `POST` | `/api/polls/:id/vote` | Cast vote on poll |
| `GET/POST` | `/api/funds/transactions` | Batch treasury ledger |
| `POST` | `/api/teacher/attendance` | Record class attendance |

---

## 5. How to Run Locally

1. **Prerequisites**: Ensure XAMPP or MySQL is running on `127.0.0.1:3306`.
2. **Start All Services**:
   ```cmd
   start-all.cmd
   ```
3. **Open Application**:
   - **Frontend UI**: [http://127.0.0.1:5173](http://127.0.0.1:5173)
   - **Backend API**: [http://127.0.0.1:5080](http://127.0.0.1:5080)
4. **Stop Services**:
   ```cmd
   stop-all.cmd
   ```
