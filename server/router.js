import express from "express";
import bookRouter from "./book/routers/index.js";

const router = express.Router();

router.use("/books", bookRouter);

export default router;
