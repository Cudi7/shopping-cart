import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import MenuIcon from '@material-ui/icons/Menu';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: 'auto',
    marginRight: '1rem',
    cursor: 'pointer',
  },
  items: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  root: {
    padding: '0 2rem',
    backgroundColor: 'rgba(255, 192, 203, 1)',
  },
}));

export default function PopoverComponent() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <div className={classes.icon} onClick={handleClick}>
        <MenuIcon fontSize="large" />
      </div>
      <Popover
        className={classes.items}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        elevation={0}
      >
        <div className={classes.root}>
          <List component="nav">
            <ListItem button>
              <ListItemText primary="Cesta" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Productos" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Sobre mi" />
            </ListItem>
          </List>
        </div>
      </Popover>
    </div>
  );
}
