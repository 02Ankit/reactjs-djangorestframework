import React, { useEffect, useState } from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
  } from "@material-ui/core";
import { NavLink} from "react-router-dom";
import { useStyles } from '../HeaderStyle';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PostAddIcon from "@material-ui/icons/PostAdd";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Diversity3Icon from '@mui/icons-material/Diversity3';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Typography } from '@mui/material';
import { useDispatch} from 'react-redux';
import { unSetUserToken } from '../../../features/authSlice';
import { getToken, removeToken } from '../../../services/LocalStorageService';
import { unsetUserInfo } from '../../../features/userSlice';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
import PaymentsIcon from '@mui/icons-material/Payments';

export const SidenavData = ({handleDrawerClose}) => {
    const classes = useStyles();
     //    Logout function 
    const dispatch = useDispatch()
    //  const navigate = useNavigate()
    const handleLogout=()=>{
         // console.log("Logout Clicked")
         dispatch(unsetUserInfo({email:"", firstname: "", lastname: "", contact: "", gender: "", usertype: ""}))
         dispatch(unSetUserToken({access_token: null}))
         removeToken()
    }
     
    const {access_token} = getToken()

    const {data, isSuccess} = useGetLoggedUserQuery(access_token)
    
    const [userData, setUserData]= useState({email:"", firstname:"", is_admin:false})

    useEffect(()=>{
      if(data && isSuccess)
      {
          setUserData({email: data.email, firstname: data.firstname, is_admin:data.is_admin})
      }
  },[data, isSuccess])



    const listItemUserData = [
      { 
        label: "Dashobard", 
        path: "/dashboard/", 
        icon: <DashboardIcon /> 
      },
      {
        label: "PaymentStatus",
        path: "/dashboard/paystatus",
        icon: <PaymentsIcon />,
      },
      {
        label: "Account",
        path: "/dashboard/account",
        icon: <AccountBoxIcon />,
      },

      {
        label:<Typography onClick={handleLogout}><span onClick={handleLogout} className={classes.listItemText}>Logout</span></Typography>, 
        path:'/loginreg',
        icon:<ExitToAppIcon /> 
      }
    
    ];

    const listItemAdminData = [
      { 
        label: "Dashobard", 
        path: "/dashboard/", 
        icon: <DashboardIcon /> 
      },

      { label: "Teacher List", 
        path: "/dashboard/teachers", 
        icon: <SupervisorAccountIcon /> 
      },

      { label: "Student List", 
        path: "/dashboard/students", 
        icon: <Diversity3Icon /> 
      },
      
      { label: "Website Settings", 
        path: "/dashboard/websettings", 
        icon: <DisplaySettingsIcon /> 
      },

      { label: "Payment Setting", 
        path: "/dashboard/paymentsetting", 
        icon: <PaymentsIcon /> 
      },

      {
        label: "Notification",
        path: "/dashboard/notifications",
        icon: <NotificationsActiveIcon />,
      },
      {
        label: "Account",
        path: "/dashboard/account",
        icon: <AccountBoxIcon />,
      },

      {
        label:<Typography onClick={handleLogout}><span onClick={handleLogout} className={classes.listItemText}>Logout</span></Typography>, 
        path:'/loginreg',
        icon:<ExitToAppIcon /> 
      }
    
    ];

return (
  <div>
    <List>
      {userData.is_admin !== true ? listItemUserData.map((item, i) => (
        <Button 
          key={i}
          onClick={handleDrawerClose}
          size="small" 
          className={classes.navButton} 
        >
          <ListItem 
              exact="true"
              component={NavLink}//ListItem me ek component map karenge iska matlab ki us component ke sare featurs ko as a props lenge ispe navlink ke madat se cursor hover hota hai
              to={item.path}
              className={classes.navlinks}
              activeclassname={classes.activeNavlinks}
          >
              <ListItemIcon >
                <span className={classes.listItemText}>{item.icon}</span>   
              </ListItemIcon>
              <ListItemText >
                <span className={classes.listItemText}>{item.label}</span> 
              </ListItemText>
          </ListItem>
        </Button>
      )): listItemAdminData.map((item, i) => (
        <Button 
          key={i}
          onClick={handleDrawerClose}
          size="small" 
          className={classes.navButton} 
        >
          <ListItem
              exact="true"
              //ListItem me ek component map karenge iska matlab ki us component ke sare featurs ko as a props lenge ispe navlink ke madat se cursor hover hota hai
              component={NavLink}
              to={item.path}
              className={classes.navlinks}
              activeclassname={classes.activeNavlinks}
          >
            <ListItemIcon >
              <span className={classes.listItemText}>{item.icon}</span>
            </ListItemIcon>
            <ListItemText >
              <span className={classes.listItemText}>{item.label}</span>
            </ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
      </div>
  );
}
