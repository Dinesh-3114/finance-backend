const pool = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createUser(email, password, userRole = "viewer") {
  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, status",
    [email, hash, userRole]
  );
  return result.rows[0];
}

async function loginUser(email, password) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user) throw { statusCode: 401, message: "Invalid credentials" };

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw { statusCode: 401, message: "Invalid credentials" };

  if (user.status === "inactive") throw { statusCode: 403, message: "Account is inactive" };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return { token, user: { id: user.id, email: user.email, role: user.role } };
}

async function getAllUsers() {
  const result = await pool.query("SELECT id, email, role, status, created_at FROM users");
  return result.rows;
}

async function updateRole(id, newRole) {
  const result = await pool.query(
    "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role",
    [newRole, id]
  );
  if (result.rows.length === 0) throw { statusCode: 404, message: "User not found" };
  return result.rows[0];
}

module.exports = { createUser, loginUser, getAllUsers, updateRole };