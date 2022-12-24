import { Box, Button, Card, CardActionArea, CardHeader, Grid, IconButton, Input, Link ,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSaveUploadPdfMutation, useDeletePdfDataMutation, useUpdatePdfDataMutation } from '../../../services/userAuthApi'
import { makeStyles} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const UploadPdf = () => {
    
const [error, setError] = useState({status:false,msg:'',type:''})
const [saveUploadPdf] = useSaveUploadPdfMutation()
const [updatePdfData] = useUpdatePdfDataMutation()

const [uploadPdf, setUploadPdf] = useState({})

const [getUploadPdf, setGetUploadPdf] = useState([])
const [filteredUploadPdf, setFilteredUploadPdf] = useState([])

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
      backgroundColor:'white',
      marginBottom:'25px'
    },

    innercard:{
      backgroundColor:'#FCA61F',
      margin:'10px'
    },

    imageList: {
      width: 500,
      height: 350,
    },
  }));
  const classes = useStyles();

  // const getPdfData = async () =>{
  //   try {
  //      const response = await axios.get("http://127.0.0.1:8000/api/user/uploadpdf/")
  //      console.log("Pdf", response.data.UploadPdf)
  //      setFilteredUploadPdf(response.data.UploadPdf);
  //   } catch (error) {
  //    console.log(error);
  //   };
  //  }

  useEffect(()=>
  {
        // getUserData()
      fetch("http://127.0.0.1:8000/api/user/uploadpdf/", 
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
         console.log("Pdf", resp.UploadPdf)
         
         setGetUploadPdf(resp.UploadPdf)
        }
      ).catch(error => console.log(error))
  },[])
 



const handleSubmit = async (e) =>{
    e.preventDefault();
    const pdfdata = new FormData(e.currentTarget)

    pdfdata.append('service_pdf', uploadPdf)
    console.log('service_pdf', pdfdata.get('service_pdf'))
    console.log('id', pdfdata.get('pdfid'))
    
const getpdf ={
  // id: pdfdata.get('pdfid'),
  service_pdf: pdfdata.get('service_pdf')
}
      // const id = getpdf.id
      const res = await saveUploadPdf(pdfdata)

      if (res.data.status === "success") {
        
        setError({ status: true, msg: " Pdf Update Successfully", type: 'success' })
        getPdfData()
        document.getElementById('pdfUploader-form').reset()
        
      }
    }
    

  const getPdfData = async () =>{
      try {
         const response = await axios.get("http://127.0.0.1:8000/api/user/uploadpdf/")
         setGetUploadPdf(response.data.UploadPdf);
         console.log(response.data.UploadPdf)
      } catch (error) {
       console.log(error);
      };
     }

     
     const [deletePdfId] = useDeletePdfDataMutation()

     const removePdf = async (id)=>{
      const resPdf = await deletePdfId({id: id})
      getPdfData()
    } 



  return (
    <div>
      <Card className={classes.card}>
        <CardActionArea>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6} >
              <Card style={{padding:20, marginTop:10}}>
                <CardHeader
                  subheader="Upload Pdf "
                  title="Add Service-PDF"
                />
                {/*error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''*/}

                <Box component='form' noValidate sx={{ mt:1 }} id='pdfUploader-form' onSubmit={handleSubmit} enctype="multipart/form-data">
                        
                      <TextField
                        fullWidth
                        label="ID"
                        name="pdfid"
                        required
                        hidden
                        value={filteredUploadPdf.id}
                        
                      />  

                    <Button style={{ margin:40,}}
                        variant="contained" 
                        size="small" 
                        component="label"
                        >
                        
                        <Input  id = 'uploadpdf' name ='upload_pdf' accept="image/*" multiple type="file" onChange={(e)=>{setUploadPdf(e.target.files[0])}} 
                        value={filteredUploadPdf.service_pdf}/>
                    </Button>
                      
                    <Button size='small' type='submit' sx={{mt:3, mb:2, px:5}} variant='contained' >Save</Button>
                  </Box>
                </Card>
              </Grid>

            <Grid item lg={6} sm={6} >
              <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'info.light', padding: 1 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}> List of Pdf</Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Url</TableCell>
                          <TableCell align="center">Pdf</TableCell>
                          <TableCell align = "center">Delete</TableCell>
                        </TableRow>
                      </TableHead>
                  <TableBody>     
                  {getUploadPdf.map((uploadpdf, i) => {
                    return (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center"> <Link style = {{color:'#0000FF'}} color={'#0000FF'} 
                      href={`http://127.0.0.1:8000/.${uploadpdf.service_pdf}`} >
                      </Link></TableCell>
                      <TableCell align="center">
                        <span style={{ fontSize:18, marginRight: '20px'}}>
                          <Link href={`http://127.0.0.1:8000/.${uploadpdf.service_pdf}`} target="_blank">
                            <PictureAsPdfIcon style={{color: 'orange'}}>
                            </PictureAsPdfIcon>
                          </Link>
                        </span>
                      </TableCell>
                      <TableCell align="center">
          
                    <IconButton style={{marginTop:'5px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small" onClick={() => removePdf(uploadpdf.id)}
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
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
   </div>
  )
}

export default UploadPdf