import React, {useContext, useEffect, useState} from 'react';
import { themeContext } from '../../Context';
import "./Experience.css";

const Experience = () => {

  const [experienceData, setExperienceData] = useState({session_conduct:"", our_teachers:"", our_students:""})

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
         setExperienceData(resp.webview[0])
        }
      ).catch(error => console.log(error))
  },[])




  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  
  return (
    <div className="experience" id='experience'>
    <div className="achievement">
      {/* darkMode */}
      <div className="circle" style={{color: darkMode? 'var(--orange)': ""}}>{experienceData.session_conduct}+</div>
      <span style={{color: darkMode? "white": ""}}>Sessions </span>
      <span>Conducts</span>
    </div>
    <div className="achievement">
      <div className="circle" style={{color: darkMode? 'var(--orange)': ""}}>{experienceData.our_students}+</div>
      <span style={{color: darkMode? 'white': ""}}>Our</span>
      <span>Students</span>
    </div>
    <div className="achievement">
      <div className="circle" style={{color: darkMode? 'var(--orange)': ""}}>{experienceData.our_teachers}+</div>
      <span style={{color: darkMode? 'white': ""}}>Our</span>
      <span>Teachers</span>
    </div>
  </div>
  )
}

export default Experience