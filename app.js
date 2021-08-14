const express=require('express');
const bodyParser=require('body-parser');
const fs=require('fs');

const route=require('./Routes/route')

const app=express();


app.use(bodyParser.urlencoded({
    extended: true
}));


//FOR RENDER REGISTER HTML

app.get('/Register',(req,res)=>{
    res.sendFile('/home/admin1/Documents/INTERNSHIP CODES/Task1/HTML/Register.html')
})


//HANDLE REGISTERED DATA

app.post('/Register_User',(req,res)=>{

    const value=route.addUser(req.body.name,req.body.email,req.body.phone,req.body.password,req.body.gender)
    if(value===1)
        res.send("User added succesfully");
    else
        res.send("Email already takened!")
})



//FOR RENDER LOGIN HTML

app.get('/Login',(req,res)=>{
    res.sendFile('/home/admin1/Documents/INTERNSHIP CODES/Task1/HTML/Login.html')
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




//render Home page 

app.get('/',(req,res)=>{
    res.sendFile('/home/admin1/Documents/INTERNSHIP CODES/Task1/HTML/HTML.html')
   
})

app.listen(5000,()=>{
    console.log("listening on port 5000");
});
