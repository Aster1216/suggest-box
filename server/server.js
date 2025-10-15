require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/suggestbox';
connectDB(MONGO);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bureaus', require('./routes/bureauRoutes'));
app.use('/api/suggestions', require('./routes/suggestionRoutes'));

app.get('/', (req, res) => res.json({ ok: true }));

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Server error', details: err.message });
});

// ✅ Export app for Vercel
module.exports = app;
