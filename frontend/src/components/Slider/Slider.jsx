import React, { useEffect, useState } from 'react'

import "./Slider.css"
import Carousel from 'react-bootstrap/Carousel'
import Vector1 from "./Imgs/img1.gif"
import Vector2 from "./Imgs/img2.gif"
import Vector3 from "./Imgs/img3.gif"
import Vector4 from "./Imgs/img4.gif"

const Slider = () => {

  const [bannerViewImages, setBannerViewImages] = useState([])
  
  useEffect(()=>
   {
         // getUserData()
       fetch("http://127.0.0.1:8000/api/user/bannerimgdata/", 
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
         
          setBannerViewImages(resp.Image)
         }
       ).catch(error => console.log(error))
   },[])



  return (
    <div className='carousel'>
    <Carousel fade>
    
    {bannerViewImages.map((bimage, i)=>(
      <Carousel.Item  key ={i} interval ="4000">
      <img className="d-block w-100"
      alt="First slide"
      src={`http://127.0.0.1:8000/.${bimage.bannerimg}`} />

     <Carousel.Caption>
      
      {  /*<h3>First slide label</h3>
  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
      </Carousel.Caption>
    </Carousel.Item>
  ))}
    
   
  </Carousel>
    </div>
  )
}

export default Slider