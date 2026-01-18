import { email } from "zod";
import { prisma } from "../../../config/db/index.js";

class BorrowingModel {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async findManyPublic() {
    return this.prisma.borrower.findMany({
      orderBy: { name: "asc" },
    });
  }  

async checkout(payload, db = this.prisma) {
  return db.borrowing.create({
    data: payload,
  });
}

async return({ borrowerId, bookId }, db = this.prisma) {
  const active = await db.borrowing.findFirst({
    where: { borrowerId, bookId, returnedAt: null },
    select: { id: true },
  });

  if (!active) return null;

  return db.borrowing.update({
    where: { id: active.id },
    data: { returnedAt: new Date() },
  });
}

async currentBorrowedBooks(borrowerId){
  return this.prisma.borrowing.findMany({
    where:{
      borrowerId,
      returnedAt:null
    },
    select:{
      id:true,
      checkedOutAt: true,
      dueDate: true,
      book:{
       select:{
        id: true,
        title: true,
        author: true,
        isbn: true,
        shelfLocation: true
       }
      }
    },
    orderBy: {checkedOutAt: "desc"},
  });
}

async overdueBorrowings() {
  return this.prisma.borrowing.findMany({
    where:{
      returnedAt: null,
      dueDate: { lt: new Date() },
    },
    select:{
      id:true,
      checkedOutAt:true,
      dueDate: true,
      borrower:{
        select:{
          id: true,
          name:true,
          email:true,
        }
      },
      book:{
        select:{
          id: true,
          title: true,
          author: true,
          isbn: true
        }
      },
    },
    orderBy: {dueDate: "asc" },
  });
}

async hasActiveBorrowing(borrowerId,bookId,db=this.prisma){
  const existing = await db.borrowing.findFirst({
    where:{
      borrowerId,
      bookId,
      returnedAt: null,
    }
  });
  return !!existing;
}

}

export default new BorrowingModel(prisma);
