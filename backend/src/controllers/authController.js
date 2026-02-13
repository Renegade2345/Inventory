const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const generateToken = (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{
        expiresIn:"1d",}    
);
};

exports.login = asyncHandler(async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "email and password are required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(401, "credentials are invalid");
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        throw new ApiError(401, "credentials are invalid")
    }

    const token = generateToken(user._id);

    
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.verifyToken = asyncHandler(async(req, res)=>{
      res.status(200).json({
    status: "success",
    message: "Token is valid",
  });
})

     
