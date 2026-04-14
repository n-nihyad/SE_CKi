const express = require("express");
const router = express.Router();

const auditController = require("../controllers/audit.controller");

router.get("/", auditController.getAll);
router.get("/:id", auditController.get);
router.post("/", auditController.create);

module.exports = router;
