import { StatusCodes } from "http-status-codes";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || StatusCodes.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Unexpected Error",
    errorCode: err.errorCode || err.code,
    data: null,
  });
};
