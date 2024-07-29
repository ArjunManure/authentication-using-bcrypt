const { default: mongoose, Collection } = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login");

// checking if our database is connected

connect.then(()=>{
    console.log("Database connected");
})
.catch(()=>{
    console.log("Cannot connect to database")
})


//creating a schema

const loginSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true    
    }
});

// collection part

const collection = new mongoose.model("users",loginSchema);

module.exports = collection;