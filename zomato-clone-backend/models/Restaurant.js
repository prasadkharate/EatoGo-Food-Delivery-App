const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);