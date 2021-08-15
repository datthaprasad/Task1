const express=require('express');
const bodyParser=require('body-parser');
const validator=require('validator');

const route=require('./routes/routesHelper')

const app=express();


app.use(bodyParser.urlencoded({
    extended: true
}));


//FOR RENDER REGISTER HTML

app.get('/Register',(req,res)=>{
    res.sendFile(__dirname+'/HTML/Register.html')
})


//HANDLE REGISTERED DATA

app.post('/Register_User',(req,res)=>{
    if(!validator.isStrongPassword(req.body.password))
        res.send("Password is not sstrong, it should contain minimum 8 characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special characer");
    else if(!validator.isMobilePhone(req.body.phone,"en-IN"))
        res.send("Mobile is not valid")
    else{
        const value=route.addUser(req.body.name,req.body.email,req.body.phone,req.body.password,req.body.gender)
        if(value===1)
            res.send("User added succesfully");
        else
            res.send("Email already takened!")
    }
})



//FOR RENDER LOGIN HTML

app.get('/Login',(req,res)=>{
    res.sendFile(__dirname+'/HTML/Login.html')
})

//FOR HANDLE LOGIN DATA

app.post('/Login_User',(req,res)=>{

    let value=route.getUser(req.body.email,req.body.password);
    if(value==0){
        res.send("user not found")
    }
    else{
        res.send(value)
    }
})


//FOR RENDER ADMIN LOIN HTML

app.get('/Admin_Login',(req,res)=>{
    res.sendFile(__dirname+'/HTML/adminLogin.html')
})

//FOR HANDLE ADMIN LOGIN DATA

app.post('/Login_Admin',(req,res)=>{

    let value=(req.body.email==="Admin"&&req.body.password==="Admin123");
    if(value==0){
        res.send("Admin not found")
    }
    else{
        const users=route.loadUsers();
        
        res.send(users);
        
    }
})



//render Home page 

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/HTML/HTML.html')
   
})

app.listen(5000,()=>{
    console.log("listening on port 5000");
});
