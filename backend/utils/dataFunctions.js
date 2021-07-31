const data = require('../config/products.json');

const getAllProducts = () => {
  try {
    const products = data.products;

    return { success: true, products };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getSingleProduct = (id) => {
  try {
    const products = data.products;
    return products.find((singleProduct) => singleProduct.id === Number(id));
  } catch (error) {
    console.log(error.message);
  }
};

const addQty = (product, qty) => {
  const userCurrentCart = { productId: product.id, qty: qty };

  return {
    success: true,
    updatedProduct: {
      ...product,
      countInStock: product.countInStock - qty,
    },
    userCurrentCart,
  };
};

const removeQty = (product, req) => {
  const { qty, userCurrentCart } = req.body;

  const filteredUserCurrentCart = userCurrentCart.map((item) =>
    item.id === product.id ? { ...item, qty: item.qty - qty } : { ...item }
  );

  return {
    success: true,
    updatedProduct: {
      ...product,
      countInStock: product.countInStock + qty,
    },
    userCurrentCart: filteredUserCurrentCart,
  };
};

module.exports = { getAllProducts, getSingleProduct, addQty, removeQty };
