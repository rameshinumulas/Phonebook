const fs = require('fs')

module.exports=((signups,signUpdetails)=>{
    // for creating new user account... post method
    signups.post('/post/signup',(req,res)=>{
        const newUser = {
            firstName:req.body.firstName,
            email:req.body.email,
            password:req.body.password,
            phoneBook:[],
        }
        if(!newUser.firstName || !newUser.email || !newUser.password){
            return false;
        }
        const exitMsg = signUpdetails.some(each=>(each.email === req.body.email && each.password === req.body.password))
        if (exitMsg){
            res.json({msg:" your account alredy  exits"})
        }
        else{
            signUpdetails.push(newUser);
            res.json({msg:"succuessfully your account created"})
            fs.writeFileSync("./phoneBook/signUp.json",JSON.stringify(signUpdetails,null,4),null)
            console.log("details updated");
        }
    })
})