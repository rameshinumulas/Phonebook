const fs = require('fs');

module.exports = ((firstRout,signUpdetails)=>{
    // Adding new contact 
    firstRout.post('/post/addnewcontact',(req,res)=>{
        
        newContact = {
            firstname:req.body[1].firstName,
            lastname:req.body[1].lastName,
            number:parseInt(req.body[1].phoneNumber)
        }
        console.log(req.body,newContact,req.body[1]);
        for ( let eachList in signUpdetails){
                if (signUpdetails[eachList].email===req.body[0]){
                    signUpdetails[eachList].phoneBook.push(newContact)
                    res.json({msg:signUpdetails[eachList].phoneBook})
                    break
                }
        }
        fs.writeFileSync("./phoneBook/signUp.json",JSON.stringify(signUpdetails,null,4),null)
    })

    //Displaying every contact for uniq users...
    firstRout.post('/post/gettingContacts',(req,res)=>{
        for ( let one in signUpdetails){
            if (signUpdetails[one].email===req.body[0]){
                res.json({msg:signUpdetails[one].phoneBook})
                break
            }
        }
    })


    //deleting contact from user requirments...
    firstRout.delete('/delete/singlenumber/:number/:name',(req,res)=>{

        for ( let one in signUpdetails){
            if (signUpdetails[one].email === req.params.name){
                const filterItems = signUpdetails[one].phoneBook.
                filter(item =>item.number !== parseInt(req.params.number))
                signUpdetails[one].phoneBook = filterItems
                res.json({msg:signUpdetails[one].phoneBook})
            }
        }
        fs.writeFileSync("./phoneBook/signUp.json",JSON.stringify( signUpdetails,null,4),null)
    })
})




