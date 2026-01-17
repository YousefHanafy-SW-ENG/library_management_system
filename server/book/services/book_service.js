import bookModel from "../models/index.js";
import {ErrorResponse,NotFoundErrorResponse} from "../../../common/utils/errorResponse/index.js";


export const getAllBooks = async () => {
  return bookModel.findManyPublic();
};

export const createBook = async (payload) => {
  const existing = await bookModel.findByIsbn(payload.isbn);
  if (existing) {
    throw new ErrorResponse(
      "A book with this ISBN already exists.",
      409,
      "DUPLICATE_ISBN",
      null,
      null
    );
  }
    return await bookModel.create(payload);
};

export const deleteBook = async(id)=>{
  const existing = await bookModel.findById(id);
  if (!existing) {
    throw new NotFoundErrorResponse(
      "Book Not Found",
    );
  }
  return bookModel.delete(id);
}

export const updateBook = async(payload)=>{
  const existing = await bookModel.findById(payload.id);
  if (!existing) {
    throw new NotFoundErrorResponse(
      "Book Not Found",
    );
  }
  return bookModel.update(payload);
}

export const searchBook = async(payload)=>{
  return bookModel.search(payload);
}
