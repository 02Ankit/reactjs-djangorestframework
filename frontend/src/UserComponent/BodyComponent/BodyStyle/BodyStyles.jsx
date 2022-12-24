import { makeStyles } from "@material-ui/core";
import { colors } from "../../Theme/Theme"

export const useStyles = makeStyles((theme) => ({

  section: {
    margin: theme.spacing(2, 0),
  },
  pageLabel: {
    color: colors.baselight,
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
  },
  pageHeader: {
    color: colors.baseDark,
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },
  responsiveImg: {
    width: "100%",
    height: "auto",
  },
  cardImage: {
    maxHeight: "150px !important",
    overflowY: "hidden",
  },

  // dashboard
  cardLabel: {
    color: colors.baselight,
    margin: theme.spacing(2, 0),
    textTransform: "uppercase",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
      margin: theme.spacing(1, 0),
    },
  },
  cardHeader: {
    color: colors.baseDark,
    margin: theme.spacing(2, 0),
    textTransform: "capitalize",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.8rem",
      margin: theme.spacing(1, 0),
    },
  },
  displayCard: {
    position: "relative",
    padding: "0px !important",
    minHeight: "140px",
    height: "auto",
    
  },

  displayVerticalImg:{
    position: "relative",
    padding: "0px !important",
    minHeight: "140px",
    height: "15rem",
    width:"15rem",
    marginLeft: "5rem"
  },
  
  displayPaymentTerms:{
    position: "relative",
    padding: "0px !important",
    minHeight: "140px",
    height: "auto",
    width:"auto",
  },

  displayCardGraph: {
    width: "100%",
    height: "60px !important",
    position: "absolute",
    bottom: "0px",
    left: "0px",
    [theme.breakpoints.down("xs")]: {
      height: "45px !important",
    },
  },
  ratio: {
    position: "absolute",
    top: "50%",
    left: "33%",
    [theme.breakpoints.down("xs")]: {
      top: "45%",
      left: "25%",
    },
  },
  progressbarContainer: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "250px",
  },
  //userOverview section
  cardTitle: {
    color: colors.baseDark,
  },
  generalGraph: {
    width: "100%",
    height: "300px",
  },

  //footer
  footer: {
    padding: "8px 24px 16px 270px",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 24px 16px 24px",
    },
  },

  //ExpiredSession LogOut Button 
  expireLogoutButton:{
    backgroundColor: 'grey',
    color:"#FCA61F",
    cursor: 'pointer', 
    border: '1px solid #FCA61F', 
    boxShadow: "1px 3px 1px #FCA61F" , 
    fontWeight:"bold", 
    paddingLeft:"10px", 
    paddingRight: "10px", 
    fontSize:"18px",
    
  }
  

}));