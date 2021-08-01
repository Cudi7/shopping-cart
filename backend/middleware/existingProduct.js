const { getSingleProduct } = require('../utils/dataFunctions');

const existingProduct = async (req, res, next) => {
  const { id } = req.body;

  const product = await getSingleProduct(id);

  if (!product) res.error = "We couldn't find this product";
  if (product) res.existingProduct = product;

  next();
};

module.exports = { existingProduct };
