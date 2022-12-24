import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    Typography
  } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../services/userAuthApi';
import { useStyles } from '../UserHeader/HeaderStyle';
import { AccountProfileDetails } from './account-profile-details';
import imagemale from './userImage/male.jpg'
import imagefemale from './userImage/female.jpg'

  const user = {
    avatarmale: {},
    avatarfemale: {},
    city: 'jagdalpur',
    country: 'India',
    jobTitle: 'Director',
    name: 'Vimla Bhol',
    timezone: 'GTM-7'
  };

  const userMale = {imagemale}
  const userFemale = {imagefemale}
  
 console.log("ProfileImage", user.avatarmale)

 export  const AccountProfile = (props) => {
    
    const dispatch = useDispatch()
    const {access_token} = getToken()
  
    const {data, isSuccess} = useGetLoggedUserQuery(access_token)
    // console.log(data)
    //create local state 
    const [userData, setUserData]= useState({email:"", firstname:"", lastname:"", gender:""})
    
    //Store  User data In Local State
    useEffect(()=>{
        if(data && isSuccess)
        {
            setUserData({email: data.email, firstname: data.firstname, lastname: data.lastname, gender: data.gender})
        }
    },[data, isSuccess])
    //******************************************************************** */

console.log("Userdata",userData)
const classes = useStyles()

return(
<div style={{marginTop:'70px',marginBottom:'40px'}}>
    <Grid container gap={2}>
    
    <Grid item md={6} lg={3} sm={6}>
    
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
        {userData.gender == 'male' ?  <Avatar
        src={imagemale}
        sx={{
          height: 84,
          mb: 2,
          width: 84
        }}
      /> :  <Avatar  className={classes.navAvatar}
      src={imagefemale}
      sx={{
        height: 84,
        mb: 2,
        width: 84
      }}
    />}
         
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
           { `${userData.firstname} ${userData.lastname}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${user.city} ${user.country}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
        
        </Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item md={6} lg={7} sm={6}>
    <AccountProfileDetails />
    </Grid>
    </Grid>
    </div>
  )};

