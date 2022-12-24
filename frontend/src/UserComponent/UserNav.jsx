import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';


const UserNav = () => {
  const { access_token } = getToken()
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" style= {({backgroundColor:'#fb982f'})}>
      <Toolbar>
        <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>NoDoubtsAcademy</Typography>

        <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#fb982f' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

        <Button component={NavLink} to='Contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#fb982f' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>

        {access_token ? 
          <Button component={NavLink} to='/dashboard' style= {({isActive})=>{return{backgroundColor:isActive ? '#fb982f' : ''}}} sx={{ color: 'white', textTransform: 'none' }}>Dashboard</Button>
          : <Button component={NavLink} to='/loginreg' style={({ isActive }) => { return { backgroundColor: isActive ? '#fb982f' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Login/Registration</Button>}
        
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default UserNav