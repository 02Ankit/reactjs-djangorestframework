import React, { useState } from 'react'
import{ Avatar, Badge, Box, List, ListItem,  ListItemIcon, ListItemText}from '@mui/material';
import { Menu, IconButton} from '@material-ui/core'
import NotificationsIcon from "@material-ui/icons/Notifications"
import { useStyles } from '../HeaderStyle';



const Notification = () => {
    const classes = useStyles()
    //usestate ka use karenge value ko null ke liye ya open ke liye 
    // useState Array return karta hai first variable hota hai or second wala SetFunction hota hai 
    const [anchorEl, setAnchorEl] = useState()
    // menu close karne ke liye 
    const handleClose=()=>{
        setAnchorEl(null)    
        }
    // menu open ke liye event(e).currentTarget se open hoga menu
    const handleClick =(e)=>{
        setAnchorEl(e.currentTarget)
    }
    const dropDownData=[
        {
            label:'Ankit', description:"likes your code",
        },
        {
            label:'Shashank', description:"likes your code",
        },
        {
            label:'Jai', description:"likes your code",
        },
        {
            label:'Vaibhav', description:"likes your code",
        },
        {
            label:'Prakash', description:"likes your code",
        },
    ]

        

  return (
    <Box>   
            
            <IconButton  //Here we are using props of Button
            color='inherit' 
            aria-controls="notification-menu" //simple-menu id of menu element 
            aria-haspopup="true" 
            onClick={handleClick}
            >
            <Badge badgeContent={4} color='primary'> 
            <NotificationsIcon/>
            </Badge>
        
            </IconButton>
            
            <Menu id="notification-menu"
            // anchorEl me state ka value lenge jo ki open me denge
                anchorEl={anchorEl}
                keepMounted
                // open me pahele starting me state Null hoga matlab false hoga Boolean me liye hai to false hoga. 
                open={Boolean(anchorEl)}
                onClose={handleClose} 
            >
                {/*List ka matlab "Ul, Li" hi hota hai */}
                <List>
                    {dropDownData.map((item,i)=>(
                        <ListItem key={i} component={ListItem} onClick={handleClose}>
                                <ListItemIcon>  {/*yahan item.label[0] ka matlab jo avatar hai uspe label ka first Letter hoga upper case me*/}
                                    <Avatar className={classes.UlAvatar}>
                                        {item.label[0]}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary= {item.label}
                                secondary= {item.description} >
                                   
                                </ListItemText>
                        </ListItem>
                    ))}
                </List> 
            </Menu>
</Box>
  )
}
export default Notification