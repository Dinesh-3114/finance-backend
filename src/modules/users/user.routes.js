const express = require("express");
const router = express.Router();
const { register, login, getUsers, updateUserRole } = require("./user.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/roleGuard");

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, role("admin"), getUsers);
router.patch("/:id/role", auth, role("admin"), updateUserRole);

module.exports = router;