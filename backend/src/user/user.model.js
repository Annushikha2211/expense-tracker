import {model,Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema= new Schema ({
fullname:{
    type:String,
    required:true,
    lowercase:true,
    trim:true
},

mobile:{
    type:String,
    required:true,
    trim:true
},
email:{
    type:String,
    required:true,
    trim:true,
    unique:true
},

password:{
    type:String,
    required:true,
    trim:true
},

status:{
    type:Boolean,
    default:false
},

role:{
    type:String,
    default:"user",
    enum:['user']
},


otp: {
    type: String
},
otpExpiry: {
    type: Date
},

},{timestamps:true});

userSchema.pre('save', async function(){
    const hashedPass =await bcrypt.hash(this.password.toString(),12);
    this.password = hashedPass;
    // next();
})

const UserModel=model('User',userSchema);
export default UserModel