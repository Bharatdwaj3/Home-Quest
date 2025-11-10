const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
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
  accountType: {
    type: String,
    required: true,
    enum: ['tenant', 'owner','admin'], 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserSchema;