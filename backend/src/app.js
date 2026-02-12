const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin : "http://localhost:4200",
    credentials : "true"

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

// Global error handling to avoid try catch nuisance 
app.use((err, req, res, next) =>{
    console.log(err.stack);

    res.status(err.statusCode || 500).json({
        status : "error",
        message : err.message || "Internal server error"

    });


});

