const express = require("express");
const router = express.Router();

const medicineController = require("../controllers/medicine.controller");

router.get("/", medicineController.getAll);
router.post("/", medicineController.create);
router.put("/:id", medicineController.update);
router.delete("/:id", medicineController.remove);

module.exports = router;
