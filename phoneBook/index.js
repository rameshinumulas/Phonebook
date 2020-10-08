const express = require('express');
const app = express();
const router = express.Router(); 
const cors = require('cors')
const fs = require('fs')
app.use(express.json());
app.use(cors());


let signUpdetails = JSON.parse(fs.readFileSync("./phoneBook/signUp.json"))


app.use("/phonecontacts",router)
//new user details router
require('./phoneBook/signUp')(router,signUpdetails);
// user login page router
require('./phoneBook/Login')(router,signUpdetails);
//user contact page router
require('./phoneBook/Phonebook')(router,signUpdetails);

app.listen(5050,(err)=>{
    if(err)throw err
    console.log("post is working properly")
})


    



