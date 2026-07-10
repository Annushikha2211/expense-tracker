import express from "express";

import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
    origin: [
        // "https://expense-tracker-annushikha.vercel.app",
        // "https://expense-tracker-5brkye3bn-annushikha.vercel.app"

         "https://expense-tracker-annushikha.vercel.app",
        "https://expense-tracker-5brkye3bn-annushikha.vercel.app",
        "https://expense-tracker-mu-lemon-61.vercel.app"
    ],
    credentials: true
}));



// database connection
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("database connected!"))
.catch((err)=>console.log("database not connected!", err));

// import cors from 'cors';
// app.use(cors({
//     origin:process.env.DOMAIN,
//     credentials:true
// }))

import cookieParser from 'cookie-parser';
app.use(cookieParser());

// app level middleware
import morgan from "morgan";
app.use(morgan('dev'));

// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running!");
});

// route level middleware
import userRouter from "./user/user.routes.js";
import TransactionRouter from "./transaction/transaction.router.js";
import DashboardRouter from "./dashboard/dashboard.route.js";

app.use("/api/user",userRouter);
app.use("/api/transaction",TransactionRouter);
app.use("/api/dashboard",DashboardRouter);

//   app.listen(3000,()=>console.log("Server is running on port 3000"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

