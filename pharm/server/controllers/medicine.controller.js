const Medicine = require("../models/medicine.model");

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Medicine.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { name, price } = req.body;

    // validate đơn giản
    if (!name || !price) {
      return res.status(400).json({
        message: "Name and price are required",
      });
    }

    const newMedicine = await Medicine.create(req.body);
    res.status(201).json(newMedicine);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const existing = await Medicine.getById(id);
    if (!existing) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    const updated = await Medicine.update(id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const existing = await Medicine.getById(id);
    if (!existing) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    await Medicine.remove(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
