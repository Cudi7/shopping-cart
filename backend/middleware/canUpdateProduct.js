const canUpdateProduct = (req, res, next) => {
  const productCurrentQty = res.existingProduct.countInStock;
  const userQty = req.body.qty;

  if (canBuy(productCurrentQty, userQty)) return next();

  res.error = 'Sorry, there is not enough stock';
  next();
};

const canBuy = (productCurrentQty, userQty) => productCurrentQty >= userQty;

module.exports = { canUpdateProduct };
