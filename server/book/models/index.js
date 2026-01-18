import { prisma } from "../../../config/db/index.js";

class BookModel {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async findManyPublic() {
    return this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        availableQuantity: true,
        shelfLocation: true,
      },
      orderBy: { title: "asc" },
    });
  }

async findByIsbn(isbn) {
  return this.prisma.book.findUnique({
    where: { isbn },
    select: { id: true },
  });
}

async findById(id) {
  return this.prisma.book.findUnique({
    where: { id },
  });
}

async availableQuantity(id){
  return this.prisma.book.findUnique({
    where: {id},
    select:{
      availableQuantity: true
    },
  }).availableQuantity;
}

async decrementBookQuantity(id, db = this.prisma) {
   return db.book.update({
    where: { id },
    data: { availableQuantity: { decrement: 1 } },
  });
}

async incrementBookQuantity(id, db = this.prisma) {
   return db.book.update({
    where: { id },
    data: { availableQuantity: { increment: 1 } },
  });
}

async create(payload){
  return this.prisma.book.create({
    data:payload,
    select:{
         id: true,
        title: true,
        author: true,
        isbn: true,
        availableQuantity: true,
        shelfLocation: true,
    },
  });
}

async update(payload){
  return this.prisma.book.update({
    data:payload,
    where:{id :payload.id},
    select:{
        id: true,
        title: true,
        author: true,
        isbn: true,
        availableQuantity: true,
        shelfLocation: true,
    }
  });
}

async delete(id){
  return this.prisma.book.delete({
    where: {id},
  });
}

async search(payload){
  return this.prisma.book.findMany({
    where:{OR:[
      {
        title:payload.title
      },
      {
        author:payload.author
      },
      {
        isbn:payload.isbn
      }
    ]}
  });
}

}

export default new BookModel(prisma);
