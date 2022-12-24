import React,{useEffect, useState} from 'react'
import { TextField, Button, Box, Alert, Grid, Input, IconButton, Card, CardHeader, Typography, Link, TableCell, TableRow, TableHead, Table, TableContainer, Avatar, Paper, CardActionArea, CardMedia, imageListClasses, ImageList, ImageListItem, CardContent} from '@mui/material';
import {useNavigate } from 'react-router-dom';
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import { useBannerDeleteImgMutation, useExpertDeleteImgMutation, useGalleryDeleteImgMutation, useGetImageDataQuery, useImageDataMutation, useSaveExpertImageDataMutation, useSaveGalleryImageDataMutation, useSaveImageDataMutation, useUpdateWebSettingsMutation, useUpdateWebsiteMutation } from '../../../services/userAuthApi';
import { setWebInfo } from '../../../features/webSlice';
import { useDispatch } from 'react-redux';
import { Document, Page } from "react-pdf";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { makeStyles, TableBody } from '@material-ui/core';
import DataTable from 'react-data-table-component';
import Testimonials from './Testimonials';
import UploadPdf from './UploadPdf';



const Websettings = () => {

  //Forntend se error set kar sakte hai 
  const [error, setError] = useState({status:false,msg:'',type:''})
  
  const dispatch = useDispatch()
  
  const [webData, setWebData ] = useState({id:"", top_note:"",  about_us: "",footer_email: "",user_contact: null, session_conduct: "", our_teachers: "", our_students:""}); 


  // const [fileData, setFileData ] = useState({service_docs:""}); 
//***********************Using Without axois******************************/
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
        setWebData(resp.webview[0])
       }
     ).catch(error => console.log(error))
 },[])

console.log(webData)

//  useEffect(()=>{
  
//     dispatch(setWebInfo({id: webData.id, top_note: webData.top_note, about_us: webData.about_us, footer_email: webData.footer_email, session_conduct:webData.session_conduct, our_teachers:webData.our_teachers, our_students:webData.our_students}))
      
  
// },[webData])


//  console.log("id", webData.id)
// console.log("top_note", webData.top_note)


const handleChange = (event) => {
  event.preventDefault(); 
  setWebData(event.target.value);
};
// const handlefileChange = (event) => {
//   event.preventDefault(); 
//   setFileData(event.target.files[0].name);
// };

// console.log(fileData)



//  let data = JSON.stringify(webData)


// After submit redirect karne ke liye usenavigate ka use karte hai.
const navigate = useNavigate()
const [server_error, setServerError] = useState({})
const [updateWebData, {isLoading}] = useUpdateWebSettingsMutation()

const handleSubmit = async (e)=>{
    e.preventDefault();    
    // form se data ko yaha lena hai Webapi se FormData() milta hai official doc me check kar sakte hai
    // or iske jaghat state bana ke bh use kar sakte hai. 
    let filepdf = document.querySelector("#file")
    console.log(filepdf)

    const data = new FormData(e.currentTarget);
    let pdf = filepdf.files[0]
    console.log(pdf.name)
    let pdflink = pdf.name
    let link = "http://127.0.0.1:8000/media/servicedocs/"
    const add = link+pdflink
    console.log(add.toString())
    data.append('service_file', pdf)
    console.log("service_file",data.get('service_file'))

    const actualWebData = {
        id: data.get('id'),
        top_note: data.get('top_note'),
        about_us: data.get('about_us'),
        footer_email: data.get('footer_email'),
        user_contact: data.get('user_contact'),
        session_conduct: data.get('session_conduct'),
        our_teachers: data.get('our_teachers'),
        our_students:data.get('our_students'),
        service_docs:data.get('service_file'),
    }

    const id = actualWebData.id
    // actual = actualWebData.service_docs.files[0]
    console.log(actualWebData.user_contact)
    console.log(actualWebData.service_docs)

    if(actualWebData.top_note && actualWebData.about_us && actualWebData.footer_email && actualWebData.user_contact && actualWebData.session_conduct && actualWebData.our_teachers && actualWebData.our_students )
    { // clear form using simple javascript
      // agar jub backend ka kam karenge to yaha pe Ajax ya Axios ka use karke data ko backend me send kar denge.
      document.getElementById('website-form').reset()
      setError({status:true, msg:'Updated Successfully', type:'success'})
      navigate('/dashboard/websettings')
      }
    else{
          setError({ status: true, msg: "All Fields are Required", type: 'error' })
      }
    
//       axios.put("http://127.0.0.1:8000/api/user/webupdate/", actualWebData, {
//   headers: {'Content-type':'application/json'}
// });


      const res = await updateWebData(actualWebData)

    
      // res pe response milega
    if(res.error){
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }

    if(res.data ){
      console.log(res.data)
      // window.location.reload();
    }
}

