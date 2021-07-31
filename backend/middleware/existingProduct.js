const { getSingleProduct } = require('../utils/dataFunctions');

const existingProduct = (req, res, next) => {
  const { id } = req.body;

  const product = getSingleProduct(id);

  if (!product) res.error = "We couldn't find this product";
  if (product) res.existingProduct = product;

  next();
};

module.exports = { existingProduct };
