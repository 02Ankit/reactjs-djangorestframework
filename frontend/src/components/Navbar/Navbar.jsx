import React, {useContext} from 'react'
import Toggle from '../Toggle/Toggle'
import './Navbar.css'
import { Link } from 'react-scroll'; 
import nodoubtsLogo from '../../img/nodlogo.png'
import { BsListTask } from "react-icons/bs";
import { themeContext } from '../../Context';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../services/LocalStorageService';



const Navbar = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const { access_token } = getToken()

  return (
<div className='container-fluid  wrapper-box bg-dark'>
<div className='row nav-row'>
  <div className='col-12 mx-auto' >

      <nav style={{ background: darkMode? 'black':'' }} className="navbar navbar-expand-sm main-nav">
          <div className="container-fluid  navmenu responsive">
              <div className="n-left" id='n-mob'>
                    <div className="n-name ms-auto" >
                        <img src={nodoubtsLogo} alt="" srcSet="" />
                    </div>
                   <Toggle />
              </div>
              
              <button 
              type="button"
              className="navbar-toggler" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarCollapse">
              <BsListTask 
              className="listTask"
              style={{color:"white"}}/>
                   {/*<span className="navbar-toggler-icon"></span>*/ }               
              </button>

            <div className="collapse  navbar-collapse"            id="navbarCollapse">
                  <div className="n-list ms-auto">
                      <ul className="navbar-nav  mb-2 mb-lg-0">
                        <Link  className="nav-link active" spy = {true} to = 'Home' smooth={true} >
                          <li style={{ color: darkMode? 'grey':'' }}>Home</li>
                          </Link>

                          <Link className="nav-link " spy = {true} to = 'Intro' smooth={true} >
                          <li className="nav-item">About</li>
                          </Link>

                          <Link className="nav-link" spy = {true} to = 'Services' smooth={true} >
                          <li className="nav-item">Services</li>
                          </Link>
                          
                          <Link className="nav-link" spy = {true} to = 'Testimonials' smooth={true} >
                          <li className="nav-item">Testimonials</li>
                          </Link>

                          <Link className="nav-link " spy = {true} to = 'Gallery' smooth={true} >
                          <li className="nav-item">Gallery</li>
                          </Link>
                          <Link className="nav-link " spy = {true} to = 'Contact' smooth={true} >
                          <li className="nav-item">Contact</li>
                          </Link>
        {access_token ?  
          <NavLink className="nav-link " to = '/dashboard' smooth={true} ><button className="button n-button" id='dashboard'>Dashboard</button></NavLink> : <NavLink className="nav-link " to = '/loginreg' smooth={true} ><button className="button n-button" id='loginreg'>LogIn / Registration</button></NavLink>
        }                  
       
        

  {/*<Link className="nav-link " spy = {true} to = 'Login' smooth={true} ><button className="button n-button " id='login'>Login</button></Link>*/}
                      </ul>
                  </div>
              </div>
              
          </div>
      </nav>
  </div>
</div>
</div>




// {/*<div className="n-wrapper wrapper-box">
//         <div className="n-left">
//             <div className="n-name"><img style={{}
//                 height: '50px', width: '120%', 'margin-top':'5px','border-radius': '10px' 
//             }} src={nodoubtsLogo} alt="" srcset="" /></div>
//             <Toggle />
//         </div>
//     <div className="n-right">
//         <div className="n-list">
//             <ul style={{listStyleType: 'none'}}>
//             <Link spy = {true} to = 'Navbar' smooth={true} activeClass='activeClass'><li>Home</li></Link>
//             <Link spy = {true} to = 'Intro' smooth={true}> <li>About</li></Link>
//             <Link spy = {true} to = 'Services' smooth={true}> <li>Services</li></Link>
//             <Link spy = {true} to = 'Testimonials' smooth={true} ><li>Testimonials</li></Link>
//             <Link spy = {true} to = 'Testimonials' smooth={true} ><li>LogIn</li></Link>
//             <Link spy = {true} to = 'Testimonials' smooth={true} ><li>SignUp</li></Link>
//             </ul>

//         </div>
//         <Link spy = {true} to = 'Contact' smooth={true} ><button className="button n-button">Contact</button></Link>
         
//     </div>
  //   </div>*/}
  )
}

export default Navbar