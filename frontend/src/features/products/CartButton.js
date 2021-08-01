import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useSelector } from 'react-redux';
import { selectAllProducts, userCurrentCart } from './productsSlice';

import RemoveItem from './RemoveItem';
import { initialCartLoad } from './productsAPI';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    right: 0,
    top: '10%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const currentCart = useSelector(userCurrentCart);
  const allProducts = useSelector(selectAllProducts);

  useEffect(() => {
    if (currentCart) {
      let filteredItems = [];

      for (let i = 0; i < currentCart.length; i++) {
        const detailedItem = allProducts.find(
          (item) => item.id === currentCart[i].id
        );

        const cartQty = currentCart.find((item) => item.id === detailedItem.id);

        filteredItems.push({ ...detailedItem, qty: cartQty.qty });
      }

      setCartItems(filteredItems);
    }
  }, [currentCart, allProducts]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className={classes.root}>
        <Fab
          disabled={!cartItems}
          aria-label="cart"
          size="small"
          onClick={handleClickOpen}
        >
          <ShoppingCartIcon />
        </Fab>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Your Cart
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {cartItems?.length > 0
            ? cartItems.map((item) => (
                <>
                  <ListItem button id={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`Current quantity: ${item.qty}`}
                    />
                    <RemoveItem qty={item.qty} id={item.id} />
                  </ListItem>
                  <Divider />
                </>
              ))
            : null}
        </List>
      </Dialog>
    </div>
  );
}
