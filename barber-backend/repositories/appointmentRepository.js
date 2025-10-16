export class AppointmentRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async create(data) {
    return this.prisma.appointment.create({ data });
  }

  async getAll() {
    return this.prisma.appointment.findMany({
      include: { service: true, user: true },
    });
  }

  async getAllByUser(userId) {
    return this.prisma.appointment.findMany({
      where: { userId },
      include: { service: true },
    });
  }

  async getById(id) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { service: true },
    });
  }

  async update(id, data) {
    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}
