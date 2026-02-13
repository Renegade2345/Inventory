const express = require("express");
const cors = require("cors");
const ApiError = require("./utils/ApiError");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
    origin : "http://localhost:4200",
    credentials : true

}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// for monitoring tools and health checks
app.get("/api/health", (req, res)=>{
    res.status(200).json({
        status: "success",
        message:"API is running"
    });

});

app.use("/api/auth", authRoutes);

// Global error handling to avoid try catch nuisance 
// Added api error handling properly so instead of generic "internal server error, we get exact information"
app.use((err, req, res, next) =>{
    if(!(err instanceof ApiError)) {
        console.log(err);
        err = new ApiError(500, "Something went wrong");


    }
    

    res.status(err.statusCode).json({
        status : "error",
        message : err.message

    });


});

module.exports = app