import React from 'react'
import "./App.css";
import {BrowserRouter as  Router, Routes, Route, Navigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Home"
import LoginReg from './pages/auth/LoginReg';
import SendPasswordResetEmail from './pages/auth/SendPasswordResetEmail';
import Dashboard from './UserComponent/BodyComponent/Dashboard/Dashboard';
import ResetPassword from './pages/auth/ResetPassword';
import Layout from './pages/Layout';
import  Notification  from './UserComponent/BodyComponent/Notifications/Notification';
import Studentlist from './UserComponent/BodyComponent/Students/Studentlist';
import Websettings from './UserComponent/BodyComponent/WebSettings/Websettings';
// import Enquirylist from './UserComponent/BodyComponent/PaymentSetting/PaymentSetting';
import HeaderComponent from './UserComponent/UserHeader/HeaderComponent/HeaderComponent';
import { AccountProfile } from './UserComponent/MyAccount/account-profile';
import TeacherList from './UserComponent/BodyComponent/Teachers/TeacherList';
import { useSelector } from 'react-redux';
import ChangePassword from './pages/auth/ChangePassword';
import PaymentStatus from './UserComponent/BodyComponent/PaymentStatus/PaymentStatus';
import PaymentSetting from './UserComponent/BodyComponent/PaymentSetting/PaymentSetting';

const App = () => {
 const {access_token} = useSelector(state => state.auth )
 
  return (
    <div >
    <Router>
      <Routes>
        <Route exact path = "/">
          <Route index element = {<Home/>}/>
        </Route>
        
      {/* Login and registration path for Admin/User credential */} 
        <Route exact path = "/" element = {<Layout/>} >
          <Route path = "loginreg" element = {
            access_token ? <Navigate to = '/dashboard' />: <LoginReg />} />
          <Route path = "sendpasswordresetemail" element = {<SendPasswordResetEmail/>} />
          <Route path = "api/user/reset/:id/:token/" element = {<ResetPassword/>} />
          <Route path = "passwordchange" element = {<ChangePassword />} />
        </Route>
       
        <Route exact path = "/" element = {<HeaderComponent/>}>
          <Route  path="/dashboard" element= {<Dashboard />} />

          <Route  path="/dashboard/teachers" element={ <TeacherList />} />
          <Route  path="/dashboard/students" element={ <Studentlist />} />
          <Route  path="/dashboard/notifications" element={ <Notification />} />
          <Route  path="/dashboard/paystatus" element={ <PaymentStatus />} />
          <Route  path="/dashboard/paymentsetting" element={ <PaymentSetting />} />
          <Route  path="/dashboard/websettings" element={ <Websettings />} />
          <Route  path="/dashboard/account" element={ <AccountProfile />} />
        </Route>
        
   
       {/* ka use agar koi url me galat page name dalta hai to 404 page Error show hoga <Route path="*" element={<h1/>Error 404 page not found!!</h1>} />*/}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
    </div>
   
  )
}

export default App