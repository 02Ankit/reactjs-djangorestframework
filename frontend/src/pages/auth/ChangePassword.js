import React,{useState} from 'react'

import { Alert, Box, TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  useChangeUserPasswordMutation } from '../../services/userAuthApi';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { setUserToken } from '../../features/authSlice';
import { Typography } from '@material-ui/core';

const ChangePassword = () => {
   
    const navigate = useNavigate()
//    const [error, setError] = useState({
//     status:false, msg:'', type:''
//    })

   const [server_error, setServerError] = useState({})
   const [server_msg, setServerMsg] = useState({})
   const [changeUserPassword] = useChangeUserPasswordMutation()
   const {access_token} = getToken()

  const handleSubmit = async (event)=>{

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
        password: data.get('password'),
        password2: data.get('password2')
    }

    const res = await changeUserPassword({actualData, access_token})

            if (res.error){
                setServerMsg({})
                setServerError(res.error.data.errors)
            }

            if(res.data) {
                // console.log(data)
                setServerError({})
                setServerMsg(res.data)
                document.getElementById("password-change-form").reset();
                setTimeout(() => {navigate("/dashboard")
              }, 3000)
            }


    // if(actualData.password && actualData.password2)
    // {
    //     if(actualData.password === actualData.password2)
    //     {
    //         console.log(actualData)
    //         document.getElementById("password-reset-form").reset();
    //         setError({status:true, msg:"Password Changed Successful", type:"success"});
    //         navigate('/dashboard')

    //     }else{
    //         setError({status:true, msg:"password and Confirm Password Does not Match", type:'error'})

    //     }

    // }else{
    //     setError({status:true, msg:"password and Confirm Password Does not Match", type:'error'})
    // }


  }
        

  return (
   
    // {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : "" }
    
    // {server_error.email ? console.log(server_error.email[0]) : "" }
    <Grid container justifyContent={'center'} mt={10}>
        <Grid item  sm={6} xs={12}>
        <Box sx={{display:'flex', flexDirection:'column', flexWrap:'wrap', maxWidth:600, mt:4  }}>
        <h4>Change Password</h4>
        <Box component="form" onSubmit={handleSubmit} noValidate
        sx={{ mt:1 }} id="password-change-form">

        <TextField 
        InputProps={{ style: { fontSize: 14 } }}
        InputLabelProps={{ style: { fontSize: 14 } }} margin="normal" required fullWidth name="password" id="password" type="password" label="New Password"/>

        {server_error.password ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.password[0]}</Typography> : "" }

        <TextField InputProps={{ style: { fontSize: 14 } }}
        InputLabelProps={{ style: { fontSize: 14 } }} margin="normal" required fullWidth name="password2" id="password2" type="password" label="Confirm New Password"/>
        {server_error.password ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.password2[0]}</Typography> : "" }
        
        <Box textAlign='center'>
            <Button size='small' type='submit' variant="contained" sx={{mt:3, mb:2, px:5}}>Update</Button>
        </Box>
        
        {server_error.non_field_errors? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}
        </Box>
        
        </Box>
        </Grid>
    </Grid>
  
  )
}

export default ChangePassword