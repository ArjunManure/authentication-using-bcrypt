const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const { name } = require("ejs");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.use(express.static("public"));

app.get('/',(req,res) =>{
    res.render('login');
});

app.get('/signup',(req,res) =>{
    res.render("signup");
});
//REGISTER USERS

app.post("/signup", async(req,res) =>{
    const data ={
        name: req.body.username,
        password: req.body.password
    }

    // checking if user already exists 

    const existingUser = await collection.findOne({name: data.name});

    if(existingUser){
        res.send("Username is already existing choose different name")
    }
    else{
        // hashing the password using bcrypt
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRound);
        
        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
    
});

//login user

app.post("/login", async (req,res) =>{
    try{
        const check = await collection.findOne({name: req.body.username});

        if(!check){
            res.send("user name cannot found")
        }

        //comparing the password
        const ispasswordMatch = await bcrypt.compare(req.body.password , check.password);
        if(ispasswordMatch){
            res.render("home");
        }
        else{
            res.send("Password is incorrect.Please try again ");
        }

    }
    catch{
        res.send(" Username or Password is Wrong");
    }
});


app.listen(port,() =>{
    console.log(`The server is listening on port ${port}`);
});