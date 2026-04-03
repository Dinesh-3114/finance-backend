const express = require("express");
const app = express();

app.use(express.json());

// Routes
const userRoutes = require("./modules/users/user.routes");
const recordRoutes = require("./modules/records/record.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");

app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
});

module.exports = app;