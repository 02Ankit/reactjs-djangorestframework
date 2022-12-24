import React from 'react';
import{ Box, Toolbar, IconButton, AppBar, Typography}from '@mui/material';
import { Hidden} from '@material-ui/core'
import  MenuIcon  from '@mui/icons-material/Menu';
import UserProfile from './MenuNavtabs/UserProfile';
import { useStyles } from './HeaderStyle';

// make style material ui me koi bhi component ko style kar sakte hai 
// const useStyles = makeStyles((theme)=>({
//     email:{
//     color:"white",    
//     }
// }))

const Navheader = ({handleDrawerOpen}) => {
    // connection with makeStyle matlab useStyle function ko navcomponent ke under lana
    const classes = useStyles()

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" >
      <Toolbar sx={{backgroundColor:'Orange'}}>
        <IconButton  
         className={classes.menuButton}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <h3>DashBoard</h3>
        <Typography variant="h8"  className={classes.email}component="div" sx={{mx:4, flexGrow: 1 }}>
        
        </Typography>
        <Hidden smDown>
        <Box style={{ display: "flex"}}>
            <UserProfile/>
            {/**<Notification Hidden/>
  <Messages Hidden/>*/}
        </Box>
        </Hidden>
        <Hidden mdUp>
          <IconButton 
              color='inherit'
              onClick={handleDrawerOpen}
          >
            <MenuIcon>
            </MenuIcon>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navheader