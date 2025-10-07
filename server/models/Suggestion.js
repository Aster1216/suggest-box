const mongoose = require('mongoose');

const SuggestionSchema = new mongoose.Schema({
  bureau: { type: mongoose.Schema.Types.ObjectId, ref: "Bureau", required: true },
  message: { type: String, required: true },
  email: { type: String },
  isPublic: { type: Boolean, default: false },
  language: { type: String, enum: ["en", "am"], default: "en" }
}, { timestamps: true });

module.exports = mongoose.model('Suggestion', SuggestionSchema);
