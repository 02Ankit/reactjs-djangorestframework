import { CssBaseline, Grid, Box, Card, CardContent, Typography} from '@mui/material'
import React,{useEffect, useState} from 'react'
import { getToken } from '../../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
// import UserNav from '../../UserComponent/UserNav'

import { useStyles } from '../BodyStyle/BodyStyles';
import AdminPageTitle from '../Common/AdminPageTitle';
import Vector1 from "./Imgs/img1.gif"




const TeacherDashboard = () => {
    const classes = useStyles();
    const {access_token} = getToken()
    const {data, isSuccess} = useGetLoggedUserQuery(access_token)
    
  
    const [teacherList, setTeacherList ] = useState({id:"", usernote:"" })
  
    useEffect(()=>{
      if(data && isSuccess)
      {
        setTeacherList({id: data.id, usernote: data.usernote, firstname:data.firstname, lastname: data.lastname})
      }
      },[data])
      
    return  (
      <Box> 
      <CssBaseline/> {/* CssBaseline ka use css reset karne ke liye hota hai*/}

      <Box  style={{marginTop:'90px',marginBottom:'40px'}}>
      <AdminPageTitle  
       label='User Dashboard' title='Website Info ' />
      <Grid >
      <Card style={{marginTop:'30px',marginBottom:'40px'}}>
        <CardContent>
        
         <Box>
         <h2 style= {{fontSize:"20px", color:"red" , underline:'4px'}}>Notice:-</h2>
            <Typography className = 'border'  style= {{ border: '1px solid blue', fontSize:"20px", color:"blue", boxShadow: "1px 3px 1px #FCA61F"}}>
                <h5 style= {{fontSize:"20px", color:"blue", marginLeft:"10px"}}>{teacherList.usernote}</h5>
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
                      <h2 style= {{fontSize:"20px", color:"blue", marginLeft:"10px"}}>Hello { teacherList.firstname +" "+ teacherList.lastname}
                      </h2>
                      </Typography></Grid>
                    </CardContent>
                </Card>
              </Grid>
          </Box>
      </Box>
    )
  }

export default TeacherDashboard