import express from "express";
import bookRouter from "./book/routers/index.js";
import borrowerRouter from "./borrower/routers/index.js";
import borrowingRouter from "./borrowing/routers/index.js";


const router = express.Router();

router.use("/books", bookRouter);
router.use("/borrowers", borrowerRouter);
router.use("/borrowing", borrowingRouter);


export default router;
