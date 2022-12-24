import { Box } from '@mui/material';
import React,{useEffect, useState} from 'react'

import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import LogOutDashboard from './LogOutDash';
import { getToken} from '../../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
import TeacherDashboard from './TeacherDashboard';

const Dashboard = () => {

  const {access_token} = getToken()
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  const [userData, setUserData]= useState({email:"", firstname:"", is_admin:false, usertype:""})
 


  useEffect(()=>{
    if(data && isSuccess)
    {
        setUserData({email: data.email, firstname: data.firstname, is_admin:data.is_admin, usertype:data.usertype})
    }
},[data, isSuccess])
console.log("DashBoard", access_token)
console.log("userData", userData)

// const handleLogout = ()=>{
  
//       dispatch(unsetUserInfo({email:"", firstname: "", lastname: "", 
//   contact: "", gender: "", usertype: ""}))
//   dispatch(unSetUserToken({access_token: null}))
//   removeToken() 
//   console.log("Logout system")
  
//   }
const [loading, setLoading] = useState(false);
useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);
}, []);

 return  (
  <div>{loading ? (
    <div className="loader-container">
      <div className="spinner"></div>
    </div>
  ):(
      <Box>
        {userData.is_admin !== true ? (userData.usertype == 'student' ? 
        (<UserDashboard/>):(userData.usertype == 'teacher' ? 
        (<TeacherDashboard/>):(<LogOutDashboard/>))) : (<AdminDashboard/>)
        }
        </Box>)
      }
  </div>
 )
}


export default Dashboard