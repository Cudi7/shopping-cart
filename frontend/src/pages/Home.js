import { CssBaseline } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../features/products/productsSlice';

import Navbar from '../common/components/Navbar';
import Main from '../features/products/Main';
import Products from '../common/components/Products';

function Home() {
  const [products, setProducts] = useState(null);
  const allProducts = useSelector(selectAllProducts);

  useEffect(() => {
    if (allProducts) setProducts(allProducts);
  }, [allProducts]);

  return (
    <>
      <CssBaseline />
      <header>
        <Navbar />
        {products?.length ? <Products products={allProducts} /> : <Main />}
      </header>
    </>
  );
}

export default Home;
