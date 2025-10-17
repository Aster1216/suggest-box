const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    console.error('❌ MongoDB URI is missing!');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Atlas Connected');
  } catch (err) {
    console.error('❌ Mongo connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
