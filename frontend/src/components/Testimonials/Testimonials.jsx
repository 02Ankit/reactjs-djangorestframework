import React, {useContext, useEffect, useState} from "react";
import "./Testimonials.css";
import { themeContext } from "../../Context";
import Slider from "react-slick";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";



const PreviousBtn = (props) => {

const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};

const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "gray", fontSize: "45px" }} />
    </div>
  );
};


const Testimonials = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;


 
  const [testimonialList, setTestimonialList] = useState([])

  useEffect(()=>
 {
       // getUserData()
     fetch("http://127.0.0.1:8000/api/user/testimonial/", 
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
        console.log("respTestimonialsList",resp.Testimonial)
        setTestimonialList(resp.Testimonial)
       }
     ).catch(error => console.log(error))
 },[])

return (
    <div className="testimonial" id='Testimonials'>    

          <div className="t-heading">
          <span>From the Parents end... </span>
          <span>Testimonials </span>
          </div>


    <div className = 't-slider' >
          
      <div className="t-blur t-blur1" style={{ background: darkMode? "black":'' }}>
      </div>
      <div className="t-blur t-blur2" style={{ background:  darkMode? "black":'' }}>
      </div>
            <Slider
             prevArrow={<PreviousBtn />} 
             nextArrow=  {<NextBtn />} 
             dots
             autoplay = {true}
             autoplaySpeed = {2500}
             >
              {testimonialList.map((client, i) => {
              return (
                <div key={i}>
                <Card img= {`http://127.0.0.1:8000/.${client.gardian_pic}`} name = {client.gardian_name} review = {client.gardian_comment} />
                
                </div>
                );
              })}
            </Slider>  
      </div>
</div>
)
}

const Card = ({img, review, name }) => {
    
return (
    <div 
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "gray",
      }}
    >

      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={img}
        style={{
          width: 120,
          height: 120,
          border: "1px solid lightgray",
          padding: 7,
          marginBottom: 20,
        }}
      />
      <p>

      <span>{review}</span>
      </p>
      <p style={{ fontStyle: "italic", marginTop: 25 }}>
        <span style={{ fontWeight: 500, color: "green" }}>{name}-</span> 
        Parent
      </p>
    </div>
  );
};

export default Testimonials