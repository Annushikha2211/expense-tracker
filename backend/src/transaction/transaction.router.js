import {Router} from "express";
import { createTransaction, deleteTransaction, getTransaction, updateTransaction } from "./transaction.controller.js";
 import { AdminUserGuard } from "../middleware/guard.middleware.js";
const TransactionRouter = Router();

TransactionRouter.post("/create",AdminUserGuard,createTransaction);
TransactionRouter.put("/update/:id",updateTransaction);
TransactionRouter.delete("/delete/:id",deleteTransaction);
TransactionRouter.get("/get",getTransaction);

export default TransactionRouter;