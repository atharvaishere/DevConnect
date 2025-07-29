const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    bio: { type: String },
    avatar: { type: String },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('User', userSchema);