const Cart = require('../models/Cart');
const Products = require('../models/Products');

const getAllProducts = async () => {
  try {
    const products = await Products.find({});

    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getSingleProduct = async (id) => {
  try {
    const product = await Cart.find({ id: id });

    return product ? product[0] : [];
  } catch (error) {
    console.log(error.message);
  }
};

const updateQty = async (qty, id) => {
  try {
    const currentCart = await getCurrentCart();
    const currentProductCartQty = currentCart.filter((item) => item.id === id);
    const userCurrentCart = await updateSingleProductCart(
      qty,
      id,
      currentProductCartQty
    );

    const allProducts = await getAllProducts();
    const currentProductQty = allProducts.products.filter(
      (item) => item.id === id
    );

    const updatedProduct = await updateSingleProduct(
      qty,
      id,
      currentProductQty
    );

    return { success: true, userCurrentCart, updatedProduct };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const addQty = async (qty, id, res) => {
  try {
    await Cart.create({ id, qty });
    const userCurrentCart = await getCurrentCart();
    const allProducts = await getAllProducts();
    const currentProductQty = allProducts.products.filter(
      (item) => item.id === id
    );

    const updatedProduct = await updateSingleProduct(
      qty,
      id,
      currentProductQty
    );

    return { success: true, userCurrentCart, updatedProduct };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const removeQty = async (product, req) => {
  const { qty, id } = req.body;

  try {
    const userCurrentCart = await removeSingleProductCart(id, qty, product);

    const allProducts = await getAllProducts();
    const currentProductQty = allProducts.products.filter(
      (item) => item.id === id
    );

    const updatedProduct = await updateSingleProduct(
      qty,
      id,
      currentProductQty,
      'remove'
    );

    return { success: true, userCurrentCart, updatedProduct };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getCurrentCart = async () => {
  try {
    const userCurrentCart = await Cart.find({});
    return userCurrentCart;
  } catch (error) {
    return { error: error.message };
  }
};

const updateSingleProduct = async (qty, id, currentProduct, type) => {
  const currentQty = currentProduct[0].countInStock;

  const newQty = type === 'remove' ? currentQty + qty : currentQty - qty;

  try {
    const updatedProduct = await Products.findOneAndUpdate(
      { id: id },
      { countInStock: newQty },
      {
        new: true,
      }
    );

    return updatedProduct;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const updateSingleProductCart = async (qty, id, currentCart) => {
  const currentQty = currentCart[0].qty;

  const newQty = currentQty + qty;

  try {
    await Cart.findOneAndUpdate({ id: id }, { qty: newQty });

    return await getCurrentCart();
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const removeSingleProductCart = async (id, qty, product) => {
  const updatedQty = product.qty - qty;

  try {
    if (updatedQty <= 0) await Cart.deleteOne({ id: id });

    await Cart.findOneAndUpdate({ id: id }, { qty: updatedQty });

    return await getCurrentCart();
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  updateQty,
  removeQty,
  addQty,
  getCurrentCart,
};
