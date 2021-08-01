import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { fetchAllCartItems, fetchAllProducts } from './productsSlice';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#509BF5',
    backgroundImage: 'linear-gradient(#c074b2, #8ab5e8)',
    minHeight: '100vh',
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
  },
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    textAlign: 'center',
  },
});

function Main() {
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCartItems());
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h3">Esto es SHOPUFY</Typography>
        <Typography variant="h5">Productos Propios +850 marcas</Typography>
        <Button variant="contained" onClick={handleButtonClick}>
          Explorar
        </Button>
      </div>
    </div>
  );
}

export default Main;
