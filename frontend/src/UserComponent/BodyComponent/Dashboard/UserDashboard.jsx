import { CssBaseline, Grid, Box, Card, CardContent, Typography, Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { getToken } from '../../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
// import UserNav from '../../UserComponent/UserNav'

import { useStyles } from '../BodyStyle/BodyStyles';
import AdminPageTitle from '../Common/AdminPageTitle';
import Vector1 from "./Imgs/img1.gif"
import Footer from '../../../components/Footer/Footer';

const UserDashboard = () => {
  const {access_token} = getToken()
  console.log(access_token)
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  console.log(data)

  const [studentList, setStudentList ] = useState({id:"", usernote:"", firstname:"", lastname:"" })

  useEffect(()=>{
    if(data && isSuccess)
    {
      setStudentList({id: data.id, usernote:data.usernote, firstname:data.firstname, lastname:data.lastname})
    }
    },[data, isSuccess])

  // Styling Section Hooks
    const classes = useStyles();


  return  (
      <Box> 
          <CssBaseline/> {/* CssBaseline ka use css reset karne ke liye hota hai*/}

          <Box  style={{marginTop:'70px',marginBottom:'40px'}}>
          <AdminPageTitle  
          label='User Dashboard' title='Website Info ' />
          <Grid >
          <Card style={{marginTop:'30px',marginBottom:'40px'}}>
            <CardContent>
            <Box>
            <h2 style= {{fontSize:"20px", color:"red" , underline:'4px'}}>Notice:-</h2>
                <Typography className = 'border'  style= {{ border: '1px solid blue', fontSize:"20px", color:"blue", boxShadow: "1px 3px 1px #FCA61F"}}>
                    <span style= {{fontSize:"20px", color:"blue", marginLeft:"10px"}}>{studentList.usernote}</span>
                </Typography>
                <Box >
                </Box>
              </Box>
            </CardContent>
          </Card>
          </Grid>
          </Box>
          <Box mt={2} mb={2}>
          <Grid style= {{marginTop:"20px", marginBottom:'20px'}}>
            <Grid >
                <Card>
                  <CardContent className={classes.displayCard}>
                    <Box > 
                    <img className="d-block w-100"
                    src={Vector1}
                    alt="First slide"
                  />
                  </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} mb={2}>
            <Grid style= {{marginTop:"20px", marginBottom:'20px'}}>
                <Card>
                    <CardContent className={classes.displayCard}> 
                    <Grid item md={3} xs={12} style= {{margin:'20px'}}>
                      <Typography style= {{ border: '1px solid #FCA61F', fontSize:"20px", color:"#FCA61F",borderRadius:'20px', boxShadow: "1px 3px 1px #FCA61F"}}> 
                      <h2 style= {{fontSize:"20px", color:"blue", marginLeft:"10px"}}>Hello { studentList.firstname +" "+ studentList.lastname}
                      </h2>
                      </Typography></Grid>
                    </CardContent>
                </Card>
              </Grid>
          </Box>
      </Box>
    )
  }   

export default UserDashboard