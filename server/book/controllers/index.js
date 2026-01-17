import * as bookService from "../services/book_service.js";
import logger from '../../../common/utils/logger/index.js';
import { StatusCodes } from 'http-status-codes';
const { OK } = StatusCodes;
   
export const listBooks = async (req, res, next) => {
    try{
        const books = await bookService.getAllBooks();
        return res.status(OK).json({
            success:true,
            data:books,
        });
    }catch(error){
        logger.error(error);
        next(error);
    }
};

export const createBook = async (req,res,next) => {
   try{
    const book = await bookService.createBook(req.body);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        data:book,
    })
   }catch(error){
    logger.error(error);
    next(error);
   }
};

export const deleteBook = async (req,res,next) => {
   try{
    await bookService.deleteBook(req.params.id);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:"Deleted Successfully",
    })
   }catch(error){
    logger.error(error);
    next(error);
   }
};

export const updateBook = async (req,res,next) => {
   try{
    await bookService.updateBook(req.body);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:"Updated Successfully",
    })
   }catch(error){
    logger.error(error);
    next(error);
   }
};

export const searchBooks = async (req,res,next) => {
   try{
    const books = await bookService.searchBook(req.body);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:"Searched Successfully",
        data:books
    })
   }catch(error){
    logger.error(error);
    next(error);
   }
};

