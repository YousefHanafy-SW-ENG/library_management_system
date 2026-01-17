import express from "express";
import bookRouter from "./book/routers/index.js";
import borrowerRouter from "./borrower/routers/index.js";

const router = express.Router();

router.use("/books", bookRouter);
router.use("/borrowers", borrowerRouter);

export default router;
