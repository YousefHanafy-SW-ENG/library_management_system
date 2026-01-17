import { prisma } from "../../../config/db/index.js";

class BorrowerModel {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async findManyPublic() {
    return this.prisma.borrower.findMany({
      orderBy: { name: "asc" },
    });
  }  

async findByEmail(email) {
  return this.prisma.borrower.findUnique({
    where: { email },
  });
}

async findById(id) {
  return this.prisma.borrower.findUnique({
    where: { id },
  });
}
  

async create(payload){
  return this.prisma.borrower.create({
    data:payload,
  });
}

async update(payload){
  return this.prisma.borrower.update({
    data:payload,
    where:{id :payload.id},
  });
}

async delete(id){
  return this.prisma.borrower.delete({
    where: {id},
  });
}

}

export default new BorrowerModel(prisma);
