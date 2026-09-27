# BatchSync — University Academic Coordination & Management System

BatchSync is a centralized role-based university academic coordination and management platform connecting university administration, faculties, departments, batches, teachers, CRs, and students.

The active implementation uses:

- Frontend: Vite + React 19
- Backend: C# / ASP.NET Core Web API (.NET 10)
- Database: Microsoft SQL Server through Entity Framework Core
- Authentication: ASP.NET Core Identity + JWT bearer tokens

The runnable application is contained in `frontend/` and `backend/`.

## Included workflows

- Student and Dean signup, role-based sign-in, profile completion and photo upload
- Main Admin-approved Dean workspace and Dean-created CR/Teacher accounts
- Faculty-isolated batches and protected student directories
- Student membership requests and CR approval
- Immutable fixed weekly routine plus date-specific routine updates/cancellation
- Automatic Teacher batch/subject assignment when a CR creates a routine
- Dedicated Teacher subject page with slide and assignment publishing, attendance register and percentages
- Student profile with separate attendance and assignment views, file submission/resubmission, and teacher-side submission access
- Date archive, class notes, class completion tracking and teacher totals
- Faculty/batch notices and reminders
- Timed polls with one vote per approved student and controlled result visibility
- CR fund collections with paid/pending student ledgers
- Responsive desktop and mobile UI based on the original BatchSync design

## Requirements

- Node.js 20 or newer
- .NET 10 SDK (a project-local SDK is already available in `.dotnet/` in this workspace)
- SQL Server LocalDB or SQL Server Express

The development connection in `backend/appsettings.json` uses `(localdb)\\MSSQLLocalDB`. To use SQL Server Express instead, set an environment variable before starting the API:

```powershell
$env:ConnectionStrings__DefaultConnection = "Server=localhost\\SQLEXPRESS;Database=BatchX;Trusted_Connection=True;Encrypt=False;TrustServerCertificate=True;MultipleActiveResultSets=true"
```

## Run locally

The `.cmd` launchers work even when PowerShell script execution is disabled.
The easiest option starts both servers in separate minimized windows:

```bat
start-all.cmd
```

To run them in separate terminals instead:

```bat
start-backend.cmd
start-frontend.cmd
```

Launchers are safe to run more than once; they detect an already-running
server instead of rebuilding it. Stop both servers with `stop-all.cmd`.

The scripts start:

- React: http://127.0.0.1:5173
- API: http://127.0.0.1:5080
- API health: http://127.0.0.1:5080/api/health

On first API start, EF Core creates the SQL Server schema and inserts idempotent demo data.

## Demo accounts

Every demo password is `demo1234`.

| Role | Username |
|---|---|
| Main Admin | `admin` |
| FSE Dean | `dean` |
| FBS Dean | `deanbiz` |
| CSE 48 CR | `cr` |
| CSE 52 CR | `newcr` |
| BBA 21 CR | `crbiz` |
| FSE Teacher | `teacher` |
| CSE 48 Student | `student` |
| CSE 48 Student | `sadia` |
| CSE 52 Student | `student52` |
| BBA 21 Student | `bizstudent` |
| Pending CSE 48 Student | `pendingstudent` |

## Build

```powershell
$env:DOTNET_CLI_HOME = "$PWD\\.dotnet-cli-home"
.\\.dotnet\\dotnet.exe build BatchX.slnx
npm.cmd install --prefix frontend
npm.cmd run build --prefix frontend
```

## Configuration

- Change `Jwt:Key` in `backend/appsettings.json` before production.
- Set the production SQL Server connection through `ConnectionStrings__DefaultConnection`.
- Uploaded files are stored under `backend/wwwroot/uploads` for local development; use durable object storage in production.
- CORS currently permits the Vite development origins on ports 5173.
