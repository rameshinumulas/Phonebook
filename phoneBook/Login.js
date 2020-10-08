module.exports = ((logins,signUpdetails)=>{
    //for varifying user details.. post method
    logins.post('/post/login',(req,res)=>{
        const newUserLogin = {
            email:req.body.email,
            password:req.body.password
        }
        var emailmessage=false
        var passmessage = false

        // checking email and password of the existing user
        for (let i of signUpdetails){
            if(i.email === newUserLogin.email){
                console.log("your email is currect");
                var emailmessage=true;
                if (i.password === newUserLogin.password){
                    console.log("your password also currect");
                    var passmessage = true;
                }
            }
        
        }
        // response message
        if (emailmessage){
            console.log(passmessage);    
            if(passmessage){
            res.json({msg:"successfully login"})
            }else{
            res.json({msg:"please check your password"})
            }
        }else{
            res.json({msg:"your account does't exits please signup..."})
        }
       
    })
}) 