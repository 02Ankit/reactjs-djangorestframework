import React,{useEffect, useState} from 'react'
import { Avatar, Box, Card, CardContent, InputLabel, ListItem, MenuItem, MenuList, NativeSelect, Select, TextField } from '@mui/material';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import SaveIcon from '@mui/icons-material/Save';
import { useUpdateNoteDataMutation, useUpdateTableDataMutation} from '../../../services/userAuthApi';
import DataTable from 'react-data-table-component';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import '../../../loader/Loader.css';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

const Notification = () => {

  const [userData, setUserData ] = useState([]);

  useEffect(()=>
    {
        // getUserData()
      fetch("http://127.0.0.1:8000/api/user/alluserlist/", 
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
          }
      ).catch(error => console.log(error))
    },[])

    const [userRole, setUserRole] = useState("student");
    const [studentClass, setStudentClass] = useState({})

    const [filteredStudentData, setFilteredStudentData] = useState([]);
    const [filteredTeacherData, setFilteredTeacherData] = useState([]);
    const [searchTeacher, setSearchTeacher] = useState("");
    const [searchStudent, setSearchStudent] = useState("")
    const [filterTeacherList, setFilterTeacherList] = useState("");
    const [filterStudentList, setFilterStudentList] = useState("");

   
    const getTeacherList = async () =>{
      try {
         const response = await axios.get("http://127.0.0.1:8000/api/user/teacherslist/")
         setFilteredTeacherData(response.data);
         setFilterTeacherList(response.data);
      } catch (error) {
       console.log(error);
      };
      
    }

    console.log("TeacherData",filteredTeacherData)

  useEffect(()=>
  {
      const result = filteredTeacherData.filter(filteredTeacherData =>
        {
          return filteredTeacherData.firstname.toLowerCase().match(searchTeacher.toLowerCase())
        })
        setFilterTeacherList(result)
  }, [filteredTeacherData, searchTeacher])

  const getStudentList = async () =>{
    try {
       const response = await axios.get("http://127.0.0.1:8000/api/user/studentslist/")
        
       const res = response.data
      
       setFilteredStudentData(response.data);
       setFilterStudentList(response.data);
    } catch (error) {
     console.log(error);
    };
    
  }
   




  useEffect(()=>
  {
      const result = filteredStudentData.filter(filteredStudentData =>
        {
          return filteredStudentData.userclass.toLowerCase().match(searchStudent.toLowerCase())
        })
        setFilterStudentList(result)
  }, [filteredStudentData, searchStudent])


  
 console.log("StudentData",filteredStudentData)






    useEffect(()=>{
      getStudentList()
      getTeacherList()
     
      
     }, [])


