import { Box } from '@material-ui/core'
import React, { useState } from 'react'
import { Navigate, Outlet  } from 'react-router-dom'

import { useStyles } from '../HeaderStyle'
import Navheader from '../Navheader'
import Sidenav from '../SideNav/Sidenav'
import { useSelector } from 'react-redux';

const HeaderComponent = () => {

    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setMobileOpen(!mobileOpen);
      console.log("Jai siya ram");
    };

    const handleDrawerClose = () => {
      setMobileOpen(false);
      console.log("Jai siya ram");
    };
    const {access_token} = useSelector(state => state.auth )
    console.log("HeaderComponent", access_token)

  return (
    <React.Fragment>
      <Navheader handleDrawerOpen={handleDrawerOpen} />
      <Sidenav mobileOpen={mobileOpen} 
               handleDrawerOpen={handleDrawerOpen}
               handleDrawerClose={handleDrawerClose}/>
      <Box className={classes.wrapper}>
        
        {/* render aisa bhi kar sakte hai <Route path="/" component{<Dashboard/>}/>*/}
      
        {access_token ? <Outlet/> :<Navigate to = '/loginreg' />}
      </Box>
    </React.Fragment>
    
  )
}

export default HeaderComponent