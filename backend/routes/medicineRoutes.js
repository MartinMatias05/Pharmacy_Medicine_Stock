const express = require("express");

const {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
} = require("../controllers/medicineController");

const router = express.Router();

// GET all medicines
router.get("/", getMedicines);

// GET one medicine
router.get("/:id", getMedicineById);

// CREATE medicine
router.post("/", createMedicine);

// UPDATE medicine
router.put("/:id", updateMedicine);

// DELETE medicine
router.delete("/:id", deleteMedicine);

module.exports = router;