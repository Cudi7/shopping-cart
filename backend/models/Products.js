const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  id: Number, // String is shorthand for {type: String}
  name: String,
  image: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  countInStock: Number,
});

const Products = mongoose.model('Produc', ProductSchema);

module.exports = Products;
