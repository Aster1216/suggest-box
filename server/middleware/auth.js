const jwt = require('jsonwebtoken');
const Bureau = require('../models/Bureau');

async function protect(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = auth.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || "change_me");
    const bureau = await Bureau.findById(data.id).select("-passwordHash");
    if (!bureau) return res.status(401).json({ error: "Invalid token" });
    req.bureau = bureau;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = protect;
