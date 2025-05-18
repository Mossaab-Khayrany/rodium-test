const express = require("express");
const router = express.Router();
const Table = require("../models/Table");

// GET all table data
router.get("/", async (req, res) => {
  try {
    const data = await Table.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST update or add a cell
router.post("/", async (req, res) => {
  const { row, col, value } = req.body;

  try {
    let cell = await Table.findOne({ row, col });
    if (cell) {
      cell.value = value;
      await cell.save();
    } else {
      cell = new Table({ row, col, value });
      await cell.save();
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
