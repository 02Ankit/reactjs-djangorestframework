import React, { useContext, useEffect, useState } from 'react'
import './Intro.css'
import Facebook from '../../img/Facebook.png' 
import Instagram from '../../img/instagram.png' 
import LinkedIn from '../../img/linkedin.png' 
import Vector1 from '../../img/Vector1.png'
import Vector2 from '../../img/Vector2.png'
import Boy from '../../img/boy.png'
import Thumbup from '../../img/thumbup.png'
import Crown from '../../img/crown.png'
import student from '../../img/student.gif'
import FloatingDiv from '../FloatingDiv/FloatingDiv'
import {motion} from 'framer-motion'
import { themeContext } from '../../Context';

const Intro = () => {
// crearte object from motion 
  const transition = {
    // duration of animation 
    duratin: 2,
    // type of animation 
    type: "spring"
  }

  const [introData, setIntroData] = useState({about_us:""})

  useEffect(()=>
  {
        // getUserData()
      fetch("http://127.0.0.1:8000/api/user/weblist/", 
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
         console.log(resp.webview[0])
         setIntroData(resp.webview[0])
        }
      ).catch(error => console.log(error))
  },[])
  
  const style = {"textAlign": "justify"}
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;



  return (
    <div className="intro mob-intro" id="Intro">
    <div className="i-left">
        <div className="i-name">
        <span style={{color: darkMode? "white": "" }}>Hey! This is</span>
        <span>NoDoubts Academy..</span>
        <span style={style}>
        {introData.about_us}
        </span>
       
        </div>
      {/*  <Link to="contact" smooth={true} spy={true}>
        <button className="button i-button">Hire me</button>
  </Link>*/}


    </div>
    <div className="i-right mob-i-right" id='i-right'>
        <img src={Vector1}  alt=""  />
        <img src={Vector2}  alt="" />
        <img src={Boy}  alt= "" />
        <div className='img_student'>
        <motion.img 
        // pass props
        style={{"zIndex":"-9", "borderRadius":"150%"}}
        initial={{left:"-46%", width: "50rem", height: "50rem" }}
        whileInView={{left:"-30%", width: "25rem", height: "15rem"}}
        transition={transition}
        src={student}  alt= "" />
        </div>

        <motion.div 
        className='floating-div'
        id='floating-crown'
        initial={{top:"-4%, left:'50rem"}}
        whileInView={{left:"55%"}}
        transition={transition}
        style={{top: '-4%', left: '62%'}} >
          <FloatingDiv  image={Crown} text1={"Less Time Struggling,"} text2={"More time learning"}/>
        </motion.div>
        <motion.div 
        className='floating-div '
        id='floating-thumps'
        initial={{left:"18rem, top:'18rem"}}
        whileInView={{left:"3rem"}}
        transition={transition}

        style={{top: '18rem', left: '0rem'}} >
          <FloatingDiv image={Thumbup} text1={"Because grades"} text2={"are not enough.."}/>
        </motion.div>
        <div className="i-icons">
        <a href="https://www.facebook.com/nodoubtsacademy">
        <img src={Facebook} alt="" /></a>
        <a href="https://www.instagram.com/nodoubts_academy/">
        <img src={Instagram}  alt=""  /></a>
        <a href="https://www.linkedin.com/in/nodoubts-academy-b09ba2243/">
        <img src={LinkedIn}  alt=""  /></a>
        </div>
       <div className="i-blur" style={{background:"rgb(230 210 255)"}}>
        </div>
        <div className="i-blur"
        style={{
          background:"#c1f5ff",
          top:"17rem",
          width:"11rem",
          height:"14rem",
          left:"-9rem",
      }}>
      </div>
        
      </div>
    </div>
    
    
  )
}

export default Intro