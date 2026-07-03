import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendMail} from "../utils/mail.js";
import {otpTemplate} from "../utils/otp.template.js";
import {generateOTP} from "../utils/generate.otp.js";
import {forgotPasswordTemplate} from "../utils/forgot.template.js";

export const createUser =async(req,res)=>{
    try{
const data=req.body;
console.log(data);
const user=new UserModel(data);
await user.save();
res.json(user);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


export const sendEmail =async(req,res)=>{
    try{  
const {email}=req.body;
const OTP=generateOTP();
const isEmail=await UserModel.findOne({email});
if(isEmail)
    return res.status(400).json({message:"Already rsgistersd !"});


        await sendMail(email,"OTP For Signup",otpTemplate(OTP))

        res.json(
            {message:"Email sent successfully",
            otp : OTP,
            success:true
            }
        );
    }catch(err){
        console.log("controller err",err);
        res.status(500).json({message:"err.message"});
    }
}




const createToken=async(user)=>{
    const payload ={
        id:user._id,
        fullname:user.fullname,
        email:user.email,
        role:user.role
    }

    const token= await jwt.sign(payload,process.env.AUTH_SECRET,{expiresIn:"7d"});
    return token;
}
export const login=async(req,res)=>{
    try{
const {email,password}=req.body;
const user=await UserModel.findOne({email});
if(!user)
    return res.status(404).json({message:"user not define"});
 const isLoged= await bcrypt.compare(password,user.password);
 if(!isLoged)
    return  res.status(404).json({message:"incorrect password"});

 const token=await createToken(user);
 res.cookie("authToken",token,{
    httpOnly:true,
    secure: process.env.ENVIROMENT!== "DEV",
    sameSite:process.env.ENVIROMENT=== "DEV"?"lax":"none",
    path:"/",
    domain:undefined,
    maxAge:86400000,
    
 });
 
 res.json({message:"login successfull",role:user.role});

console.log(user)
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export const forgotPassword=async(req,res)=>{
    try{
const {email}=req.body;
const user=await UserModel.findOne({email})
if(!user)
    return res.status(404).json({message:'User doesn`t exists'});
const token =await jwt.sign({id:user._id},process.env.FORGOT_TOKEN_SECRET,{expiresIn:"15m"});
const link=`${process.env.DOMAIN}/forgot-password?token=${token}`;
const sent=await sendMail(
    email,
    "Expense - forgot Password ?",
    forgotPasswordTemplate(user.fullname,link)
);

if(!sent)
    return res.status(404).json({message:' Email sending failed!'});

res.json({message:"Please check your email to forgot password"});


console.log(token);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}



export const verifyToken=async(req,res)=>{
    try{

res.json({message:"Veerification Success"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export const changePassword=async(req,res)=>{
    try{
const {password}=req.body;
const encrypted = await bcrypt.hash(password.toString(),12);
await UserModel.findByIdAndUpdate(req.user.id,{password:encrypted});
res.json({message:"Password updated"});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}