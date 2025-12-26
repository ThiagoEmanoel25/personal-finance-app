const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Gamificação Persistente
  stats: {
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    badges: { type: [String], default: [] }, // Array de strings com nomes das badges
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
