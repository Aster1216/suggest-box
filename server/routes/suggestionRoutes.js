const express = require('express');
const Suggestion = require('../models/Suggestion');
const Bureau = require('../models/Bureau');
const protect = require('../middleware/auth');

const router = express.Router();

// Submit suggestion (public)
router.post('/', async (req, res) => {
  const { bureau_key, message, email, isPublic, language } = req.body;
  try {
    const bureau = await Bureau.findOne({ key: bureau_key });
    if (!bureau) return res.status(400).json({ error: "Invalid bureau" });

    const newSugg = await Suggestion.create({
      bureau: bureau._id,
      message,
      email,
      isPublic,
      language
    });

    res.json(newSugg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bureau dashboard (protected)
router.get('/bureau', protect, async (req, res) => {
  try {
    const items = await Suggestion.find({ bureau: req.bureau._id }).sort({ createdAt: -1 });
    res.json({ bureau: req.bureau, suggestions: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Public suggestions
router.get('/public', async (req, res) => {
  const { bureau_key } = req.query;
  try {
    let query = { isPublic: true };
    if (bureau_key) {
      const bureau = await Bureau.findOne({ key: bureau_key });
      if (!bureau) return res.status(400).json({ error: "Invalid bureau" });
      query.bureau = bureau._id;
    }
    const items = await Suggestion.find(query)
      .populate("bureau", "name_en name_am key")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
