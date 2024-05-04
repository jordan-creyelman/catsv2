// models/product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  // autres champs...
});

module.exports = mongoose.model('Product', ProductSchema);