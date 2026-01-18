  import { prisma } from "../../../config/db/index.js";
  import { NotFoundErrorResponse } from "../../../common/utils/errorResponse/index.js";
  import borrowerModel from "../../borrower/models/index.js";
  import bookModel from "../../book/models/index.js";
  import borrowingModel from "../models/index.js";

  export const checkoutBook = async (payload) => {
  const borrowerExisting = await borrowerModel.findById(payload.borrowerId);
  if (!borrowerExisting) throw new NotFoundErrorResponse("Borrower Not Found");

  const existingBook = await bookModel.findById(payload.bookId);
  if (!existingBook) throw new NotFoundErrorResponse("Book Not Found");

  return prisma.$transaction(async (tx) => {
    const alreadyBorrowed = await borrowingModel.hasActiveBorrowing(
      payload.borrowerId,
      payload.bookId,
      tx
    );
    if (alreadyBorrowed) {
      throw new NotFoundErrorResponse("This borrower already borrowed this book");
    }
    const ok = await bookModel.decrementBookQuantity(payload.bookId, tx);
    if (!ok) throw new NotFoundErrorResponse("This book is not available");

    return borrowingModel.checkout(payload, tx);
  });
};


export const returnBook = async (payload) => {
  const borrowerExisting = await borrowerModel.findById(payload.borrowerId);
  if (!borrowerExisting) throw new NotFoundErrorResponse("Borrower Not Found");
  const existingBook = await bookModel.findById(payload.bookId);
  if (!existingBook) throw new NotFoundErrorResponse("Book Not Found");
  return prisma.$transaction(async (tx) => {
    const returned = await borrowingModel.return(
      { borrowerId: payload.borrowerId, bookId: payload.bookId },
      tx
    );
    if (!returned) throw new NotFoundErrorResponse("This borrower has not borrowed this book");
    await bookModel.incrementBookQuantity(payload.bookId, tx);
    return returned;
  });
};

export const getBorrowerCurrentBooks = async (borrowerId) => {
  const borrowerExisting = await borrowerModel.findById(borrowerId);
  if (!borrowerExisting) throw new NotFoundErrorResponse("Borrower Not Found");
  return borrowingModel.currentBorrowedBooks(borrowerId);
};

export const getOverudeBooks = async () => {
  return borrowingModel.overdueBorrowings();
};


