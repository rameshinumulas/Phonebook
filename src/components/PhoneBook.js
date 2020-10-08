import React,{useState,useEffect} from 'react'
import axios from 'axios';


import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';
import {FormHelperText} from '@material-ui/core';
import { Button,Typography} from '@material-ui/core';
import { Paper,Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { createMuiTheme,} from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    rootpaper: {
        width: theme.spacing(50),
        height: theme.spacing(50),
    },
    grid: {
        display:"flex",
        flexDirection:'column'
    },
    maingrid: {

    },
    innerdiv: {
        marginTop:30,
        alignItems:"center",
        // marginLeft:50
    },
    tableroot:{
        maxWidth:1100,
        display:"flex",
        justifyContent:'center',
    },
    paperoot:{
        maxWidth:800,
    }
  }));
const PhoneBook =()=> {
    //Hooks state...
const [FirstName, setFirstName] = useState('')
const [LastName, setLastName] = useState('')
const [Phone, setPhone] = useState('')
const [saveDetails,setDetails] = useState([])
const [phoneError, setPhoneError] = useState({dispalyPhoneError:'',displayNameError:'', alertError:false})
const [usersContacts, setusersContacts] = useState([])


const classes = useStyles();


// validating
const ValidDetails = ()=>{
    console.log(Phone.length,"phone nimberrrr");

    if(FirstName.length<1){
        setPhoneError({displayNameError:"please provide your name",alertError:true})
        return false
    }
    if(Phone.length !==10){
        setPhoneError({dispalyPhoneError:"mobile number must be 10 digits",alertError:true})
        return false
    }
   
    return true
}

useEffect(() => {
    console.log(localStorage.getItem("login email"));
    
    axios.post("http://localhost:5050/phonecontacts/post/gettingContacts",[localStorage.getItem("login email")])
    .then(collectdata=>{
        const signleusersData = collectdata.data.msg
        setusersContacts(signleusersData)
        console.log(usersContacts,"for displaying data");
    })
    .catch(err=>err)
}, [])
const SubmitData=(e)=>{
    if(ValidDetails()){
        setPhoneError({
        alertError:false
        })
        const allData=[...saveDetails];
        setDetails(allData)
        setFirstName('')
        setLastName('')
        setPhone('')
        const firstName = FirstName;
        const lastName = LastName;
        const phoneNumber = Phone;
        const NewcontactData = {
            firstName,lastName,phoneNumber
        }
        axios.post("http://localhost:5050/phonecontacts/post/addnewcontact",[localStorage.getItem("login email"),NewcontactData])
        .then(userData=>{
            var eachData =userData.data.msg
            console.log(eachData,'xcvbnm,');
            
        })
        .catch(error=>console.log(error,"error coming"));

        axios.post("http://localhost:5050/phonecontacts/post/gettingContacts",[localStorage.getItem("login email")])
        .then(collectdata=>{
            const signleusersData = collectdata.data.msg
            setusersContacts(signleusersData)
        })
        .catch(err=>err)
   
    }
}

const DeleteNumber = (value)=>{
    axios.delete(`http://localhost:5050/phonecontacts/delete/singlenumber/${value}/${localStorage.getItem("login email")}`)
    .then(deleteData=>
        {
            const After_deleting = deleteData.data.msg
            setusersContacts(After_deleting)
        })
    .catch(err=>{console.log(err,"errr");
    })

}


//using MUI data table for displaying user contacts....
const getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor:"rgba(237, 241, 241, 0.979);",
          color:"rgb(10,10,10)"
        },
 
      },

    }
  })
  

  const columns = [ 
    {
        name: "firstname",
        label: "First Name",
        options: {
         filter: true,
         sort: true,
        }
       },
    {
        name:"lastname",
        label:'Last Name',
        options:{
            filter:true,
            sort:true,
        }
    },
    {
        name:"number",
        label:'Number',
        options:{
            filter:true,
            sort:true,     
        }
    },
    {
        name: "number",
        label: "Remove",
        options: {
        filter: true,
        sort: true,
        // selectableRows:false,
        customBodyRender: (value) => {
            return (
               <DeleteIcon cursor="pointer" onClick={()=> DeleteNumber(value)} />
              )
            }
      }
      }
  ]
  const options = {
    selectableRows:"none",
    filter: true,
    caseSensitive:false,
    search: true,
    download: false,
    viewColumns: false,
    print: false,
   };
const AgianRendering = ()=>{
    return(
    <MuiThemeProvider theme={getMuiTheme()}>
    <MUIDataTable 
        title={"Contacts"} 
        data={usersContacts} 
        columns={columns} 
        options={options} 
    />
    </MuiThemeProvider>
    )
}


    return (
        <div>
            <div className="contact-div">
            <Grid container spacing={6} className={classes.maingrid}>
            <Grid item ms={3} xs={3}>

            </Grid>
            <Box>            
            <Grid item ms={3} xs={6} className={classes.grid}>
                <div style={{marginLeft:80}}>
                <Typography variant="h6" component="h3" style={{color:'#ff3333'}}>
                    Add new Contact
                </Typography>
                <Grid className={classes.innerdiv}>
                <FormControl variant="outlined" style={{width:250}}>
                    <InputLabel htmlFor="component-outlined">First Name</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="First Name"
                        value={FirstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        error={Boolean(phoneError.alertError)}
                    /> <br />
                        <FormHelperText id="component-error-text"  style={{color:'red'}} >{phoneError.displayNameError}</FormHelperText>
                </FormControl>
                </Grid>
                <Grid>
                <FormControl variant="outlined" style={{width:250}}>
                    <InputLabel htmlFor="component-outlined">Last Name</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="First Name"
                        value={LastName}
                        onChange={(e)=>setLastName(e.target.value)}
                    /> <br />
                </FormControl>
                </Grid>
                <Grid>
                <FormControl variant="outlined" style={{width:250}}>
                    <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Phone"
                        type="number"
                        value={Phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        error={Boolean(phoneError.alertError)}

                    /> <br />
                    <FormHelperText id="component-error-text"  style={{color:'red'}} >{phoneError.dispalyPhoneError}</FormHelperText>
                </FormControl> 
                </Grid>
                <Button variant="contained" style={{width:250,backgroundColor:"#16a085",color:"#ffffff"}} onClick={SubmitData}>
                    Save
                </Button>
                </div>
                </Grid>
                </Box>
                <Grid item ms={3} xs={12} className={classes.tableroot}>
                <Paper elevation={10} className={classes.paperoot}>
                    <AgianRendering />
                </Paper>
                </Grid>
                </Grid>
                <br />
                </div>
                <div>
                
                </div>
        </div>
    )
}

export default PhoneBook