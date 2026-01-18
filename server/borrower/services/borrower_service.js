import borrowerModel from "../models/index.js";
import {ErrorResponse,NotFoundErrorResponse} from "../../../common/utils/errorResponse/index.js";


export const getAllBorrowers = async () => {
  return borrowerModel.findManyPublic();
};

export const registerBorrower = async (payload) => {
  const existing = await borrowerModel.findByEmail(payload.email);
  if (existing) {
    throw new ErrorResponse(
      "A Borrower with this email already exists.",
      409,
      "DUPLICATE_EMAIL",
      null,
      null
    );
  }
  return await borrowerModel.create(payload);
};

export const deleteBorrower = async(id)=>{
  const existing = await borrowerModel.findById(id);
  if (!existing) {
    throw new NotFoundErrorResponse(
      "Borrower Not Found",
    );
  }
  return borrowerModel.delete(id);
}

export const updateBorrower = async(payload)=>{
  const existing = await borrowerModel.findById(payload.id);
  if (!existing) {
    throw new NotFoundErrorResponse(
      "Borrower Not Found",
    );
  }
  if(payload.email){
      const emailExisting = await borrowerModel.findByEmail(payload.email);
      if(emailExisting){
      throw new NotFoundErrorResponse(
      "Email Already Existing",
    );
      }
  }
  return borrowerModel.update(payload);
}
