// here we are using material ui for UI
import { Grid,Card,Box,Tabs,Tab, Typography } from '@mui/material';
import React, {useState} from 'react'
import Pic1 from '../../img/login_reg/login.png'
import { Registration } from './Registration';
import UserLogin from './UserLogin';
import { BookSharp } from '@material-ui/icons';



// create Tab panel Component
const TabPanel = (props) =>{
  const {children, value, index} = props;
  return(
    <div role = 'tabpanel' hidden={value !==index}>
        {
          value === index && (<Box>{children}</Box>)
        }
    </div>
  )
}


const LoginReg = () => {
      const [value, setValue] = useState(0);
      const handleChange = (event, newValue) => {
        setValue(newValue);
      }
      return (

        
        <Grid container sx={{height: '90vh'}}>
      {/*ispe lg 7 ka matlab num of col sm ka bhi wahi matlab*/}
            <Grid item lg={7} sm={5} sx ={{
              backgroundImage: `url(${Pic1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: { xs:'none', sm:'block'}
            }}>
            
            </Grid>
           
          
        
            <Grid item lg={5} sm={7} xs={12}>
              <Card sx={{width:'100%', height:'100%'}}>
                <Box sx={{mx:2}}>
                  <Box sx={{borderBottom:1, borderColor:'divider'}}>
                    <Tabs value={value} textColor='primary' indicatorColor='secondary'
                    onChange={handleChange}>
                      <Tab label='Login' sx={{textTransform:'none',fontWeight:'bold'}}></Tab>
                      <Tab label='Registration' sx={{textTransform:'none',fontWeight:'bold'}}>
                      </Tab>
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <UserLogin/>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                   <Registration/>
                  </TabPanel>
                </Box>
                <Box textAlign='center' sx={{mt:2}}>
                  <BookSharp sx={{color:'purple', fontSize: 50}}/>
                  <Typography variant='h5' sx={{fontWeight:'600',fontSize: 20}}>NoDoubtsAcademy</Typography>
                
                </Box>
              </Card>
            </Grid>
        </Grid>

      )
 
}

export default LoginReg;