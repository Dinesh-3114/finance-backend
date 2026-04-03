const express = require("express");
const router = express.Router();
const c = require("./record.controller");
const auth = require("../../middleware/auth");
const role = require("../../middleware/roleGuard");

router.get("/",     auth, role("admin","analyst","viewer"), c.getRecords);
router.post("/",    auth, role("admin"),                    c.createRecord);
router.patch("/:id",auth, role("admin"),                    c.updateRecord);
router.delete("/:id",auth,role("admin"),                    c.deleteRecord);

module.exports = router;