
import {model,Schema} from "mongoose";
// import bcrypt from "bcrypt";

const TransactionSchema= new Schema ({

transactionType:{
    type:String,
    trim:true,
    lowercase:true,
    required:true
},

userId:{
    type:Schema.Types.ObjectId,
    refer :"user",
    required:true
},

title:{
    type:String,
    trim:true,
    lowercase:true,
    required:true
},
amount:{
    type:Number,
    required:true
},

category: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
},


paymentMethod:{
    type:String,
    trim:true,
    lowercase:true,
    required:true
},

category: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
},

// date: {
//     type: Date,
//     default: Date.now
// },

notes:{
    type:String,
    trim:true,
    lowercase:true,
    
},

date: {
    type: Date,
    default: Date.now
},


},{timestamps:true});

const TransactionModel = model("Transaction",TransactionSchema)

export default TransactionModel;