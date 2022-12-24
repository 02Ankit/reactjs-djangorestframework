import PhotoCamera from '@material-ui/icons/PhotoCamera'
import { Box, Button, Divider, IconButton, TextField } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { getToken } from '../../services/LocalStorageService'
import { useGetLoggedUserQuery, useUpdateImageDataMutation } from '../../services/userAuthApi'

const UploadImage = () => {

  const {access_token} = getToken()
  console.log(access_token)
  const {data, isSuccess} = useGetLoggedUserQuery(access_token)
  console.log(data)

  const [userData, setUserData]= useState({id:""})

  useEffect(()=>{
    if(data && isSuccess)
    {
      setUserData({id: data.id})
    }
    },[data, isSuccess])
    
  //  

  // const newImage = () =>{

  //   console.log(userData.id)
  //   const uploadData = new FormData()

  //   uploadData.append('id', userData.id)
  //   uploadData.append('image', image, image.name)
  //   console.log(uploadData.image)
  
  //   fetch('http://127.0.0.1:8000/api/user/imageupload/', {
  //     method: 'POST',
  //     body: uploadData
  //   }).then(res => console.log(res)).catch(error => console.log(error))
  // }
  const [server_error, setServerError] = useState({})
  const [updateImage, {isLoading}] = useUpdateImageDataMutation()
  const [image , setImage] = useState()
  
  



  const handleUpdate = async (e)=>{
    e.preventDefault();
   // form se data ko yaha lena hai Webapi se FormData() milta hai official doc me check kar sakte hai
    // or iske jaghat state bana ke bh use kar sakte hai. 
    const data = new FormData(e.currentTarget);
    data.append('image', image)
    const updateData = {
        id: data.get('id'),
        userimage: data.get('image')
       
    }
    

    console.log("Updatedata:-", updateData)
    // const id = updateData.id
    // const imageData = data.get('image')
    // console.log("id:-", id)
    // console.log("userimage:-", imageData)
    
    fetch('http://127.0.0.1:8000/api/user/imageupload/', {
      method: 'PUT',
      body: updateData
    }).then(res => console.log(res)).catch(error => console.log(error))
    // const res = await updateImage({imageData, id})
    // console.log(res)
    //res pe response milega
  //  if(res.error){
  //   console.log(res.error.data.errors)
  //   setServerError(res.error.data.errors)
  //   console.log(server_error.usertype)
  //  }
  
  //  if(res.data ){
  //   console.log(res.data)
  //   // storeToken(res.data.token)
  //   window.location.reload();
    
  // }
  }


  return (
    <div>
      <h6>upload Image</h6>
      <Box component='form'  noValidate sx={{ mt:1 }} id='image-form' onSubmit={handleUpdate}>
          <TextField
          fullWidth
          label="ID"
          name="id"
          required
          value={userData.id}
          hidden
        />
        <IconButton 
        color="primary" 
        aria-label="upload picture" 
        component="label">
          <input hidden accept="image/*" type="file" name = "userimage" onChange={(e)=> setImage(e.target.files[0])}/>
          <PhotoCamera />
        </IconButton>
        <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      <Button size='small' type='submit' sx={{mt:3, mb:2, px:5}} variant='contained' >Upload</Button>
      </Box>

    </Box>
    </div>
  )
}

export default UploadImage
