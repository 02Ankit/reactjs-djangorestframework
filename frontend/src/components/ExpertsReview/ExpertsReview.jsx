import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaFacebookF } from "react-icons/fa";
import {FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { themeContext } from '../../Context';

// import { baseUrl } from "./config";
import "./ExpertsReview.css"

const ExpertsReview = () => {
    
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

    const settings = {

        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
       cssEase:"linear",
       autoplay:true,
       autoplaySpeed:1500,
        responsive: [
          
           
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      }
      const [expertImages, setExpertViewImages] = useState([])
  
      useEffect(()=>
       {
             // getUserData()
           fetch("http://127.0.0.1:8000/api/user/expertimgdata/", 
               {
               method: 'GET',
               headers: 
                 {
                   'Content-type': 'application/json',
                   //  'Authorization':''
                 }
               }
           ).then(resp => resp.json()).then((resp) => 
             {  console.log(resp)
                console.log(resp.ExpertImage)
                setExpertViewImages(resp.ExpertImage)
             }
           ).catch(error => console.log(error))
       },[])
     
  return (
    <div className="expertSlider">
            <div className="e-name">
                <span style={{color: darkMode? "white": ""}}>What Experts Say About Us!!! </span>
                <span>Review </span>
            </div>
            
        <Slider {...settings} className="slider-first">
        {expertImages.map((eimage, i)=>{
          return(
            <div key= {i} className="e-card-wrapper">
            <div className="e-card">
                <div  className="e-card-img">
                    <img src={`http://127.0.0.1:8000/.${eimage.expertimg}`} alt=""/>
                </div>
             </div>
        </div> 
          )})}
      </Slider>
      </div>
  )
}

export default ExpertsReview