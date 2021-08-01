const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  id: { type: Number, required: true }, // String is shorthand for {type: String}
  qty: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
