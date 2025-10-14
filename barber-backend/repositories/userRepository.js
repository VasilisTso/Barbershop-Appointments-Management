//db access

export class UserRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async createUser(data) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // add more repository methods if needed
}
