import React, {useContext, useRef} from "react"
import './Contact.css'
import { themeContext } from "../../Context";
import emailjs from '@emailjs/browser';
import { useState } from "react";
import nodoubtsLogo from '../../img/nodlogo.png'

const Contact = () => {
  const {done, setDone} = useState(false);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_1vjco0h', 'template_3eyoq7r', form.current, '7Sd-V8GjR8uT07pCg')
      .then((result) => {
          console.log(result.text);
          console.log("email successfuly Done")
          setDone(true)
          

       }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
     
    };
   
  return (
    <div className="contact-form" id="Contact">
       <div className="w-left c-left">
            <div className="ourservices">
            {/* darkMode */}
            <span style={{color: darkMode? "white": ""}}>Get in Touch</span>
            <span>Contact us</span>
            <div
                className="blur s-blur1"
                style={{ background: "#ABF1FF94" }}
            ></div>
            </div>
        </div>
        <div className="c-right">
        {/* senEmail function will be call when you click button*/}
            <div className="c-logo">
            <img src={nodoubtsLogo} alt="" srcSet="" />
            
            </div>
        <form ref = {form} onSubmit={sendEmail}>
         {/*email template and form name should be same remmember */}
          <input type="text" name="user_name" className="user"  placeholder="Name"/>
          <input type="email" name="user_email" className="user" placeholder="Email"/>
          <input type="number" name="user_number" className="user" placeholder="Number"/>
          <textarea name="message" className="user" placeholder="Message"/>
          <input type="submit" value="Send" className="button"/>
          
          <div
            className="blur c-blur1"
            style={{ background: "var(--purple)" }}
          ></div>
          <span>{done && "Thanks for Contacting NoDoubtsAcademy!"}</span>
        </form>

      </div>
    </div>
  )
}

export default Contact