import React, {useEffect, useState} from 'react'
import AnnounceCss from  './Announce.css'
import { IoIosClose } from "react-icons/io";


const Announce = () => {
const [announceStyle, setAnnounceStyle] = useState(AnnounceCss)

const handleClose =()=>{
  setAnnounceStyle(false)
}

 const [offerData, setOfferData] = useState({top_note:""})

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
       setOfferData(resp.webview[0])
      }
    ).catch(error => console.log(error))
},[])



  return (
    <div className='a-announce' >
    {announceStyle ? <div className='a-announce notify'>
    <h2>{offerData.top_note}
    <IoIosClose className="iconClose" onClick={handleClose}/></h2>
    </div>: null}
</div>
  )
}

export default Announce