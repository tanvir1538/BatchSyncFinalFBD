const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const facultiesRoutes = require('./routes/faculties.routes');
const schedulesRoutes = require('./routes/schedules.routes');
const clearancesRoutes = require('./routes/clearances.routes');
const membershipsRoutes = require('./routes/memberships.routes');
const notesRoutes = require('./routes/notes.routes');
const pollsRoutes = require('./routes/polls.routes');
const fundsRoutes = require('./routes/funds.routes');
const noticesRoutes = require('./routes/notices.routes');
const teacherRoutes = require('./routes/teacher.routes');
const auditLogsRoutes = require('./routes/auditLogs.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Standard middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to mount routes on multiple prefixes
function mountRoutes(prefix) {
  app.use(`${prefix}/health`, healthRoutes);
  app.use(`${prefix}/faculties`, facultiesRoutes);
  app.use(`${prefix}/schedules`, schedulesRoutes);
  app.use(`${prefix}/clearances`, clearancesRoutes);
  app.use(`${prefix}/memberships`, membershipsRoutes);
  app.use(`${prefix}/notes`, notesRoutes);
  app.use(`${prefix}/polls`, pollsRoutes);
  app.use(`${prefix}/funds`, fundsRoutes);
  app.use(`${prefix}/notices`, noticesRoutes);
  app.use(`${prefix}/teacher`, teacherRoutes);
  app.use(`${prefix}/audit-logs`, auditLogsRoutes);
  app.use(`${prefix}/dashboard`, dashboardRoutes);
}

// Mount both standard /api and /api/v1 prefixes
mountRoutes('/api');
mountRoutes('/api/v1');

// Root health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'BatchSync API is running', timestamp: new Date().toISOString() });
});

// 404 handler for undefined routes
app.use(notFound);

// Centralized error handling
app.use(errorHandler);

module.exports = app;
