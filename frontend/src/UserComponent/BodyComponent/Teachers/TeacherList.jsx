import React,{useEffect, useState} from 'react';
import { Avatar, Box, Card, CardContent, MenuItem, Select, TextField} from '@mui/material';
import DataTable from "react-data-table-component";
import SaveIcon from '@mui/icons-material/Save';
import { useUpdateTableDataMutation, useUserDeleteRowMutation } from '../../../services/userAuthApi';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
// import Select from 'react-select'
import './Loader.css';

const TeacherList = () => {
    const [search, setSearch] = useState("");
    const [userData, setUserData ] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    // const [deletedData, setDeletedData] = useState();
    const [userRole, setUserRole] = useState({});
  //***********************Using Without axois******************************/
  useEffect(()=>
  {
        // getUserData()
      fetch("http://127.0.0.1:8000/api/user/teacherslist/", 
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
       const response = await axios.get("http://127.0.0.1:8000/api/user/teacherslist/")
       setFilteredData(response.data);
    } catch (error) {
     console.log(error);
    };
   }
  
  const handleChange = (event) => {
    
    setUserRole(event.target.value);
  };

//**********************UpdateDataStart******************************
  const [updateTable] = useUpdateTableDataMutation()

  const handleUpdate = async (e)=>{
    e.preventDefault();
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
    console.log("updatetable", res)
    getUserData()
  }

  //**********************DeleteDataStart******************************
  
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
                  onChange={handleChange}
                >
                <MenuItem sx={{ fontSize: 12} } value={"teacher"}>Teacher</MenuItem>
                <br/>
                <MenuItem sx={{ fontSize: 12} } value={"student"}>Student</MenuItem>
                
              </Select>
          </div>
          <div>
              <IconButton style={{marginTop:'10px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small"
              >
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
              <IconButton style={{marginTop:'5px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small"  onClick={() => handleDelete(row.id)}
              >
                <DeleteIcon style={{ color:'#FCA61F'}}/>
              </IconButton>
          </div>
      )
    },
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
          title="TeacherList"
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

export default TeacherList