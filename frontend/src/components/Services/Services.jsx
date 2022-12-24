import React, { useContext, useEffect, useState } from 'react'
import "./Services.css";
import Card from "../Card/Card";
import HeartEmoji from "../../img/home-tuition.png";
import Glasses from "../../img/other-courses.png";
import Humble from "../../img/competetive-exams.jpg";
import { themeContext } from '../../Context';
import { motion } from "framer-motion";
import Resume from './Pdf/nodoubtsacademy_courses-details.pdf'

const Services = () => {
  // context
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  
 const [getUploadPdf, setGetUploadPdf] = useState([])

  useEffect(()=>
  {
        // getUserData()
      fetch("http://127.0.0.1:8000/api/user/uploadpdf/", 
          {
          method: 'GET',
          headers: 
            {
              'Content-type': 'application/json',
              //  'Authorization':''
            }
          }
      ).then(resp => resp.json()).then((resp) => 
        {
         console.log("Pdf", resp.UploadPdf)
         
         setGetUploadPdf(resp.UploadPdf)
        }
      ).catch(error => console.log(error))
  },[])

  return (
    <div className="services" id='Services'>
    <div className="ourservices">
    <span style={{color: darkMode? "white": "" }}>We Provide</span>
    <span>Services</span>
    <span> 
    <ul>
    <li>Home-Tuition: 6th to 10th, 11th to 12th
     <div style={{'fontSize':'16px', 'fontWeight': '500'}}>
        - PCBM<br/>
        - Commerce<br/>
        - Agriculture
     </div>
  </li>
    <li>Additional Courses</li>
    <li>Competitive Exams</li>
    
    </ul>
    </span>
    {getUploadPdf.map((uploadpdf, i) => {
      return (
    <a key ={i} href={`http://127.0.0.1:8000/.${uploadpdf.service_pdf}`} download>
  
    <button className="button s-button">Download Details</button>
  </a>)})}
  <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>

    </div>

    {/* right*/}
    <div className="cards">
        {/* First Card*/}
            <motion.div 
            className='firstCard'
            initial={{ left: "25rem" }}
            whileInView={{ left: "14rem" }}
            transition = {{
              duration: 1,
              type: "spring",
            }}
            >
            <Card
            className="cardone"
            id='firstcard'
            emoji={HeartEmoji}
            heading={"Home Tuitions"}
            detail={<p style={{'fontSize':"14px", 'lineHeight':"30px"}}></p>}
        />
        </motion.div>
    {/* Second Card*/}
            <motion.div
            className='secondCard'
            transition = {{
              duration: 1,
              type: "spring",
            }}
            initial={{ left: "-3rem", top: "12rem" }}
            whileInView={{ left: "2rem" }}
            >
            <Card
            className="cardtwo"
            id='secondcard'
            emoji={Glasses}
            heading={"Additional Courses "}
            detail={<p style={{'fontSize':"14px", 'lineHeight':"30px"}}></p>}
            />
            </motion.div>
    {/*Third Card */}
    <motion.div 
        className='thirdCard'
        initial={{ top: "19rem", left: "25rem" }}
        whileInView={{ left: "20rem" }}
        transition = {{
          duration: 1,
          type: "spring",
        }}
       >
        <Card
        className="cardthree"
        id='thirdcard' 
        emoji={Humble}
        heading={"Competitive Exams "}
        detail={<p style={{'fontSize':"14px", 'lineHeight':"30px"}}></p>
    }
    color="rgba(252, 166, 31, 0.45)" 
    />
    </motion.div>
        <div className="i-blur s-blur2" style={{
            background: "var(--purple)" }}>
        </div>
    </div>
    </div>
  )
}

export default Services