/////////////////////Image Section////////////////////////////////////////////////
const [bannerimgdata, setBannerImgData] = useState({})
const [expertimgdata, setExpertImgData] = useState({})
const [galleryimgdata, setGalleryImgData] = useState({})
////////////////////////View Function State////////////////////////
const [bannerViewImages, setBannerViewImages] = useState([])
const [expertViewImages, setExpertViewImages] = useState([])
const [galleryViewImages, setGalleryViewImages] = useState([])

const [filteredGalleryImgData, setFilteredGalleryImgData] = useState([])
const [filteredBannerImgData, setFilteredBannerImgData] = useState([])
const [filteredExpertImgData, setFilteredExpertImgData] = useState([])
/////////////////////Pass data to Mutation Custom Hooks//////////////////////////
const [saveImageData] = useSaveImageDataMutation()
const [saveExpertImageData] = useSaveExpertImageDataMutation()
const [saveGalleryImageData] = useSaveGalleryImageDataMutation()

useEffect(()=>
 {
       // getUserData()
     fetch("http://127.0.0.1:8000/api/user/bannerimgdata/", 
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
       
        setBannerViewImages(resp.Image)
        setFilteredBannerImgData(resp.Image)
       }
     ).catch(error => console.log(error))
 },[])

 useEffect(()=>
 {
       // getUserData()
     fetch("http://127.0.0.1:8000/api/user/expertimgdata/", 
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
       
        setExpertViewImages(resp.ExpertImage)
        setFilteredExpertImgData(resp.ExpertImage)
       }
     ).catch(error => console.log(error))
 },[])
 
 
 useEffect(()=>
 {
       // getUserData()
     fetch("http://127.0.0.1:8000/api/user/galleryimgdata/", 
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
       
        setGalleryViewImages(resp.GalleryImage)
        setFilteredGalleryImgData(resp.GalleryImage)
       }
     ).catch(error => console.log(error))
 },[]) 

console.log("Gallery",galleryViewImages)

// *********************Banner Image Section Start ***********************
// SaveBanner:-

const resetBannerForm = () => {
  setBannerImgData('')
  setError('')
  document.getElementById('banner-image-form').reset()
}

 const handleBannerImg = async (e) => {
  e.preventDefault();
  const imgdata = new FormData()
  imgdata.append('bannerimg', bannerimgdata)
  
  const actualWebData = {
    id: imgdata.get('id'),
    bannerimg: imgdata.get('bannerimg'),
  }

  console.log("BannerImage", actualWebData.bannerimg)

    const res = await saveImageData(imgdata)
    if (res.data.status === "success") {
      setError({ status: true, msg: "Banner Image Uploaded Successfully", type: 'success' })
      getBannerImgData()
      resetBannerForm()
    }
  }
// ******************Expert Review Image Section Start*************************
// Save Gallery:- 
const resetExpertForm = () => {
  setExpertImgData('')
  setError('')
  document.getElementById('expert-image-form').reset()
}

const handleExpertImg = async (e) => {
  e.preventDefault();
  const imgdata = new FormData()
  imgdata.append('expertimg', expertimgdata)
  
  const actualWebData = {
    id: imgdata.get('id'),
    expertimg: imgdata.get('expertimg'),
  }

  console.log("ExpertImage", actualWebData.expertimg)

    const res = await saveExpertImageData(imgdata)
    if (res.data.status === "success") {
      setError({ status: true, msg: "Expert Image Uploaded Successfully", type: 'success' })
      getExpertImgData()
      resetExpertForm()
    }
  } 
// **********************GAllery Image Section Start*****************************
// Save Gallery:- 

