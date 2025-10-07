const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Bureau = require('../models/Bureau');

const router = express.Router();

// Bureau login
router.post('/login', async (req, res) => {
  const { office, email, password } = req.body;  // ✅ include office
  try {
    // Find bureau by office key + email
    const bureau = await Bureau.findOne({ key: office, email });
    if (!bureau) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, bureau.passwordHash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: bureau._id, key: bureau.key },
      process.env.JWT_SECRET || "change_me",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      bureau: {
        id: bureau._id,
        name_en: bureau.name_en,
        name_am: bureau.name_am,
        key: bureau.key,
        email: bureau.email,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all bureaus (for login dropdown)
router.get('/bureaus', async (req, res) => {
  try {
    const bureaus = await Bureau.find({}, "name_en name_am key email").sort({ name_en: 1 });
    res.json(bureaus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

