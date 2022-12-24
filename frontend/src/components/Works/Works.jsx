import React, {useContext, useState, useEffect} from 'react'
import './Works.css'
import Upwork from "./Img/work1.png";
import Fiverr from "./Img/work2.png";
import Amazon from "./Img/work3.png";
import Shopify from "./Img/work4.png";
import Facebook from "./Img/work5.png";
import { themeContext } from '../../Context';
import { motion } from "framer-motion";
import axios from "axios";

const Works = () => {

  const [users, setUsers] = useState([])
  useEffect(()=> {
    async function getAllUsers(){
      try {
        const users = await axios("http://127.0.0.1:8000/users/")
        console.log(users.data)
        setUsers(users.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
  }, []) 


  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
   <div className="works">
   <div className="w-left">
        <div className="w-ourservices">
            <span style={{ background: darkMode? 'white':'' }}> Why to choose </span>
            <span>NoDoubts Academy?</span>
            <br/>
           <span><ul>
                  <li>One-on-one Teaching</li>
                  <li>Personalized Assistance</li>
                  <li>Homely Ambience</li>
                  <li>Constant Feedback</li>
                  <li>Flexible Schedule</li>
                  <li>Cost Efficient</li>
                  <li>No Travelling</li>
                  <li>Least Distraction</li>
              </ul>
          </span>
          {
            users.map((user, index) => {
              return (
                <span key = {index}>{user.username} {user.email}</span>
              )

            })
          }
            
            {/*<Link to="contact" smooth={true} spy={true}>
            <button className="button s-button">Hire Me</button>
  </Link>*/}
       
        <div className="i-blur s-blur1" style={{ background: "#ABF1FF94" }}>
        </div>
      </div>
    </div>
      
    {/*Right Side */}
    <div className="w-right">
        <motion.div 
        initial={{ rotate: 45 }}
        whileInView={{ rotate: 0 }}
        viewport={{ margin: "-40px" }}
        transition={{ duration: 3.5, type: "spring" }}
        className="w-mainCircle">
            <div className="w-secCircle">
            <img src={Upwork} alt=""  />
            </div>
            <div className="w-secCircle">
            <img src={Fiverr} alt=""  /></div>
            <div className="w-secCircle">
            <img src={Amazon} alt=""  /></div>
            <div className="w-secCircle">
            <img src={Shopify} alt=""  /></div>
            <div className="w-secCircle">
            <img src={Facebook} alt=""  /></div>
         
         </motion.div>
         
         {/*BackGround Circle */}
         <div className="w-backCircle blueCircle" >
         </div>
         <div className="w-backCircle yellowCircle">
         </div>
    </div>
 </div>
  )
}

export default Works