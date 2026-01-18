import * as borrowingService from "../services/borrowing_service.js";
import logger from '../../../common/utils/logger/index.js';
import { StatusCodes } from 'http-status-codes';
const { OK } = StatusCodes;

export const checkoutBook = async (req,res,next) => {
    try{
        await borrowingService.checkoutBook(req.body);
        return res.status(OK).json({
            success: true,
            message: "Book Checkout Successfully",
        })
    }catch(error){
        logger.error(error);
        next(error);
    }
}

export const returnBook = async (req,res,next) => {
    try{
        await borrowingService.returnBook(req.body);
        return res.status(OK).json({
            success: true,
            message: "Book Returned Successfully",
        })
    }catch(error){
        logger.error(error);
        next(error);
    }
}

export const getBorrowedCurrentBooks = async (req,res,next) => {
    try{
        const data = await borrowingService.getBorrowerCurrentBooks(req.params.id);
        return res.status(OK).json({
            success: true,
            data,
        })
    }catch(error){
        logger.error(error);
        next(error);
    }
}

export const getOverdueBooks = async (req,res,next) => {
    try{
        const data = await borrowingService.getOverudeBooks();
        return res.status(OK).json({
            success: true,
            data,
        })
    }catch(error){
        logger.error(error);
        next(error);
    }
}