const resetGalleryForm = () => {
  
  setGalleryImgData('')
  setError('')
  document.getElementById('gallery-image-form').reset()

}


const getGalleryImgData = async () =>{
  try {
     const response = await axios.get("http://127.0.0.1:8000/api/user/galleryimgdata/")
     setFilteredGalleryImgData(response.data.GalleryImage);
  } catch (error) {
   console.log(error);
  };
 }

 const getBannerImgData = async () =>{
  try {
     const response = await axios.get("http://127.0.0.1:8000/api/user/bannerimgdata/")
     setFilteredBannerImgData(response.data.Image);
  } catch (error) {
   console.log(error);
  };
 }

 const getExpertImgData = async () =>{
  try {
     const response = await axios.get("http://127.0.0.1:8000/api/user/expertimgdata/")
     setFilteredExpertImgData(response.data.ExpertImage);
  } catch (error) {
   console.log(error);
  };
 }

const handleGalleryImg = async (e) => {
  e.preventDefault();
  const imgdata = new FormData()
  imgdata.append('galleryimg', galleryimgdata )
  
  const actualWebData = {
    id: imgdata.get('id'),
    galleryimg: imgdata.get('galleryimg'),
  }

  console.log("GalleryImage", actualWebData.galleryimg)

    const res = await saveGalleryImageData(imgdata)

    if (res.data.status === "success") {
      
      setError({ status: true, msg: " Gallery Image Uploaded Successfully", type: 'success' })
      getGalleryImgData()
      resetGalleryForm()
    }
  }

 /////////////////////////RemoveGallery Function///////////////////////////////// 
 const [galleryDeleteImg] = useGalleryDeleteImgMutation()
 const [bannerDeleteImg] = useBannerDeleteImgMutation()
 const [expertDeleteImg] = useExpertDeleteImgMutation()

 const removeImage = async (id) => {
    // this is the line that you are looking for
    
      const resgallery = await galleryDeleteImg({id: id})
      getGalleryImgData()
    
    
  };

  const removeBanner = async (id)=>{
    const resbanner = await bannerDeleteImg({id: id})
      getBannerImgData()
  }

  const removeExpert = async (id)=>{
    const resexpert = await expertDeleteImg({id: id})
      getExpertImgData()
  }

 // **********************GAllery Image Section Close*****************************
