import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import PopoverComponent from './PopoverComponent';

const useStyles = makeStyles({
  appBar: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <>
      <HideOnScroll {...props}>
        <AppBar className={classes.appBar} elevation={1}>
          <Toolbar>
            <Typography variant="h6">Shopufy</Typography>
          </Toolbar>
          <PopoverComponent />
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
