import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useGetLoggedUserQuery, useUpdateProfileDataMutation} from '../../services/userAuthApi';
import { getToken, storeToken} from '../../services/LocalStorageService';
import { useDispatch} from 'react-redux';
import { NavLink, useNavigate} from 'react-router-dom';
import { setUserInfo } from '../../features/userSlice';


export const AccountProfileDetails = (props) => {
  const dispatch = useDispatch()
  const {access_token} = getToken()
  console.log(access_token)
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  console.log(data)
  

//create local state 
const [userData, setUserData]= useState({id:"", email:"", firstname: "", lastname: "", contact: "", gender: "", usertype:"" })
    

//Store  User data In Local State
useEffect(()=>{
if(data && isSuccess)
{
  setUserData({id: data.id, email: data.email, firstname: data.firstname, lastname: data.lastname, contact:data.contact, gender:data.gender, usertype:data.usertype})
}
},[data, isSuccess])
    
//Store User data In Redux State
//set data using dispatch but access data by using useSelect
useEffect(()=>{
  if(data && isSuccess)
  {
    dispatch(setUserInfo({id: data.id, email: data.email, firstname: data.firstname, lastname: data.lastname, contact:data.contact, gender:data.gender, usertype:data.usertype}))
      
  }
},[data, isSuccess])
    
//************************************************************************/
    //Getting User Data from Redux Store
    // const myData = useSelector(state => state.user)
    // console.log("Change Password", myData)

    
//*************************************************************************/  
  // const [values, setValues] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   phone: "",
  //   gender: "",
  //   usertype: ""
  // });

const handleChange = (event) => {
  event.preventDefault(); 
  setUserData(event.target.value);
 
};
//*********************************************************************/
const navigate = useNavigate()
const [server_error, setServerError] = useState({})
const [updateUser, {isLoading}] = useUpdateProfileDataMutation()


const handleUpdate = async (e)=>{
  e.preventDefault();
 // form se data ko yaha lena hai Webapi se FormData() milta hai official doc me check kar sakte hai
  // or iske jaghat state bana ke bh use kar sakte hai. 
  const data = new FormData(e.currentTarget);
  const updateData = {
      id: data.get('id'),
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      contact: data.get('contact'),
  }
  
  console.log("Updatedata:-", updateData)
  const id = updateData.id
  console.log("id:-", id)
  
  const res = await updateUser({updateData, id})
  console.log(res)
  //res pe response milega
 if(res.error){
  console.log(res.error.data.errors)
  setServerError(res.error.data.errors)
  console.log(server_error.usertype)
 }

 if(res.data ){
  console.log(res.data)
  storeToken(res.data.token)
  window.location.reload();
  
}
}
return (
  <Box component='form'  noValidate sx={{ mt:1 }} id='profile-form' onSubmit={handleUpdate}>
    <Card>
      <CardHeader  subheader="The information can be edited" title="Profile"/>
      <Divider />
      <CardContent>
        <Grid container spacing={3} >
          <Grid item md={6} xs={12} >
          <TextField
          fullWidth
          label="ID"
          name="id"
          required
          value={userData.id}
          hidden
        />
            <TextField
              fullWidth
              label="First name"
              name="firstname"
              required
              value={userData.firstname}
              onChange={handleChange}
             
            />
            {server_error.firstname ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.firstname[0]}</Typography> : "" }
            
          </Grid>
          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              label="Last name"
              name="lastname"
              required
              value={userData.lastname}
              onChange={handleChange}
              
            />
            {server_error.lastname ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.lastname[0]}</Typography> : "" }
          </Grid>
          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              required
              value={userData.email}
              onChange={handleChange}
            />
            {server_error.email ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.email[0]}</Typography> : "" }
          </Grid>
          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              label="Phone Number"
              name="contact"
              type="number"
              value={userData.contact}
              onChange={handleChange}
            />
            {server_error.contact ? <Typography style={{fontSize:12,color:'red', paddingLeft:10}}>{server_error.contact[0]}</Typography> : "" }
          </Grid>
          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              disabled variant="standard"
              label="Gender"
              name="gender"
              required
              value={userData.gender}
              onChange={handleChange}
            
            />
           
          </Grid>
          <Grid item md={6} xs={12} >
            <TextField
              fullWidth
              disabled variant="standard"
              label = "UserType"
              name="usertype"
              required
              value={userData.usertype}
              onChange={handleChange}
              id="component-disabled"
              
            >
            </TextField>
          </Grid>
          <Grid  item md={6} xs={12} >
            <Button component={NavLink} to='/passwordchange' style= {({isActive})=>{return{backgroundColor:isActive ? '#fb982f' : ''}}} sx={{ mt:4, mx:4, color: 'white', textTransform: 'none' }}>ChangePassword</Button>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      <Button size='small' type='submit' sx={{mt:3, mb:2, px:5}} variant='contained' >Update</Button>
      </Box>
      {server_error.non_field_errors? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
    </Card>
  </Box>
 );
};
  
    