///////////////////////CSS-Style///////////////////////////////

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
      backgroundColor:'black'
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
    <div style={{marginTop:'70px',marginBottom:'40px'}}>
   
    <Grid container spacing={2}>
    <Grid item lg={12} sm={6} >
      <Card style={{padding:20}}>
        <CardHeader
          subheader="The information can be edited"
          title="Website Settings"
        />
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}

        <Box component='form' noValidate sx={{ mt:1 }} id='website-form' onSubmit={handleSubmit} enctype="multipart/form-data">
           
                <TextField sx={{mb:3}}
                id='id' 
                name='id' 
                value={webData.id}
                hidden
              />
                <InputLabel style={{color:'blue', fontSize: 14 }}>Short Note For Offer Notify *</InputLabel>

                <TextField sx={{mb:3}}
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }} 
                margin='normal' 
                variant="standard"
                required 
                fullWidth 
                id='top_note' 
                name='top_note' 
                value={webData.top_note}
                onChange={handleChange}
              />
             

            <InputLabel style={{color:'blue', fontSize: 14 }}>Brief About your Company/Organization *</InputLabel>

                <TextField sx={{mb:3}}
                multiline
                rows={8}
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }} 
                margin='normal' 
                variant="standard"
                required 
                fullWidth 
                id='about_us' 
                name='about_us' 
                value={webData.about_us}
                onChange={handleChange}
                placeholder="Minimum 4 line and Maximum 10 lines"/>
                

                <InputLabel style={{color:'blue', fontSize: 14 }}> Change Email On Footer *</InputLabel>

                <TextField sx={{mb:3}}
                InputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }} 
                margin='normal' 
                variant="standard"
                required 
                fullWidth 
                id='footer_email' 
                name='footer_email' 
                value={webData.footer_email}
                onChange={handleChange}/>

                <InputLabel style={{color:'blue', fontSize: 14 }}>Contact *</InputLabel>  

                <TextField sx={{ mt: 2,
                }}
                  InputProps={{ style: { fontSize: 14 } }}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                      type="number"
                      name="user_contact"
                      placeholder='Enter Phone number'
                      margin='normal' 
                      variant="standard"
                      fullWidth
                      required
                      value={webData.user_contact}
                      onChange={handleChange}
                      onInput = {(e) =>{
                          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)}
                      
                        }        
               />

                <Box style={{display:"flex", marginBottom:30, marginTop: 20,}}>
                <Grid item lg={4} sm={4} >
                <InputLabel style={{color:'blue', fontSize: 14 }}> Session Conducted*</InputLabel>
                    <TextField sx={{mb:3}}
                    type ="number"
                    InputProps={{ style: { fontSize: 14, width:100 }}}
                    inputProps={{min:0, max:100000, step:10}}
                    InputLabelProps={{ style: { fontSize: 14 } }} 
                    variant="standard"
                    id='session_conduct' 
                    name='session_conduct'
                    value={webData.session_conduct}
                    onChange={handleChange}
                    />
                 
                  </Grid>
                  <Grid item lg={4} sm={4} >  
                  <InputLabel style={{color:'blue', fontSize: 14 }}> Our Teachers *</InputLabel>
                    <TextField sx={{mb:3}}
                    type ="number"
                    InputProps={{ style: { fontSize: 14, width:100 }}}
                    inputProps={{min:0, max:100000, step:10}}
                    InputLabelProps={{ style: { fontSize: 14 } }} 
                    variant="standard"
                    id='our_teachers' 
                    name='our_teachers'
                    value={webData.our_teachers}
                    onChange={handleChange}
                    />
                    
                  </Grid>
                  <Grid item lg={4} sm={4} >
                  <InputLabel style={{color:'blue', fontSize: 14 }}>Our Students *</InputLabel>
                    <TextField sx={{mb:3}}
                    type ="number"
                    InputProps={{ style: { fontSize: 14, width:100 }}}
                    inputProps={{min:0, max:100000, step:10}}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    variant="standard" 
                    id='our_students' 
                    name='our_students'
                    value={webData.our_students}
                    onChange={handleChange}
                    />
                   
                  </Grid>
              </Box>
              
              {/*by default Alert green rahta hai aise red ya error ke liye severity='error' karna padega

            yaha turnary oerator ka use karenge kyunki status false starting me false rahega */}
            <Button size='small' type='submit' sx={{mt:3, mb:2, px:5}} variant='contained' >Update</Button>

      </Box>
    </Card>
</Grid>
</Grid>

{/***************************UploadPdf***********************/}

<UploadPdf/>

{/***************************Testimonials***********************/}
<Testimonials />

{/************************************************************/}

<Grid container spacing={2} style={{marginTop:"40px"}}>
    <Grid item lg={4} sm={6} sx ={{}}>
        
    </Grid>
    <Grid item lg={12} sm={12} xs={7}>
    
      <Box  justifyContent="center" sx={{ backgroundColor: '#FCA61F', padding: 1, mb:'20px', border: '2px', borderRadius:'10px',  }}>
        <Typography variant="h5" component="div" sx={{fontSize:'12px', fontWeight: 'bold', color: 'white' }}>Upload Banner Images</Typography>
      </Box>
      <Card className={classes.card}>
      <CardActionArea>
      <Grid container spacing={2}>
      <Grid item lg={6} sm={6} xs={6} >
      <Card className={classes.innercard}>
      <Box  component="form" sx={{ p: 3 }} noValidate id="banner-image-form" onSubmit={handleBannerImg}>
       
      <Button style={{ margin:40,}}
      variant="contained" 
      size="small" 
      component="label"
      >
      <Input  id = 'bannerimg' name ='bannerimage' accept="image/*" multiple type="file" onChange={(e)=>{setBannerImgData(e.target.files[0])}} />
      </Button>

        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 2 }} color="error">Submit</Button>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </Card>
    </Grid>
    <Grid item lg={6} sm={6} xs={6}>
      <ImageList rowHeight={160} className={classes.imageList} cols={4}>
      {filteredBannerImgData.map((bimage) => (
        <ImageListItem key={bimage.bannerimg} cols={bimage.cols || 2}>
          <img src={`http://127.0.0.1:8000/.${bimage.bannerimg}`} alt={bimage.date} />
          <button id= 'banner-rm-id' onClick={() => removeBanner(bimage.id)}>{bimage.id}X</button>
        </ImageListItem>
      ))}
    </ImageList></Grid></Grid></CardActionArea>
    </Card>
        
    </Grid>
