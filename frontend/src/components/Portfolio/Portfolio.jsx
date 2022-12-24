import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import Slider from "react-slick";


const Portfolio = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay:true,
    autoplaySpeed:1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true
        }
      },
     
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  const [galleryImages, setGalleryViewImages] = useState([])
  
  useEffect(()=>
   {
         // getUserData()
       fetch("http://127.0.0.1:8000/api/user/galleryimgdata/", 
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
            console.log(resp.GalleryImage)
            setGalleryViewImages(resp.GalleryImage)
         }
       ).catch(error => console.log(error))
   },[])
 



  return (
  <div className="p-slide" id= "Gallery">
   <div className="p-title" id="portfolio">
    {/* heading */}
    <span>View to </span> 
    <span>Gallery</span>
</div>
{/*Slider*/}
<Slider {...settings}>
{galleryImages.map((gimage, i)=>{
  return(
<div key = {i}>
  <img src={`http://127.0.0.1:8000/.${gimage.galleryimg}`} alt="" srcSet="" />
</div>
  )})}

</Slider>

   </div>
  )
}

export default Portfolio