import { CssBaseline, Grid, Box, Card, CardContent, Typography, Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { getToken } from '../../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
// import UserNav from '../../UserComponent/UserNav'

import { useStyles } from '../BodyStyle/BodyStyles';
import AdminPageTitle from '../Common/AdminPageTitle';
import Vector1 from "./Imgs/qr_code.png"
import Footer from '../../../components/Footer/Footer';

const PaymentStatus = () => {

  // Styling Section CustomHooks
    const classes = useStyles();

    const {access_token} = getToken()
    console.log(access_token)
    const {data, isSuccess} = useGetLoggedUserQuery(access_token)
    console.log(data)
  
    const [studentList, setStudentList ] = useState({id:"", paystatus:"", firstname:"", lastname:"" })
  
    useEffect(()=>{
      if(data && isSuccess)
      {
        setStudentList({id: data.id, paystatus:data.paystatus, firstname:data.firstname, lastname:data.lastname})
      }
      },[data, isSuccess])
  
    

    const [unpay,setunpay]= useState({unpaidstatus:""})
    const unpayStatus = [{

      unpaidstatus:"After  Successfully Payment Through QR Code/Upi, Our Team will be take 24 Hours For Review Payment Status "
    }]
    
    useEffect(()=>{
      if(unpayStatus){
        setunpay(unpayStatus[0])
        }
    },[])
   
    let paidCondition = null;

    if(studentList.paystatus === "paid"){
      paidCondition = <Typography className = 'border'  style= {{ border: '1px solid blue', fontSize:"20px", color:"blue", boxShadow: "1px 3px 1px #FCA61F"}}>
      <h5 style= {{fontSize:"40px", color:"green", marginLeft:"10px"}}>{studentList.paystatus}</h5>
  </Typography>
    }else {

      paidCondition = <Typography className = 'border'  style= {{ border: '1px solid blue', fontSize:"20px", color:"blue", boxShadow: "1px 3px 1px #FCA61F"}}>
      <h5 style= {{fontSize:"20px", color:"blue", marginLeft:"10px"}}>{unpay.unpaidstatus}</h5>
  </Typography>
    }
    
    const [filteredQrCodeImgData, setFilteredQrCodeImgData] = useState([])
    useEffect(()=>
    {
          // getUserData()
        fetch("http://127.0.0.1:8000/api/user/qrcodeimgdata/", 
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
          
           
           setFilteredQrCodeImgData(resp.Image)
          }
        ).catch(error => console.log(error))
    },[])

    console.log("QRImage",filteredQrCodeImgData)

    return  (
        <Box> 
            <CssBaseline/> {/* CssBaseline ka use css reset karne ke liye hota hai*/}
          
            <Box  style={{marginTop:'70px',marginBottom:'40px'}}>
            <AdminPageTitle  
            label='User Dashboard' title='Website Info ' />
            <Grid container spacing={3}>
            <Grid  item md={6}>
            <Card style={{marginTop:'30px',marginBottom:'40px'}}>
              <CardContent>
              <Box>
              <span style= {{fontSize:"20px", color:"red" , underline:'4px'}}>Payment Status:-</span>
                  {paidCondition}
                  <Box >
                  </Box>
                </Box>
              </CardContent>
            </Card>
             {/* Payment Terms And Conditions Section Start */}
                <Box mt={2} mb={2}>
                    <Card>
                        <CardContent className={classes.displayPaymentTerms}> 
                          <Grid item md={6} xs={12} style= {{margin:'20px'}}>
                              <Typography style= {{ border: '1px solid #FCA61F', fontSize:"20px", color:"#FCA61F",borderRadius:'20px', boxShadow: "1px 3px 1px #FCA61F"}}> 
                                <h2 style= {{fontSize:"20px", color:"blue", marginLeft:"10px"}}>Hello  
                                {studentList.firstname +" "+ studentList.lastname}
                                </h2>
                              </Typography>
                          </Grid>
                          <Box sx={{dispaly:'flex'}}>
                            <h2 style= {{fontSize:"18px", color:"red", marginLeft:"10px"}}>Payment Terms And Conditions:- 
                            </h2>
                            <h2 style= {{fontSize:"16px", color:"blue", marginLeft:"10px"}}>This payment is Only For Students  
                            </h2>
                          </Box>
                        </CardContent>
                    </Card>
                  
              </Box>
           {/* Payment Terms And Conditions Section End*/}
            </Grid>

            <Grid item md={6} >
                <Card>
                  <CardContent className={classes.displayVerticalImg}>
                  {filteredQrCodeImgData.map((qrimage, i) => (
                    <Box key={i} > 
                    
                    <img style= {{height:"250px", width:"150px", marginTop:"30px"}} className="d-block w-100"
                    src={`http://127.0.0.1:8000/.${qrimage.qrcodeimg}`}
                    alt="First slide"
                  />
                  </Box>))}
                  </CardContent>
                </Card>
              </Grid>
              </Grid>
            </Box>
            

        </Box>
      )
    }   

export default PaymentStatus