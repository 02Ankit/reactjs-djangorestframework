import React, { useState } from 'react'
import{ Avatar, Box, Button,  ListItem,  ListItemIcon, ListItemText}from '@mui/material';
import { MenuItem, Menu} from '@material-ui/core'
import { NavLink, useNavigate } from 'react-router-dom'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import imagemale from './userImage/male.jpg'
import imagefemale from './userImage/female.jpg'
import { useStyles } from '../HeaderStyle';
import { getToken, removeToken } from '../../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unSetUserToken } from '../../../features/authSlice';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
import { useEffect } from 'react';

const UserProfile = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {access_token} = getToken()
    
    const {data, isSuccess} = useGetLoggedUserQuery(access_token)
    // console.log(data)
    //create local state 
    const [userData, setUserData]= useState({email:"", firstname:"", gender:""})
    
    //Store  User data In Local State
    useEffect(()=>{
        if(data && isSuccess)
        {
            setUserData({email: data.email, firstname: data.firstname, gender:data.gender})
        }
    },[data, isSuccess])
    
    // if(userData.usertype !== 'student'){
    //     console.log(userData.firstname)
    // }
    //usestate ka use karenge value ko null ke liye ya open ke liye 
    // useState Array return karta hai first variable hota hai or second wala SetFunction hota hai 
    const [anchorEl, setAnchorEl] = useState()
    // menu close karne ke liye 
    const handleClose=()=>{
        setAnchorEl(null)    
        }
    // menu open ke liye event(e).currentTarget se open hoga menu
    const handleClick =(e)=>{
        setAnchorEl(e.currentTarget)
    }
    const dropDownData=[
        {
            label:'settings', 
            path:'/dashboard/account',
            icon:<SettingsIcon/>,
        },
        {
            label: "Account",
            path: "/dashboard/account",
            icon: <AccountBoxIcon />,
          },
    ]

//    Logout function 
    const navigate = useNavigate()
    const handleLogout=()=>{
        // console.log("Logout Clicked")
        dispatch(unSetUserToken({access_token: null}))
        removeToken()
        navigate('/loginreg')
    }
       
return (
    <Box>   
            
        <Button  //Here we are using props of Button
            color='inherit' 
            aria-controls="simple-menu" //simple-menu id of menu element 
            aria-haspopup="true" 
            onClick={handleClick}
            startIcon={
                userData.gender == 'male' ? <Avatar src={imagemale} className={classes.navAvatar}/> : <Avatar src={imagefemale} className={classes.navAvatar} />
                
            }
            >
        </Button>
            
        <Menu id="simple-menu" 
                anchorEl={anchorEl} // anchorEl me state ka value lenge jo ki open me denge
                keepMounted
                open={Boolean(anchorEl)} // open me pahele starting me state Null hoga matlab false hoga Boolean me liye hai to false hoga.
                onClose={handleClose} 
        >
            
            {dropDownData.map((item, i)=>(
            <ListItem key={i}  exact="true"
            component={NavLink}//ListItem me ek component map karenge iska matlab ki us component ke sare featurs ko as a props lenge ispe navlink ke madat se cursor hover hota hai
            to={item.path}
            className={classes.navlinks}
            activeclassname={classes.activeNavlinks}
            onClick= {handleClose}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText to={item.path}>{item.label} </ListItemText>
            </ListItem>
            ))}
            <MenuItem className={classes.navlinks}
            activeclassname={classes.activeNavlinks} onClick={handleLogout} >                  
                <ExitToAppIcon/>Logout
            </MenuItem>
        </Menu>
</Box>
  )
}

export default UserProfile