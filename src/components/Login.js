import React,{useState} from 'react';
import '../App.css';
import axios from 'axios';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid ,Card,CardContent,Container} from '@material-ui/core';
import { Button } from '@material-ui/core';
import {FormHelperText} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles,} from '@material-ui/core/styles';

import {Redirect} from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    maxWidth: 395,
    borderRadius:10,
    boxShadow:"0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
  },
  title: {
    fontSize: 40,
    color:"rgb(0,128,255)"
  },
  sideFont:{
    fontSize:26,
    fontFamily:"Helvetica,Arial,sans-serif"
  },
  pos: {
    marginBottom: 12,
  },
  loginButton:{
    backgroundColor:"#1877f2",
    height:50,fontSize:"20px",
    fontFamily:"Helvetica,Arial,sans-serif",
    color:"whitesmoke"
  },
  createButton:{
    marginLeft:80,marginRight:80,height:50,
    backgroundColor:"#42B72A",fontSize:"15px",
    color:"white",
    fontFamily:"Helvetica,Arial,sans-serif"
  }
});
 const Login = ()=> {
    const classes = useStyles();
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [validEmail, setemailError] = useState({emailError:'',Error:false})
    const [validPassword,setPassowordError] = useState({passwordError:'',Perror:false})
    const [errorfromBackend, seterrorfromBackend] = useState('')
    const [addNewcontact,setNewcontact] = useState(false)


    const CheckingDialogue =()=>{
      setNewcontact(true)
    }

//inputs validating....
    const userValid = ()=>{
        if(!Email.includes("@") || !Email.includes('.')){
            setemailError({emailError:'please enter valid email',Eerror:Boolean(true)})
            return false;
        }
        setemailError({emailError:'',Eerror:Boolean(false)})

        if(Password.length<8){
            setPassowordError({passwordError:'please enter strong password',Perror:Boolean(true)})
            return false;
        }
        setPassowordError({passwordError:'',Perror:Boolean(false)})
        return true;
    }
    
// Details submiting.....
    const LoginSubmit = (e) =>{
        e.preventDefault();
        if(userValid()){
          const email = Email;
          const password = Password;
          const data = {
            email,password
          }
//using axios for posting data...          
          axios.post("http://localhost:5050/phonecontacts/post/login",data)
          .then(responce=>{
            console.log(responce,"posting data....");  
            seterrorfromBackend(responce.data.msg)
          })
          .catch(error=>{
            console.log(error,"errorrr...");  
          })
          localStorage.setItem("login email",data.email)
        }
    }
   
    return (
      <div>
        <Container maxWidth="sm">
            <Grid container >
            <Grid item>
                <h1 className={classes.title}>Phone Book</h1>
                <p className={classes.sideFont}>it helps you to save your contact details here... </p>
                </Grid>
            <Grid item>
            <Card className={classes.root} variant="outlined">
              <p style={{color:"red"}}>{errorfromBackend}</p>
                <CardContent >
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="component-outlined">Email Or phoneNumber</InputLabel>
                        <OutlinedInput
                        required
                            id="component-outlined"
                            label="Email Or phoneNumber"
                            value={Email}
                            onChange={(e)=>setEmail(e.target.value)}
                            labelWidth={60}
                            error={Boolean(validEmail.emailError)}
                        /> 
                            <FormHelperText id="component-error-text"  style={{color:'red'}} >{validEmail.emailError}</FormHelperText>
                            <br />
                    </FormControl> 
  
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="component-outlined">password</InputLabel>
                        <OutlinedInput
                            id="component-password"
                            type="password"
                            label="password"
                            value={Password}
                            onChange={(e)=>setPassword(e.target.value)}
                            labelWidth={60}
                            error={Boolean(validPassword.Perror)}
                        /> 
                            <FormHelperText id="component-error-text"  style={{color:'red'}} >{validPassword.passwordError}</FormHelperText>
                    </FormControl>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" size="large" 
                  className = {classes.loginButton}
                  onClick={LoginSubmit}
                  >
                      Log in
                  </Button>
                </CardActions>
                <div className="line">
                  <hr />
                </div>
                <CardActions>
                  <Button fullWidth variant="contained" 
                  size="large"
                  className = {classes.createButton}
                  onClick={CheckingDialogue}
                  >
                  Create New Account
                  </Button>
                </CardActions>
            </Card>
            
          </Grid>
          </Grid>
        </Container>
            {addNewcontact ? <Redirect to ="/newuser" /> : null }
            {errorfromBackend === "successfully login" ? <Redirect to = "/contactpage" /> : null}

      </div>
    )
}

export default Login;
