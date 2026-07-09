import TransactionModel from "../transaction/transaction.model.js";

export const getReport=async (req,res)=>{
    try{

const {id,role} =req.user;


let transactions=[];
if(role=="admin"){
 transactions = await TransactionModel.find({
    
}).lean();


}else{
     transactions = await TransactionModel.find({
    userId:id,
}).lean();

}

let totalCredit=0;
let totalDebit=0;


transactions.forEach((txn)=>{
   if(txn.transactionType==="cr")
        { totalCredit+=txn.amount
}  else if(txn.transactionType==="dr"){
         totalDebit+=txn.amount
        }
});

const totalTransaction = transactions.length;
const balance= totalCredit-totalDebit;


const estimate= (value) => Math.floor(value+value*0.15);


// const categoryMap = {};

const dailyMap={
};

transactions.forEach((txn)=>{

    
    const date=new Date(txn.createdAt).toISOString().slice(0,10);
    dailyMap[date]=(dailyMap[date] || 0)+txn.amount 

//     if (txn.transactionType === "dr") {
//     categoryMap[txn.category] =
//         (categoryMap[txn.category] || 0) + txn.amount;
// }
});


const last30Days=[];
for(let i=29;i>=0;i--){
    const d=new Date();
    d.setDate(d.getDate()-i)
    const dateSTR=d.toISOString().slice(0,10);
    last30Days.push({
        date:dateSTR,
        total:dailyMap[dateSTR]||0,
    })
}

        res.status(200).json({
            summary:{
                totalTransaction,
                totalCredit,
                totalDebit,
                balance,

                totalTransactionEstimate:estimate(totalTransaction),
                totalCreditEstimate:estimate(totalCredit),
                totalDebitEstimate:estimate(totalDebit),
                balanceEstimate:estimate(balance),
                
            },
            chart:last30Days,
// categoryChart
        });

    }catch(error){
        res.status(500).json({
            message:error.message||"Internal server error",
        });

    }
};