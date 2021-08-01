import React from 'react';
import SingleProduct from './SingleProduct';
import CartButton from '../../features/products/CartButton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2.5rem',
    justifyContent: 'center',
    marginTop: '5rem',
    marginBottom: '5rem',
  },
});

function Products({ products }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CartButton />
      {products.map((singleProduct) => (
        <SingleProduct key={singleProduct.id} product={singleProduct} />
      ))}
    </div>
  );
}

export default Products;
