const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin', 'owner'], default: 'customer' },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: function() { return this.role === 'owner'; } },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);