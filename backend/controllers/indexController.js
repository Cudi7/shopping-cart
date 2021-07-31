const app = require('express');
const { canUpdateProduct } = require('../middleware/canUpdateProduct');
const { existingProduct } = require('../middleware/existingProduct');
const { getAllProducts, addQty, removeQty } = require('../utils/dataFunctions');

const route = app.Router();

//GET All products
route.get('/', (req, res) => {
  const allProducts = getAllProducts();
  const { success } = allProducts;

  if (!success)
    return res.status('404').send({ success, error: AllProducts.error });

  const { products } = allProducts;
  res.status('200').send({ success, products });
});

//UPDATE product
route.patch('/add', existingProduct, canUpdateProduct, (req, res) => {
  if (res.error) {
    return res.status('500').send({ success: false, error: res.error });
  }

  const { qty } = req.body;
  const product = res.existingProduct;

  const productUpdated = res.existingProduct && addQty(product, qty);
  const { success, updatedProduct, userCurrentCart } = productUpdated;

  res.status('200').send({ success, updatedProduct, userCurrentCart });
});

//DELETE product
route.patch('/remove', existingProduct, (req, res) => {
  if (res.error) {
    return res.status('500').send({ success: false, error: res.error });
  }
  const product = res.existingProduct;

  const cartUpdated = res.existingProduct && removeQty(product, req);
  const { success, updatedProduct, userCurrentCart } = cartUpdated;

  res.status('200').send({ success, updatedProduct, userCurrentCart });
});

module.exports = route;
