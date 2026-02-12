require("dotenv").config()

const mongoose = require("mongoose");

const { connect } = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;


const connectDB =   async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");

    }catch(error){
        console.error("DB connection failed", error.message)
        process.exit(1);

    }
};  

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
});

