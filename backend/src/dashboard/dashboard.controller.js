import TransactionModel from "../transaction/transaction.model";

export const getReport=async (req,res)=>{
    try{

const {id} =req.user;

const transaction = await TransactionModel.find({
    userId:id,
}).lean();



        res.status(200).json({
            message:"Dashboard report",
        });

    }catch(error){
        res.status(500).json({
            message:err.message||"Internal server error",
        });

    }
};