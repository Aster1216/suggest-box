const express = require('express');
const Bureau = require('../models/Bureau');
const router = express.Router();

// List all bureaus (for dropdown)
router.get('/', async (req, res) => {
  try {
    const bureaus = await Bureau.find({}, "name_en name_am key email");
    res.json(bureaus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
