import React,{useEffect, useState} from 'react'
import { Avatar, Box, Card, CardContent, MenuItem, Select, TextField } from '@mui/material';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import SaveIcon from '@mui/icons-material/Save';
import { useUpdateTableDataMutation, useUserDeleteRowMutation } from '../../../services/userAuthApi';
import DataTable from 'react-data-table-component';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import '../../../loader/Loader.css';

const Studentlist = () => {
  const [search, setSearch] = useState("");
  const [userData, setUserData ] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  //***********************Using Without axois******************************/
  useEffect(()=>
    {
        // getUserData()
      fetch("http://127.0.0.1:8000/api/user/studentslist/", 
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
          setUserData(resp)
          setFilteredData(resp)
          }
      ).catch(error => console.log(error))
    },[])
    
  
  useEffect(()=>
  {
    const result = userData.filter(userData =>{
      return userData.firstname.toLowerCase().match(search.toLowerCase())
    })
    setFilteredData(result)
  }, [userData, search])

  
  const getUserData = async () =>{
    try {
       const response = await axios.get("http://127.0.0.1:8000/api/user/studentslist/")
       setFilteredData(response.data);
    } catch (error) {
     console.log(error);
    };
   }


//**********************UpdateDataStart******************************
   const [userRole, setUserRole] = useState({});
   const handleChangetype = (event) => {
    
    setUserRole(event.target.value);
  };

  const [userPayment, setUserPayment] = useState({});
  const handleChangePay = (event) => {
   
   setUserPayment(event.target.value);
 };

  const [updateTable] = useUpdateTableDataMutation()
  
  const handleUpdate = async (e)=>
  {   e.preventDefault();
      // form se data ko yaha lena hai Webapi se FormData() milta hai official doc me check kar sakte hai
      // or iske jaghat state bana ke bh use kar sakte hai. 
      const data = new FormData(e.currentTarget);
      const selectedData = {
          id: data.get('id'),
          usertype: data.get('usertype'), 
          
      }
      console.log("Selectdata:-", selectedData)
      const id = selectedData.id
      console.log("id:-", id)
      
      const res = await updateTable({selectedData, id})
      console.log(res)
      getUserData()
  }

  const handleUpdatePay = async (e)=>
  {   e.preventDefault();
      // form se data ko yaha lena hai Webapi se FormData() milta hai official doc me check kar sakte hai
      // or iske jaghat state bana ke bh use kar sakte hai. 
      const data = new FormData(e.currentTarget);
      const selectedData = {
          id: data.get('id'),
          paystatus: data.get('paystatus'), 
          
      }
      console.log("Selectdata:-", selectedData)
      const id = selectedData.id
      console.log("id:-", id)
      
      const res = await updateTable({selectedData, id})
      console.log(res)
      getUserData()
  }

