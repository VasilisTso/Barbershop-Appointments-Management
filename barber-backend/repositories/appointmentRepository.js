export class AppointmentRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async create(data) {
    return this.prisma.appointment.create({ data });
  }

  async getAllByUser(userId) {
    return this.prisma.appointment.findMany({
      where: { userId },
      include: { service: true },
    });
  }

  async getAll() {
    return this.prisma.appointment.findMany({
      include: { service: true, user: true },
    });
  }

  async updateStatus(id, status) {
    return this.prisma.appointment.update({
      where: { id: Number(id) },
      data: { status },
    });
  }
}
