import { blue, green, lightBlue, red, teal } from '@material-ui/core/colors';
import { CssBaseline, Grid, Box, Card, CardContent, Typography, Button } from '@mui/material'
import React,{useEffect, Fragment} from 'react'
// import UserNav from '../../UserComponent/UserNav'
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { useStyles } from '../BodyStyle/BodyStyles';
import AdminPageTitle from '../Common/AdminPageTitle';
import { GraphComponent } from '../Common/GraphComponent';
import {fakeArrayGenrator} from '../Common/FakeArrayGenerator';

const AdminDashboard = () => {
    const classes = useStyles();


    const DisplayData = [
      {
        label: "Post",
        // value: randomValueGenrator({ length:2, digit: 100 }),
        value: "2,390",
        icon: <ArrowDropUpIcon />,
        iconLabel: "7%",
      },
      {
        label: "Pages",
        // value:randomValueGenrator({  digit: 100 }),
        value: "180",
        icon: <ArrowDropUpIcon />,
        iconLabel: "5.3%",
      },
      {
        label: "New Visitor",
        // value: randomValueGenrator({  digit: 100 }),
        value: "480",
        icon: <ArrowDropDownIcon />,
        iconLabel: "4.1%",
      },
      {
        label: "Total Visitor",
        // value: randomValueGenrator({  digit: 100 }),
        value: "37450",
        icon: <ArrowDropDownIcon />,
        iconLabel: "2.5%",
      },
    ];
  
    const GraphData = [
      {
        label: "Post",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: lightBlue["A50"],
        brColor: blue["A200"],
      },
      {
        label: "Pages",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: blue["A50"],
        brColor: blue["A700"],
      },
      {
        label: "New Visitor",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: green["A50"],
        brColor: green["A400"],
      },
      {
        label: "Total Visitor",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: teal["A50"],
        brColor: teal["A400"],
      },
    ];
  
    
      
   
    return  (
  <Box style={{marginTop:'70px',marginBottom:'40px'}}> 
      <CssBaseline/> {/* CssBaseline ka use css reset karne ke liye hota hai*/}
      <Box mt={2}>
      {/* //title section  */}
      <AdminPageTitle 
       label='Dashboard' title='Website Info ' />
  
      <Grid container  spacing={1} className={classes.section}>
  
        {DisplayData.map((item, i) => (
          <Grid key={i} item xs={6} sm={3} md={3}>
            <Card>
              <CardContent className={classes.displayCard}>
                <canvas
                  id={item.label}
                  className={classes.displayCardGraph}>
                  
                  </canvas>
                <Box className={classes.cardDataContent}>
                  <Typography
                    variant='subtitle2'
                    className={classes.cardLabel}
                    gutterBottom={true}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant='h4'
                    component='h2'
                    className={classes.cardHeader}>
                    {item.value}
                  </Typography>
                  <Box className={classes.ratio}>
                    <Button
                      startIcon={item.icon}
                      size='small'
                      style={{
                        color: item.label[0] === "P" ? green[700] : red[400],
                        fontSize: "1.1rem",
                      }}>
                      {item.iconLabel}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid  item xs={6} sm={3} md={3}>
        <Card>
          <CardContent>
            <canvas>
              
              </canvas>
            <Box >
              <Typography
                variant='subtitle2'
               
                gutterBottom={true}>
               
              </Typography>
              <Typography>
              
              </Typography>
              <Box >
                <Button
                  size='small'
                  >
                  
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
  
      {/* section blog graph  */}
      
    </Box>  
      
    {/* <ChangePassword/>*/}
  </Box>
    )
}

export default AdminDashboard