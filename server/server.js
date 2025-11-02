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
app.use('/api/auth', require('./routes/auth'));           // login
app.use('/api/bureaus', require('./routes/bureauRoutes'));// list bureaus
app.use('/api/suggestions', require('./routes/suggestionRoutes')); // suggestions

app.get('/', (req,res)=> res.json({ ok:true }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('✅ Server running on', PORT));
