const { createUser, loginUser, getAllUsers, updateRole } = require("./user.service");

async function register(req, res, next) {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const user = await createUser(email, password, role);
    res.status(201).json(user);
  } catch (err) { next(err); }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) { next(err); }
}

async function getUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) { next(err); }
}

async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    const user = await updateRole(req.params.id, role);
    res.json(user);
  } catch (err) { next(err); }
}

module.exports = { register, login, getUsers, updateUserRole };