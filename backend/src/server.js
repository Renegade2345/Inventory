require(dotenv).config

const mongoose = required("mongoose");

const { connect } = require("mongoose");
const app = require("../app");

const PORT = process.env.PORT || 5000;


const connectDB =   async () =>{
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log("DB connected");

    }catch(eror){
        console.error("DB connection failed", error.message)
        process.exit(1);

    }
};  

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

