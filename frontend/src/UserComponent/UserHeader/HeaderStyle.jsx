import {makeStyles} from '@material-ui/core'
import { orange } from '@material-ui/core/colors'
import { blue, blueGrey } from '@mui/material/colors'


// make style material ui me koi bhi component ko style kar sakte hai using JSX this is not css, css se jsx me convert ke liye search on google.
export const useStyles = makeStyles((theme)=>({
    email:{
    color:"white",    
    },
    navlist:{
        minWidth:"250px",
        maxWidth:"300px"
    },
    navAvatar:{
        width:'45px',
        height:'45px'
    },
    UlAvatar:{
    backgroundColor:blue["A200"],
    color:'white' 
    },

  //wrapper of main contianer
  wrapper: {
    height:"100vh", background:"#efefef",
    padding: theme.spacing(2, 2, 0, 34),
    [theme.breakpoints.down("sm")]:{padding:theme.spacing(2,2)}
  
  },

  //Side nav
  drawerPaper: {
    width: "250px",
    marginTop: "65px",
    [theme.breakpoints.down("sm")]: {
      
    },
  },
  navlinks: {
    fontSize:'0.7em',
    color: blueGrey["A400"],
    "& :hover , &:hover div": {
      color: orange["A200"],
    },
    " & div": {
      color: blueGrey["A400"],
    },
  },
  activeNavlinks: {
    
    color: orange["A700"],
    "& div": {
      color: orange["A700"],
    },
  },

  navButton: {
    width: " 100%",
    textTransform: "capitalize",
  },

  listItemText:{
    fontSize:'0.7em', //Insert your required size
  },
  
  listItemIcon:{
 
  }
}))

