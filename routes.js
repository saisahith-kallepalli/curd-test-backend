const express = require("express");
const router = express.Router();
const Data = require("./schema");

let addCount = 0;
let updateCount = 0;

// Add data
router.post("/data", async (req, res) => {
  console.log(req.body);
  const newData = new Data(req.body);
  try {
    await newData.save();
    addCount++;
    return res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update data
router.put("/data/:id", async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Ensures the updated document is returned
    );
    updateCount++;
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get count
router.get("/count", (req, res) => {
  return res.json({ addCount, updateCount });
});

router.delete("/data/:id", async (req, res) => {
  try {
    const updatedData = await Data.deleteOne({ _id: req.params.id });
    updateCount++;
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/data", async (req, res) => {
  try {
    const data = await Data.find({}); // Using .lean() to get plain JavaScript objects
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