//**********************UpdateDataStart******************************
const userClass = [{name:"class-1", value:"class-1"},{name:"class-2", value:"class-2"},{name:"class-3", value:"class-3"},{name:"class-4", value:"class-4"},{name:"class-5", value:"class-5"},{name:"class-6", value:"class-6"},{name:"class-7", value:"class-7"},{name:"class-8", value:"class-8"},{name:"class-9", value:"class-9"},{name:"class-10", value:"class-10"},{name:"class-11", value:"class-11"},{name:"class-12", value:"class-12"}]


  // const [teacherName, setTeacherName] = useState({})

  const handleChangetype = (event) => {
    event.preventDefault();
    setUserRole(event.target.value);
  };

  console.log(userRole)

  const handleChangeclass = (event) => {
    event.preventDefault();
    let stuvalue = event.target.value
        setStudentClass(stuvalue);
   
   };

   console.log(studentClass)

  //  const handleChangeTeachername = (event) => {
  //   setTeacherName(event.target.value);
  //   event.preventDefault();
  //  };
   
  //  console.log(teacherName)


  // //  console.log(userRole)
  //  if(userRole == "teacher"){

  //  }
  //  else if(userRole == "student"){
  //    classData  =  selectClassNameData
  //      type = filteredData
  //   //  console.log("type", type)
  //   //  console.log("classData", classData)
  // }

  const [updateNoteData] = useUpdateNoteDataMutation()

  const handleUpdateUserNote = async (e)=>
  {   e.preventDefault();
      // form se data ko yaha lena hai Webapi se FormData() milta hai official doc me check kar sakte hai
      // or iske jaghat state bana ke bh use kar sakte hai. 
      const data = new FormData(e.currentTarget);
      
      const selectedData = {
          id: data.get('id'),
          usernote: data.get('usernote'), 
          
      }
      console.log("selectedData:-", selectedData)
      const id = selectedData.id
      console.log("id:-", id)
      
      const res = await updateNoteData({selectedData, id})
      // console.log(res)
  }
  const [userNote, setUserNote] = useState({});

  const handleChangeNote = (event) => {
   
    setUserNote(event.target.value);
 };


  const columns = [
    
    {
      name:"Image",
      selector:(row) => <Avatar width={50} height={50} />,
     
    },
    {
      name:"Name",
      selector:(row) => row.firstname + " " + row.lastname,
      sortable:true,
      width: "300px"  
    },


  
    { 
      name:"TeacherNote",
      width: "500px",
    cell:(row) => (
      <Box component='form' noValidate sx={{ mt:1 }} id='select-form' onSubmit={handleUpdateUserNote}>
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
          </div>
          <div>
          <TextField variant='outlined' name="usernote"  placeholder='Write Some Note Here ' value={row.userNote} defaultValue={row.usernote} multiline rows={5} maxRows={10} onChange = {handleChangeNote}/></div>
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
      
    name:"Email",
    selector:(row) => row.email,
    sortable:true,
    width: "300px"  
  },
    
];




const columnsstudent = [
    
  {
    name:"Image",
    selector:(row) => <Avatar />,
   
  },
  {
    name:"Name",
    selector:(row) => row.firstname + " " + row.lastname,
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
    
    name:"SendNote",
    width: "500px" ,
    cell:(row) => (
      <Box component='form' noValidate sx={{ mt:1 }} id='select-form' onSubmit={handleUpdateUserNote}>
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
          </div>
          <div>
          <TextField variant='outlined' name="usernote" placeholder='Write Some Note Here ' value={row.userNote} defaultValue={row.usernote} multiline rows={5} maxRows={10} onChange = {handleChangeNote}/></div>
          <div>
          <IconButton style={{marginTop:'10px', borderRadius:'8px', borderStyle:'2px', boxShadow: 'rgb(187 180 180 / 70%) 0px -1px 4px 1px' }} variant="outlined" type='submit' aria-label="save" size="small">
          <SaveIcon style={{ color:'#FCA61F'}}/>
          </IconButton>
          </div>
        </div>
      </Box>
    )
    
  },
  
];




// if (type) {
//   options = type.map((el) => <option key={el}> {el.userclass}</option>);
// }

// console.log(options)




  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

  console.log(BootyCheckbox)


  return (
  <div style={{marginTop:'70px',marginBottom:'40px'}} className="container">
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) :(
      <Box sx={{ mt: 3, mb:3}}>
        <Card>
          <CardContent>
                <Box component='form' noValidate sx={{ mt:1, gap:4, display: 'flex'}} id='select-form'>
                  <div style={{display:'flex', columnGap:6}}>
                      <div>
                          <TextField
                          fullWidth
                          label="ID"
                          name="id"
                          required
                          value={userData.id}
                          hidden
                        />

                        <InputLabel sx={{ mt: 4, minWidth: 120, fontSize: 14  }} 
                        id="selectusertype">SelectUserType *</InputLabel>  
                      <Select
                      sx={{mb: 1, minWidth: 200, fontSize: 14 }}
                      required
                      labelId="usertype"
                      name= "usertype"
                      id="usertype"
                      value={userRole}
                      defaultValue={userRole}
                      label="paystatus"
                      onChange={handleChangetype}
                    >   
                        <MenuList 
                        style={{cursor: 'pointer', borderLeft: '2px solid #38a9e3' }}onMouseEnter={(e) => e.target.style.color = '#38a9e3'}
                        onMouseLeave={(e) => e.target.style.color = 'black'}
                      primaryText="Home"  value={"teacher"}>Teacher</MenuList>
                      <MenuList 
                      style={{cursor: 'pointer', borderLeft: '2px solid #38a9e3' }}onMouseEnter={(e) => e.target.style.color = '#38a9e3'}
                      onMouseLeave={(e) => e.target.style.color = 'black'}
                    primaryText="Home"  value={"student"}>Student</MenuList>
                    </Select>
                    </div>
                  </div>
                  <div>
                  {
                  //   userRole === "student" && <InputLabel sx={{ mt: 4, minWidth: 120, fontSize: 14  }} 
                  // id="student-class-label">SelectClass *</InputLabel> 
                }
                  
                  {
                //   userRole === 'student' ? (<Select
                //   sx={{mb: 1, minWidth: 200, fontSize: 14 }}
                //   required
                //   labelId="student-class-label"
                //   name= "studentclass"
                //   id="studentclass"
                //   value={studentClass}
                //   defaultValue={studentClass}
                //   label="studentclass"
                //   onChange={handleChangeclass}
                // >
                // {userClass.map((item,i)=>  <MenuList style={{cursor: 'pointer', borderLeft: '2px solid #38a9e3' }}onMouseEnter={(e) => e.target.style.color = '#38a9e3'}
                // onMouseLeave={(e) => e.target.style.color = 'black'}  sx={{ fontSize: 16} } value={item.value}>{item.name}</MenuList>)}
                // </Select>) : ("")
              }
                </div>
            </Box>
      <Box> 
      </Box>
      </CardContent>
      </Card>
      <Box sx={{ mt: 3, mb:3}}>
      <Card>
      <CardContent>
        <Box sx={{ mt: 1, mb:1}}>
        {userRole === 'teacher' ?
        (<DataTable 
        title="TeacherList"
        columns={columns} 
        data={ filterTeacherList}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover 
        subHeader
        subHeaderComponent = {
          <input 
          type="text" 
          placeholder='Search here' 
          className="w-25 form-controll"
          value={searchTeacher}
          onChange={(e)=> setSearchTeacher(e.target.value)}
          />}
        />) : (<DataTable 
          title="StudentList"
          columns={columnsstudent} 
          data={ filterStudentList}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRows
          selectableRowsComponent={BootyCheckbox}
          selectableRowsHighlight
          highlightOnHover 
          subHeader
          subHeaderComponent = {
            <input 
            type="text" 
            placeholder='Search here' 
            className="w-25 form-controll"
            value={searchStudent}
            onChange={(e)=> setSearchStudent(e.target.value)}
            />}
          />)}
          
          
        </Box>
      </CardContent>
      </Card>
    </Box>
    </Box>
    
  )}
     
  </div>
  
  )
}

export default Notification