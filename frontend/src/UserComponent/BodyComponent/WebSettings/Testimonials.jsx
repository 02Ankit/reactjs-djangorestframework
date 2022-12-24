import { Avatar, Box, Button, Card, CardActionArea, CardHeader, Grid, IconButton, Input, InputLabel,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSaveTestimonialDataMutation, useTestimonialDeleteIdMutation } from '../../../services/userAuthApi'
import { makeStyles} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';

const Testimonials = () => {
    const [error, setError] = useState({status:false,msg:'',type:''})
    const [gardianImgData, setGardianImgData] =useState([])
    const [gardianNameData, setGardianNameData] =useState({})
    const [gardianCommentdata, setGardianCommentData] = useState({})
    
    const [saveGardianData] = useSaveTestimonialDataMutation()
    const [deleteGardianId] = useTestimonialDeleteIdMutation()
    
    const [testimonialList, setTestimonialList] = useState([])
    const [filteredTestimonialData, setFilteredTestimonialData] = useState([])
    useEffect(()=>
   {
         // getUserData()
       fetch("http://127.0.0.1:8000/api/user/testimonial/", 
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
          console.log("respTestimonialsList",resp.Testimonial)
          setTestimonialList(resp.Testimonial)
          setFilteredTestimonialData(resp.Testimonial)
         }
       ).catch(error => console.log(error))
   },[])
  
  console.log("TestimonialsList",testimonialList)
  
  
  const getTestimonialData = async () =>{
    try {
       const response = await axios.get("http://127.0.0.1:8000/api/user/testimonial/")
       setFilteredTestimonialData(response.data.Testimonial);
    } catch (error) {
     console.log(error);
    };
   }


    const removeGuardian = async (id)=>{
    const resGuardian = await deleteGardianId({id: id})
    getTestimonialData()
  }
    
const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = new FormData()

    data.append('gardian_pic', gardianImgData)
    data.append('gardian_name', gardianNameData)
    data.append('gardian_comment', gardianCommentdata)
   

    // const testimonialData = {
    //     gardian_pic: data.get('gardian_pic'),
    //     gardian_name: data.get('gardian_name'),
    //     gardian_comment: data.get('gardian_comment')

    //   }

      console.log('Testimonials', data)

      const res = await saveGardianData(data)

      if (res.data.status === "success") {
        
        setError({ status: true, msg: " Testimonial Successfully", type: 'success' })
        getTestimonialData()
        document.getElementById('testimonial-form').reset()
        
      }
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        gap:1,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
  
      card:{
        paddingTop:20,
        backgroundColor:'white'
      },
  
      innercard:{
        backgroundColor:'#FCA61F',
        marginLeft:'10px'
      },
  
      imageList: {
        width: 500,
        height: 350,
      },
    }));
  
    const classes = useStyles();

  return (
    <div>
{/***************************Testimonials*************************** */}
<Card className={classes.card}>
<CardActionArea>
<Grid container spacing={2}>
<Grid item lg={6} sm={6} >
  <Card style={{padding:20, marginTop:10}}>
    <CardHeader
      subheader="The information can be edited"
      title="Add Testimonials"
    />
    {/*error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''*/}

    <Box component='form' noValidate sx={{ mt:1 }} id='testimonial-form' onSubmit={handleSubmit} enctype="multipart/form-data">
       
          
            <InputLabel style={{color:'blue', fontSize: 14 }}>Guardian name </InputLabel>

            <TextField sx={{mb:3}}
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }} 
            margin='normal' 
            variant="standard"
            required 
            fullWidth 
            id='gardian_name' 
            name='gardian_name' 
            onChange={(e)=>{setGardianNameData(e.target.value)}}
          />
         

        <InputLabel style={{color:'blue', fontSize: 14 }}>Gardian Comments *</InputLabel>

            <TextField sx={{mb:3}}
            multiline
            rows={8}
            InputProps={{ style: { fontSize: 14 } }}
            InputLabelProps={{ style: { fontSize: 14 } }} 
            margin='normal' 
            variant="standard"
            required 
            fullWidth 
            onChange={(e)=>{setGardianCommentData(e.target.value)}}
            id='gardian_comment' 
            name='gardian_comment' 
            placeholder="Minimum 4 line and Maximum 10 lines"/>

            <Button style={{ margin:40,}}
            variant="contained" 
            size="small" 
            component="label"
            >
            <Input  id = 'gardianpic' name ='gardian_pic' accept="image/*" multiple type="file" onChange={(e)=>{setGardianImgData(e.target.files[0])}} />
            </Button>
          
        <Button size='small' type='submit' sx={{mt:3, mb:2, px:5}} variant='contained' >Update</Button>
        
  </Box>
</Card>
</Grid>

<Grid item lg={6} sm={6} >
<Box display="flex" justifyContent="center" sx={{ backgroundColor: 'info.light', padding: 1 }}>
<Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}> List of Gardians</Typography>
</Box>
<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell align="center">Avatar</TableCell>
      <TableCell align="center">Name</TableCell>
      <TableCell align="center">Comments</TableCell>
      <TableCell align="center">Delete</TableCell>
      
    </TableRow>
  </TableHead>
  <TableBody>
  {filteredTestimonialData.map((tetimonList, i) => {
    return (
        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          
          <TableCell align="center">
            <Avatar src={`http://127.0.0.1:8000/.${tetimonList.gardian_pic}`}/>
          </TableCell>
          <TableCell align="center">{tetimonList.gardian_name}</TableCell>
          <TableCell align="center">{tetimonList.gardian_comment}</TableCell>
          <TableCell align="center">
          
          <IconButton style={{marginTop:'5px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small" onClick={() => removeGuardian(tetimonList.id)}
              >
                <DeleteIcon style={{ color:'#FCA61F'}}/>
              </IconButton>
          </TableCell>
          </TableRow>
    )
  })
}
</TableBody>
</Table>
</TableContainer>
</Grid></Grid>
</CardActionArea>
</Card>



{/********************************************************************* */}
   </div>
  )
}

export default Testimonials