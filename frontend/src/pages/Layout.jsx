import React from "react";
import  {CssBaseline} from "@mui/material"
import {Navigate, Outlet}  from "react-router-dom"
import UserNav from "../UserComponent/UserNav";
import { useSelector } from 'react-redux';


const Layout = () => {
  const {access_token} = useSelector(state => state.auth )
  return( 
  <div>
    <CssBaseline/>
    <UserNav/>
   <Outlet/>{/*Outlet me url ke Child path ko rakhta hai*/}
  </div>
  )
}

export default Layout