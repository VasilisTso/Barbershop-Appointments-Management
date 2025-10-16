export class ServiceRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async getAll() {
    return this.prisma.service.findMany();
  }

  async getById(id) {
    return this.prisma.service.findUnique({ where: { id } });
  }

  async create(data) {
    return this.prisma.service.create({ data });
  }

  async update(id, data) {
    return this.prisma.service.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return this.prisma.service.delete({ where: { id } });
  }
}
