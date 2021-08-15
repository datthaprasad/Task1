
const fs=require('fs');

const addUser=(name,email,phone,password,gender)=>{
    const users=loadUsers();

    if(!users.find((user)=>user.email===email)){
        users.push({
            name:name,
            phone:phone,
            email:email,
            password:password,
            gender:gender,
        }
        )
        saveUsers(users);
        return 1; //USER ADDED SUCCEFULLY

    }
    else{
        return 0; //EMAIL TAKENED
    }

}




const getUser=(email,password)=>{
    const users=loadUsers();
    const user=users.find((user)=>user.email===email&&user.password===password);
    if(user){
        return(JSON.stringify(user));  //USER FOUND
    }
    else{
        return(0); //USER NOT FOUND
    }

}


const loadUsers=()=>{
    try{
        const usersBuffer=fs.readFileSync('users.json');
        const users=usersBuffer.toString();
        return JSON.parse(users);

    }
    catch(error){
        return [];
    }
}

const saveUsers=(users)=>{
    const data=JSON.stringify(users);
    fs.writeFileSync('users.json',data);
}

module.exports={
    addUser:addUser,
    getUser:getUser,
    loadUsers:loadUsers
}