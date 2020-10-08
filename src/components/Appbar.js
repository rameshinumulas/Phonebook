import React,{useState} from 'react';

// material ui...
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import {Button,MenuItem} from '@material-ui/core';

// react-router-dom...
import { Redirect } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const Appbar =()=>{

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [SignInClick, setSignInClick] = useState(false)
  const [logOutClick, setlogOutClick] = useState(false)


  // methods for handle menu bar ...
  const handleMenus = (event)=>{
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
    setSignInClick(false)
  };
  const handleSignupPage = ()=>{
    setSignInClick(true)
    setAnchorEl(null);
  }
  const LogOutmethod = ()=>{
    localStorage.removeItem("login email")
    setlogOutClick(true)
    setSignInClick(false)
    setAnchorEl(null);

  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start"
          className={classes.menuButton}
          onClick = {handleMenus}
          color="inherit" aria-label="menu">
          <MenuIcon  />
          </IconButton>
            {localStorage.getItem("login email") ? 
              <Menu 
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose} 
               >
              <MenuItem onClick={LogOutmethod} >Log out</MenuItem>
              </Menu> :null
            }
        
          <Typography variant="h6" className={classes.title}>
            Phone Book
          {localStorage.getItem("login email") ? 
            <Button  onClick={LogOutmethod}  style={{color:"whitesmoke"}} >Log out</Button> : 
            null 
          }
          </Typography>
            <Button  onClick={handleSignupPage}  style={{color:"whitesmoke"}}>Sign Up </Button> 
        </Toolbar>
      </AppBar>
      {/* calling Redirect /////*/}
      {logOutClick ? <Redirect to = "/" />:null}
      {SignInClick ? <Redirect to = "/newuser" />:null}
    </div>
  );
}


export default Appbar;