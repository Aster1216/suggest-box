const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Bureau = require("../models/Bureau");

const router = express.Router();

/*ENV SAFETY CHECK*/
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

/* LOGIN (office + password) */
router.post("/login", async (req, res) => {
  const { office, password } = req.body;

  if (!office || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  try {
    // Find bureau by office key
    const bureau = await Bureau.findOne({ key: office });
    if (!bureau) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password
    const match = await bcrypt.compare(password, bureau.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: bureau._id, key: bureau.key },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      expiresIn: 7 * 24 * 60 * 60, // seconds
      bureau: {
        id: bureau._id,
        key: bureau.key,
        name_en: bureau.name_en,
        name_am: bureau.name_am,
        email: bureau.email
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* FETCH BUREAUS (login dropdown) */
router.get("/bureaus", async (req, res) => {
  try {
    const bureaus = await Bureau
      .find({}, "key name_en name_am email")
      .sort({ name_en: 1 });

    res.json(bureaus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/* =========================
   CHANGE PASSWORD
========================= */
router.post("/change-password", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: "Both passwords are required" });
    }

    const bureau = await Bureau.findById(decoded.id);
    if (!bureau) {
      return res.status(404).json({ error: "Bureau not found" });
    }

    const match = await bcrypt.compare(oldPassword, bureau.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    bureau.passwordHash = await bcrypt.hash(newPassword, 10);
    await bureau.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
