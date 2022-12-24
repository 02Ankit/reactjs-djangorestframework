import {  Alert, Box, Button, Card, CardActionArea,  Grid,  ImageList,  ImageListItem,  Input,  Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQrCodeDeleteImgMutation, useSaveQrCodeImageDataMutation } from '../../../services/userAuthApi'
import { useStyles } from '../../UserHeader/HeaderStyle'
import Navheader from '../../UserHeader/Navheader'
import Sidenav from '../../UserHeader/SideNav/Sidenav'


const PaymentSetting = () => {

    const [error, setError] = useState({status:false,msg:'',type:''})
    const [qrcodeimgdata, setQrCodeImgData] = useState({})
    const [qrCodeViewImages, setQrCodeViewImages] = useState([])
    const [filteredQrCodeImgData, setFilteredQrCodeImgData] = useState([])

    const [saveQrCodeImageData] = useSaveQrCodeImageDataMutation()
    const [deleteQrCodeImg] = useQrCodeDeleteImgMutation() 

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
          
           setQrCodeViewImages(resp.Image)
           setFilteredQrCodeImgData(resp.Image)
          }
        ).catch(error => console.log(error))
    },[])

    const getQrCodeImgData = async () =>{
        try {
           const response = await axios.get("http://127.0.0.1:8000/api/user/qrcodeimgdata/")
           setFilteredQrCodeImgData(response.data.Image);
        } catch (error) {
         console.log(error);
        };
       }

    const resetQrCodeForm = () => {
        setQrCodeImgData('')
        setError('')
        document.getElementById('qrcode-image-form').reset()
      }
      
    const handleQrCodeImg = async (e) => {
        e.preventDefault();
        const imgdata = new FormData()
        imgdata.append('qrcodeimg', qrcodeimgdata)
        
        const actualWebData = {
          id: imgdata.get('id'),
          qrcodeimg: imgdata.get('qrcodeimg'),
        }
      
        console.log("QrCodeImage", actualWebData.qrcodeimg)
        

          const res = await saveQrCodeImageData(imgdata)
          if (res.data.status === "success") {
            setError({ status: true, msg: "Banner Image Uploaded Successfully", type: 'success' })
            getQrCodeImgData()
            resetQrCodeForm()
          }
        }
        const classes = useStyles();
        const removeQrCode = async (id)=>{
            const resbanner = await deleteQrCodeImg({id: id})
              getQrCodeImgData()
          }

  return (
    <Box>
    <Navheader />
    <Sidenav/>
    <Grid container spacing={2} style={{marginTop:"40px"}}>
    <Grid item lg={4} sm={6} sx ={{}}>
        
    </Grid>
    <Grid item lg={12} sm={12} xs={7}>
    
      <Box  justifyContent="center" sx={{ backgroundColor: '#FCA61F', padding: 1, mb:'20px', border: '2px', borderRadius:'10px',  }}>
        <Typography variant="h5" component="div" sx={{fontSize:'12px', fontWeight: 'bold', color: 'white' }}>Upload QrCode Images</Typography>
      </Box>
      <Card className={classes.card}>
      <CardActionArea>
      <Grid container spacing={2}>
      <Grid item lg={6} sm={6} xs={6} >
      <Card className={classes.innercard}>
      <Box  component="form" sx={{ p: 3 }} noValidate id="qrcode-image-form" onSubmit={handleQrCodeImg}>
       
      <Button style={{ margin:40,}}
      variant="contained" 
      size="small" 
      component="label"
      >
      <Input  id = 'qrcodeimage' name ='qrcodeimage' accept="image/*" multiple type="file" onChange={(e)=>{setQrCodeImgData(e.target.files[0])}} />
      </Button>

        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 2 }} color="error">Submit</Button>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
      </Box>
    </Card>
    </Grid>
    <Grid style ={{height:"15rem" }} item lg={6} sm={6} xs={6}>
      <ImageList rowHeight={260} className={classes.imageList} cols={4}>
      {filteredQrCodeImgData.map((qrimage) => (
        <ImageListItem key={qrimage.qrcodeimg} cols={qrimage.cols || 2}>
          <img src={`http://127.0.0.1:8000/.${qrimage.qrcodeimg}`} alt={qrimage.date} />
          <button id= 'banner-rm-id' onClick={() => removeQrCode(qrimage.id)}>{qrimage.id}X</button>
        </ImageListItem>
      ))}
    </ImageList></Grid></Grid></CardActionArea>
    </Card>
        
    </Grid>
</Grid>


    </Box>
  )
}

export default PaymentSetting