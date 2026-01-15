import { StatusCodes } from "http-status-codes";

export const ErrorHandler = () => (error,res) =>{
    const { status, message, errorCode} = error;

    return res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: message || 'Unexpected Error',
        errorCode,
        data:null
    });
};