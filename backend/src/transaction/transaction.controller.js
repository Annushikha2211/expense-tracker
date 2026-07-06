import TransactionModel from "./transaction.model.js";

export const createTransaction = async (req,res)=>{
    try{
        const data=req.body;
        const {id} = req.user;
        data.userId=id;
        const transactin= await new TransactionModel(data).save();
        res.json(transaction)
        res.json({
            message:" Transaction Created "
        })

    }catch(err){
        res.status(500).json({
            message:err.message|| "Internal server error.",
        })

    }
}

export const updateTransaction = async (req,res)=>{
    try{
        res.json({
            message:"Update Requested"
        })

    }catch(err){
        res.status(500).json({
            message:err.message|| "Internal server error.",
        })

    }
}

export const deleteTransaction = async (req,res)=>{
    try{
        res.json({
            message:"Delete Requested"
        })

    }catch(err){
        res.status(500).json({
            message:err.message|| "Internal server error.",
        })

    }
}

export const getTransaction = async (req,res)=>{
    try{
        res.json({
            message:"Get Requested"
        })

    }catch(err){
        res.status(500).json({
            message:err.message|| "Internal server error.",
        })

    }
}