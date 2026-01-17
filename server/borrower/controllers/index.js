import * as borroweService from "../services/borrower_service.js";
import logger from '../../../common/utils/logger/index.js';
import { StatusCodes } from 'http-status-codes';
const { OK } = StatusCodes;
   
export const listBorrowers = async (req, res, next) => {
    try{
        const borrowers = await borroweService.getAllBorrowers();
        return res.status(OK).json({
            success:true,
            data:borrowers,
        });
    }catch(error){
        logger.error(error);
        next(error);
    }
};

export const registerBorrower = async (req,res,next) => {
   try{
    const borrower = await borroweService.registerBorrower(req.body);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        data:borrower,
    })
   }catch(error){
    logger.error(error);
    next(error);
   }
};

export const deleteBorrower = async (req,res,next) => {
   try{
    await borroweService.deleteBorrower(req.params.id);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:"Deleted Successfully",
    })
   }catch(error){
    logger.error(error);
    next(error);
   }
};

export const updateBorrower = async (req,res,next) => {
   try{
    await borroweService.updateBorrower(req.body);
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:"Updated Successfully",
    })
   }catch(error){
    logger.error(error);
    next(error);
   }
};

