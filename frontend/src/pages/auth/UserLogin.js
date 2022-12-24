import React,{useState} from 'react'
import { TextField, Button, Box, Alert, Typography, CircularProgress} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/authSlice';
import { useEffect } from 'react';

const UserLogin = () => {
    const [server_error, setServerError] = useState({})
    // After submit redirect karne ke liye usenavigate ka use karte hai.
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loginUser, {isLoading}] = useLoginUserMutation()
    
    const handleSubmit = async (e)=>{
        // e.prevent Reload na ho 
        e.preventDefault();    
        // form se data ko yaha lena hai Webapi se FormData() milta hai official doc me check kar sakte hai
        // or iske jaghat state bana ke bh use kar sakte hai. 
        const data = new FormData(e.currentTarget);
        
        const actualData = {
           
            email: data.get('email'),
            password: data.get('password'),
            
        }

        const res = await loginUser(actualData)
        if(res.error){
            setServerError(res.error.data.errors)
        }

        if (res.data){
            // console.log(typeof(res.data))
            console.log(res.data)
            storeToken(res.data.token)
            let {access_token} = getToken()
            dispatch(setUserToken({access_token: access_token}))//redux store ke state me set karte hai. 
            navigate('/dashboard')
        }else{
            navigate('/')
        }
    }

        let {access_token} = getToken()
        //getToken Object return karta hai is liye ise Object me liye hai.
        
        useEffect(() => {
            
          dispatch(setUserToken({ access_token: access_token }))
        }, [access_token, dispatch])
        //jub bhi koi refresh karega to bhi humare token wahi hoga.useEffect() ki madat se
        
  return (
    <div>
    {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : "" }
    
    {server_error.email ? console.log(server_error.email[0]) : "" }

    <Box sx={{mx:2}}>
        <Box component='form' noValidate sx={{ mt:1, mx:2 }} id='login-form' onSubmit={handleSubmit}>
                    
                <TextField InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }} margin='normal' required fullWidth id='email' name='email' label='Email Address'/>

                {server_error.email ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.email[0]}</Typography> : "" }

                <TextField InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }} margin='normal' required fullWidth id='password' name='password' type='password' label='Password'/>

                {server_error.password ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.password[0]}</Typography> : "" }



                <Box textAlign='center'>
                   {isLoading ? <CircularProgress/> :  <Button size='small' type='submit' sx={{mt:3, mb:2, px:5}} variant='contained'>LogIn</Button> }
                </Box>
                <NavLink to='/sendpasswordresetemail'>Forgot Password</NavLink>
                {/*by default Alert green rahta hai aise red ya error ke liye severity='error' karna padega
            
                yaha turnary oerator ka use karenge kyunki status false starting me false rahega */}
           
            </Box>
            {server_error.non_field_errors? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
    </Box>
    </div>
  
  )
}

export default UserLogin