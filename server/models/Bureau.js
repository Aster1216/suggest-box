const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const BureauSchema = new mongoose.Schema({
  name_en: { type: String, required: true },
  name_am: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

// Compare password method
BureauSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('Bureau', BureauSchema);