//************************DeleteDataStart******************************
  const [deleteRow] = useUserDeleteRowMutation()
  const handleDelete = async (id)=>{
    let res =  await deleteRow({id: id})
    
     getUserData()
    console.log(res)
  }


  const columns = [
    
    {
      name:"Image",
      selector:(row) => <Avatar width={50} height={50} />,
     
    },
    {
      name:"First Name",
      selector:(row) => row.firstname,
      sortable:true,
      width: "200px"  
    },
    {
      name:"Last Name",
      selector:(row) => row.lastname,
      sortable:true,
      width: "200px"  
    },
  
    {
      name:"Email",
      selector:(row) => row.email,
      sortable:true,
      width: "300px"  
     
    },
  
    {
      name:"Contact",
      selector:(row) => row.contact,
      sortable:true,
      width: "200px" 
    },
    {
      name:"Gender",
      selector:(row) => row.gender,
      sortable:true,
      width: "200px" 
    },
    {
      name:"Class",
      selector:(row) => row.userclass,
      sortable:true,
      width: "200px" 
    },

    {
      name:"UserType",
      width: "300px" ,
      cell:(row) => (
        <Box component='form' noValidate sx={{ mt:1 }} id='select-form' onSubmit={handleUpdate}>
          <div style={{display:'flex', columnGap:6}}>
              <div>
              <TextField
              fullWidth
              label="ID"
              name="id"
              required
              value={row.id}
              hidden
            />
              <Select
              sx={{mb: 1, minWidth: 200, fontSize: 14 }}
              required
              labelId="SelectUserType"
              name= "usertype"
              id="userType"
              value={row.userRole}
              defaultValue={row.usertype}
              label="users"
              onChange={handleChangetype}
            >
            <MenuItem sx={{ fontSize: 12} } value={"teacher"}>Teacher</MenuItem>
            <br/>
            <MenuItem sx={{ fontSize: 12} } value={"student"}>Student</MenuItem>
            
            </Select>
            </div>
            <div>
              <IconButton style={{marginTop:'10px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small">
              <SaveIcon style={{ color:'#FCA61F'}}/>
              </IconButton>
            </div>
          </div>
        </Box>
      )
    },
    
    {
      name:"Paystatus",
      width: "300px" ,
      cell:(row) => (
        <Box component='form' noValidate sx={{ mt:1 }} id='pay-form' onSubmit={handleUpdatePay}>
          <div style={{display:'flex', columnGap:6}}>
              <div>
              <TextField
              fullWidth
              label="ID"
              name="id"
              required
              value={row.id}
              hidden
            />
              <Select
              sx={{mb: 1, minWidth: 200, fontSize: 14 }}
              required
              labelId="PayStatus"
              name= "paystatus"
              id="paystatus"
              value={row.userPayment}
              defaultValue={row.paystatus}
              label="paystatus"
              onChange={handleChangePay}
            >
            <MenuItem sx={{ fontSize: 12} } value={"paid"}>Paid</MenuItem>
            <br/>
            <MenuItem sx={{ fontSize: 12} } value={"unpaid"}>UnPaid</MenuItem>
            
            </Select>
            </div>
            <div>
              <IconButton style={{marginTop:'10px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small">
              <SaveIcon style={{ color:'#FCA61F'}}/>
              </IconButton>
            </div>
          </div>
        </Box>
      )
    },

    {
      name:"Action",
      width: "300px" ,
      cell:(row) => (
        <div>
              <IconButton style={{marginTop:'5px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small" onClick={() => handleDelete(row.id)}
              >
                <DeleteIcon style={{ color:'#FCA61F'}}/>
              </IconButton>
          </div>
      )
    },
    // {
    //   button: true,
    //   cell: () => (
    //     <div className="App">
    //       <div class="openbtn text-center">
    //         <button
    //           type="button"
    //           class="btn btn-primary"
    //           data-bs-toggle="modal"
    //           data-bs-target="#myModal"
    //         >
    //           Open modal
    //         </button>
    //         <div class="modal" tabindex="-1" id="myModal">
    //           <div class="modal-dialog">
    //             <div class="modal-content">
    //               <div class="modal-header">
    //                 <h5 class="modal-title">Modal title</h5>
    //                 <button
    //                   type="button"
    //                   class="btn-close"
    //                   data-bs-dismiss="modal"
    //                   aria-label="Close"
    //                 ></button>
    //               </div>
    //               <div class="modal-body">
    //                 <p>Modal body text goes here.</p>
    //               </div>
    //               <div class="modal-footer">
    //                 <button
    //                   type="button"
    //                   class="btn btn-secondary"
    //                   data-bs-dismiss="modal"
    //                 >
    //                   Close
    //                 </button>
    //                 <button type="button" class="btn btn-primary">
    //                   Save changes
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // }
  
  ];

//***********************Using With axois Start******************************/
  
  // const getUserData = async () =>{
  //   try {
  //      const response = await axios.get("http://127.0.0.1:8000/api/user/useralldata/")
  //      setUserData(response.data);
  //   } catch (error) {
  //    console.log(error);
  //   };
  //  }
//***********************Using With axois End******************************/
  const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="form-check">
      <input
        htmlFor="booty-check"
        type="checkbox"
        className="form-check-input"
        ref={ref}
        onClick={onClick}
        {...rest}
      />
      <label className="form-check-label" id="booty-check" />
    </div>
  ));

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="container">
    {loading ? (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    ) :(
    <Box sx={{ mt: 3, mb:3}}>
      <Card>
        <CardContent>
          <Box sx={{ mt: 3, mb:3}}>
            <DataTable 
            title="StudentList"
            columns={columns} 
            data={filteredData}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsComponent={BootyCheckbox}
            selectableRowsHighlight
            highlightOnHover 
            actions = {<button className='btn btn-sm btn-info'>Export</button>}
            subHeader
            subHeaderComponent = {
              <input 
              type="text" 
              placeholder='Search here' 
              className="w-25 form-controll"
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
              />}
            />
        
          </Box>
        </CardContent>
      </Card>
    </Box>
    )}
    </div>
  )
}

export default Studentlist