const Medicine = require("../models/medicine");

// GET all medicines
const getMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find().sort({ createdAt: -1 });

        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve medicines.",
            error: error.message
        });
    }
};

// GET one medicine
const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found."
            });
        }

        res.status(200).json(medicine);
    } catch (error) {
        res.status(400).json({
            message: "Invalid medicine ID.",
            error: error.message
        });
    }
};

// CREATE medicine
const createMedicine = async (req, res) => {
    try {
        const { name, brand, quantity, expiryDate, price } = req.body;

        const medicine = await Medicine.create({
            name,
            brand,
            quantity,
            expiryDate,
            price
        });

        res.status(201).json({
            message: "Medicine created successfully.",
            medicine
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create medicine.",
            error: error.message
        });
    }
};

// UPDATE medicine
const updateMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found."
            });
        }

        res.status(200).json({
            message: "Medicine updated successfully.",
            medicine
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update medicine.",
            error: error.message
        });
    }
};

// DELETE medicine
const deleteMedicine = async (req, res) => {
    try {
        const medicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!medicine) {
            return res.status(404).json({
                message: "Medicine not found."
            });
        }

        res.status(200).json({
            message: "Medicine deleted successfully."
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete medicine.",
            error: error.message
        });
    }
};

module.exports = {
    getMedicines,
    getMedicineById,
    createMedicine,
    updateMedicine,
    deleteMedicine
};