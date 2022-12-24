import React,{useState} from 'react'
import { Grid, TextField, Button, Box, Alert} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../services/LocalStorageService';
import { Typography } from '@material-ui/core';
import { useResetPasswordMutation } from '../../services/userAuthApi';

const ResetPassword = () => {

    const [server_error, setServerError] = useState({})
    const [server_msg, setServerMsg] = useState({})
    const [resetPassword] = useResetPasswordMutation()
    const { id, token } = useParams()
    const navigate = useNavigate()
    console.log(id)
    console.log(token)
    
  const handleSubmit = async (event)=>{

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
        password: data.get('password'),
        password2: data.get('password2')
    }
    

    const res = await resetPassword({actualData, id, token})
            console.log(res.data)
            if (res.error){
                setServerMsg({})
                setServerError(res.error.data.errors)
            }

            if(res.data) {
                console.log(res.data)
                setServerError({})
                setServerMsg(res.data)
                document.getElementById("password-reset-form").reset();
                setTimeout(() => {navigate("/login")
            }, 3000)
        }
}
      return (
        <> 
  

    <Grid container justifyContent={'center'} mt={10}>
        <Grid item  sm={6} xs={12}>
        <Box sx={{display:'flex', flexDirection:'column', flexWrap:'wrap', maxWidth:600,   }}>
        <h4>Reset Password</h4>
            <Box component='form' noValidate sx={{ mt:1 }} id='password-reset-form' onSubmit={handleSubmit}>
                    
            <TextField InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }} margin='normal' required fullWidth id='password' name='password' label='New Password' type='password'/>

            {server_error.password ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.password[0]}</Typography> : "" }

            <TextField InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }} margin='normal' required fullWidth id='password2' name='password2' label='New Confirm Password' type='password'/>
            
            {server_error.password2 ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.password2[0]}</Typography> : "" }

            <Box textAlign='center'>
                <Button size='small' type='submit' sx={{mt:3, mb:2, px:5}} variant='contained'>Save</Button>
            </Box>
           
            {/*by default Alert green rahta hai aise red ya error ke liye severity='error' karna padega
    
            yaha turnary oerator ka use karenge kyunki status false starting me false rahega */}
            {server_error.non_field_errors? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
            {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''}
        </Box>
        </Box>
        </Grid>
    </Grid></>
      
      )

}

export default ResetPassword