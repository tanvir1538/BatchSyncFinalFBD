# BatchSync — University Academic Coordination & Management System

**BatchSync** is a unified, real-time university academic operating system connecting university administration, faculties, departments, batches, teachers, CRs, and students.

---

## 🛠️ Technology Stack

The active implementation uses:

- **Frontend**: React 19 + Vite 6 + Tailwind CSS (Pure JavaScript & JSX)
- **Backend**: Node.js + Express.js REST API (`backend/src/server.js`)
- **Database**: MySQL Database (`batchsync_db` on port `3306` with connection pooling)
- **Architecture**: Modular MVC REST Architecture with centralized error handling & CORS

---

## 🚀 Key Features & Included Workflows

1. **Public Faculty Catalog & Landing Portal**:
   - University overview, active collegiate faculties, statistics, and quick navigation.

2. **Faculty Management & Provisioning (Admin Portal)**:
   - Dynamic schema dependency binding: provision new faculties and departments with immediate downstream auto-propagation across all portals without redeployment.

3. **Deanery Portal (Scoped Access)**:
   - Faculty-isolated academic boards, departmental breakdown, master timetable, and Dean clearance workflows.

4. **Teacher Central (Class & Attendance Hub)**:
   - Live routine schedule, QR/biometric attendance counter, room swap requests, assignment creation, and course resource vault.

5. **CR Coordination Hub (Batch Operations)**:
   - Batch routine overrides, Telegram bot sync, active democratic voting ballots/polls, member verification queue, and batch treasury accounting.

6. **Student Notes & Academic Vault**:
   - Peer-reviewed **Topper's Class Notes Vault** with direct PDF download and private personal note draft repository.

---

## 💻 How to Run Locally

### 1. Prerequisites
- **Node.js** (v18 or newer)
- **MySQL Server** (via XAMPP, WAMP, or standalone MySQL on port `3306`)

### 2. Database Setup
Create database and import initial data in MySQL:
- Schema: [`database/schema.sql`](database/schema.sql)
- Seed Data: [`database/seed.sql`](database/seed.sql)

### 3. One-Click Startup
Run the unified startup launcher from the root folder:
```cmd
start-all.cmd
```
*(Or via PowerShell: `.\start-all.cmd` or `npm start`)*

This will automatically:
- Launch Express Backend on **http://127.0.0.1:5080**
- Launch Vite React Frontend on **http://localhost:5173**
- Automatically open the application in your web browser.

### 4. Stop Services
To stop both backend and frontend servers:
```cmd
stop-all.cmd
```

---

## 📂 Project Structure

```text
BatchX/
├── frontend/             # React 19 + Vite + Tailwind CSS (Pure JSX)
│   ├── src/
│   │   ├── components/   # Navbar.jsx, Sidebar.jsx
│   │   ├── views/        # Admin, Dean, Teacher, CR, Student, Landing
│   │   ├── services/     # api.js (REST API Client)
│   │   └── App.jsx       # Root Component
│   └── vite.config.js
│
├── backend/              # Node.js + Express.js API
│   ├── src/
│   │   ├── config/       # db.js (MySQL Pool), initDb.js
│   │   ├── controllers/  # CRUD Business Logic
│   │   ├── routes/       # Express Route Handlers (/api/v1/...)
│   │   ├── app.js
│   │   └── server.js     # Entry point (Port 5080)
│   └── package.json
│
├── database/             # Database DDL & Seed Data
│   ├── schema.sql
│   └── seed.sql
│
├── start-all.cmd         # One-click start script
└── stop-all.cmd          # One-click stop script
```
