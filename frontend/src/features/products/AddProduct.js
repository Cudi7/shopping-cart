import { Badge, Button, ButtonGroup, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuantity } from './productsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
    '& .MuiBadge-root': {
      marginRight: theme.spacing(4),
    },
  },
}));

function AddProduct({ stock, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleMaxCount = () => count < stock && setCount((prev) => prev + 1);

  const handleAddProduct = () => {
    if (count === 0) return;
    dispatch(addQuantity({ id, qty: count }));
    setCount(0);
  };

  return (
    <div className={classes.root}>
      <Badge color="secondary" badgeContent={count}>
        <AddShoppingCartIcon />
      </Badge>
      <ButtonGroup>
        <Button
          aria-label="reduce"
          onClick={() => {
            setCount(Math.max(count - 1, 0));
          }}
          variant="text"
          disabled={stock === 0}
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <Button
          aria-label="increase"
          onClick={handleMaxCount}
          variant="text"
          disabled={stock === 0}
        >
          <AddIcon fontSize="small" />
        </Button>
      </ButtonGroup>

      <Button
        variant="contained"
        disabled={stock === 0}
        onClick={handleAddProduct}
      >
        Añadir a la cesta
      </Button>
    </div>
  );
}

export default AddProduct;
