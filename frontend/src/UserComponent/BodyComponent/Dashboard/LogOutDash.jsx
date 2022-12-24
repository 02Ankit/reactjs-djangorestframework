import { CssBaseline, Grid, Box, Card, CardContent, Typography, Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { getToken, removeToken } from '../../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
// import UserNav from '../../UserComponent/UserNav'

import { useStyles } from '../BodyStyle/BodyStyles';
import AdminPageTitle from '../Common/AdminPageTitle';
import Vector1 from "./Imgs/img1.gif"
import Footer from '../../../components/Footer/Footer';
import { unsetUserInfo } from '../../../features/userSlice';
import { unSetUserToken } from '../../../features/authSlice';
import { useDispatch } from 'react-redux';

const LogOutDash = () => {

    const dispatch = useDispatch()

    const handleLogout = ()=>{
        
            dispatch(unsetUserInfo({email:"", firstname: "", lastname: "", 
        contact: "", gender: "", usertype: ""}))
        dispatch(unSetUserToken({access_token: null}))
        removeToken() 
        console.log("Logout system")
        
        }

    const classes = useStyles(); 
//css Style Path is:- UserComponent/BodyComponent/BodyStyle/BodyStyles.jsx

//Hover Color For Button
const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };



    return  (
        <Box> 
            <CssBaseline/> {/* CssBaseline ka use css reset karne ke liye hota hai*/}
            <Box mt={2} mb={2}>
              <Grid style= {{marginTop:"70px", marginBottom:'20px'}}>
                  <Card>
                      <CardContent className={classes.displayCard}> 
                      <Grid item md={3} xs={12} style= {{margin:'20px'}}>
                      <Box  style={{marginTop:'70px',marginBottom:'40px'}}>
                      <span style= {{fontSize:"50px", color:"red" , underline:'4px'}}>Session Expired:- </span>
                      <span style= {{fontSize:"20px", color:"blue" , underline:'4px'}}>Your session is expire please click <Button onClick={handleLogout}  style={{
                        backgroundColor: isHovering ? '#FCA61F' : '',
                        color: isHovering ? 'white' : '',
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}><span  onClick={handleLogout} className = {classes.expireLogoutButton} >Logout</span></Button> and login again </span>
          
                      </Box>
                        <Typography style= {{ border: '1px solid #FCA61F', fontSize:"20px", color:"#FCA61F",borderRadius:'20px', boxShadow: "1px 3px 1px #FCA61F"}}> 
                        <h2 style= {{fontSize:"20px", color:"blue", marginLeft:"10px"}}>Hello User  due to some security reason this session is expired. If you are not using site continuosly please click Logout Button 
 and login again.   
                        
                        </h2>
                        </Typography>
                        </Grid>
                      </CardContent>
                  </Card>
                </Grid>
            </Box>
        </Box>
      )
}

export default LogOutDash