</Grid>

{/**********************Expert Reviews***************/}
<Grid container spacing={2} style={{marginTop:"40px"}}>
    <Grid item lg={4} sm={6} sx ={{}}>
        
    </Grid>
    <Grid item lg={12} sm={12} xs={7}>
    
      <Box  justifyContent="center" sx={{ backgroundColor: '#FCA61F', padding: 1, mb:'20px', border: '2px',borderRadius:'10px' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>Upload Experts Review</Typography>
      </Box>
      <Card className={classes.card}>
      <CardActionArea>
      <Grid container spacing={2}>
      <Grid item lg={6} sm={6} xs={6} >
      <Card className={classes.innercard}>
      <Box  component="form" sx={{ p: 3 }} noValidate id="expert-image-form" onSubmit={handleExpertImg}>

      <Button style={{ margin:40,}}
      variant="contained" 
      size="small" 
      component="label"
      >
      <Input  id = 'expertimg' name ='expertimage' accept="image/*" multiple type="file" onChange={(e)=>{setExpertImgData(e.target.files[0])}} />
      </Button>

        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="error">Submit</Button>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </Card>
    </Grid>
    <Grid item lg={6} sm={6} xs={6}>
      <ImageList rowHeight={500} className={classes.imageList} cols={4}>
      {filteredExpertImgData.map((eimage) => (
        <ImageListItem key={eimage.expertimg} cols={eimage.cols || 2}>
          <img src={`http://127.0.0.1:8000/.${eimage.expertimg}`} alt={eimage.date} />
          <button id= 'expert-rm-id' onClick={() => removeExpert(eimage.id)}>{eimage.id}X</button>
        </ImageListItem>
      ))}
    </ImageList></Grid></Grid></CardActionArea>
    </Card>
        
    </Grid>
</Grid>
{/**********Galleries***************/}
<Grid container spacing={2} style={{marginTop:"40px"}}>
    <Grid item lg={4} sm={6} sx ={{}}>
        
    </Grid>
    <Grid item lg={12} sm={12} xs={7}>
    
      <Box  justifyContent="center" sx={{ backgroundColor: '#FCA61F', padding: 1, mb:'20px', border: '2px', borderRadius:'10px' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>Upload Gallery Images</Typography>
      </Box>
      <Card className={classes.card}>
      <CardActionArea>
      <Grid container spacing={2}>
      <Grid item lg={6} sm={6} xs={6} >
      <Card className={classes.innercard}>
      <Box  component="form" sx={{ p: 3 }} noValidate id="gallery-image-form" onSubmit={handleGalleryImg}>

        <Button style={{ margin:40,}}
        variant="contained" 
        size="small" 
        component="label"
        >
            
            <Input  id = 'bannerimg' name ='galleryimage' accept="image/*" multiple type="file" onChange={(e)=>{setGalleryImgData(e.target.files[0])}} />
        </Button>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="error">Submit</Button>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </Card>
    </Grid>
    <Grid item lg={6} sm={6} xs={6}>
      <ImageList rowHeight={250} className={classes.imageList} cols={4}>
      {filteredGalleryImgData.map((gimage) => (
        <ImageListItem key={gimage.galleryimg} cols={gimage.cols || 2}>
          <img src={`http://127.0.0.1:8000/.${gimage.galleryimg}`} alt={gimage.date} />
        
          <button  id= 'gallery-rm-id' onClick={() => removeImage(gimage.id)}>{gimage.id}X</button>
        </ImageListItem>
      ))}
    </ImageList></Grid></Grid></CardActionArea>
    </Card>
    <Box sx={{ mt: 3, mb:3}}>
    <Card>
      <CardContent>
        <Box sx={{ mt: 3, mb:3}}>
          
      
        </Box>
      </CardContent>
    </Card>
  </Box>
    </Grid>
</Grid>

</div>
  )

  

}

export default Websettings