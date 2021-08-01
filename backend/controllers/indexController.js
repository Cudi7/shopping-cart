const app = require('express');
const { canUpdateProduct } = require('../middleware/canUpdateProduct');
const { existingProduct } = require('../middleware/existingProduct');
const {
  getAllProducts,
  updateQty,
  removeQty,
  addQty,
  getCurrentCart,
} = require('../utils/dataFunctions');
const Products = require('../models/Products');

const route = app.Router();

//GET All products
route.get('/', async (req, res) => {
  const allProducts = await getAllProducts();
  const { success } = allProducts;

  if (!success)
    return res.status('404').send({ success, error: AllProducts.error });

  const { products } = allProducts;
  res.status('200').send({ success, products });
});

//GET All CART Items
route.get('/cart', async (req, res) => {
  const allProductsCart = await getCurrentCart();

  if (allProductsCart.error)
    return res
      .status('404')
      .send({ success: false, error: allProductsCart.error });

  res.status('200').send({ success: true, currentCart: allProductsCart });
});

//UPDATE product
route.patch('/add', existingProduct, canUpdateProduct, async (req, res) => {
  const { qty, id } = req.body;
  const product = res.existingProduct?.id;

  const productUpdated = product
    ? await updateQty(qty, id)
    : await addQty(qty, id, res);

  const { success, updatedProduct, userCurrentCart } = productUpdated;

  res.status('200').send({ success, updatedProduct, userCurrentCart });
});

//DELETE product
route.patch('/remove', existingProduct, async (req, res) => {
  if (res.error) {
    return res.status('500').send({ success: false, error: res.error });
  }
  const product = res.existingProduct;

  const cartUpdated = res.existingProduct && (await removeQty(product, req));

  const { success, updatedProduct, userCurrentCart } = cartUpdated;

  res.status('200').send({ success, updatedProduct, userCurrentCart });
});

//POST NEW PRODUCT (for test)
route.post('/admin/new', async (req, res) => {
  const { id, name, image, description, brand, category, price, countInStock } =
    req.body;

  const newProductData = {
    id,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  };

  try {
    const newProduct = await Products.create(newProductData);
    res.status('200').send(newProduct);
  } catch (error) {
    res.status('500').send({ message: error.message });
  }
});

module.exports = route;
