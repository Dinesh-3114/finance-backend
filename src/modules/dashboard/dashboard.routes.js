const express = require("express");
const router = express.Router();
const { summary } = require("./dashboard.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/roleGuard");

router.get("/summary", auth, role("admin", "analyst", "viewer"), summary);

module.exports = router;