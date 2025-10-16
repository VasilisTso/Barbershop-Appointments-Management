export class AppointmentService {
  constructor({ appointmentRepository }) {
    this.appointmentRepo = appointmentRepository;
  }

  async listAppointments(user) {
    if (user.role === 'ADMIN') {
      return this.appointmentRepo.getAll();
    } else {
      return this.appointmentRepo.getAllByUser(user.id);
    }
  }

  async getAppointment(id, user) {
    const appt = await this.appointmentRepo.getById(id);
    if (!appt) throw new Error('Appointment not found');
    if (user.role !== 'ADMIN' && appt.userId !== user.id) {
      throw new Error('Forbidden');
    }
    return appt;
  }

  async bookAppointment(data) {
    if (!data.serviceId || !data.startAt || !data.userId) {
      throw new Error('Missing required fields');
    }
    return this.appointmentRepo.create(data);
  }

  /* before finishing CRUD
  async bookAppointment({ userId, serviceId, startAt, notes }) {
    if (!serviceId || !startAt) throw new Error('Missing data');
    return this.appointmentRepo.create({
      userId,
      serviceId,
      startAt: new Date(startAt),
      notes,
    });
  }*/

  async updateAppointment(id, data, user) {
    const appt = await this.appointmentRepo.getById(id);
    if (!appt) throw new Error('Appointment not found');

    // users can only edit their own
    if (user.role !== 'ADMIN' && appt.userId !== user.id) {
      throw new Error('Forbidden');
    }

    return this.appointmentRepo.update(id, data);
  }

  async deleteAppointment(id, user) {
    const appt = await this.appointmentRepo.getById(id);
    if (!appt) throw new Error('Appointment not found');

    if (user.role !== 'ADMIN' && appt.userId !== user.id) {
      throw new Error('Forbidden');
    }

    return this.appointmentRepo.delete(id);
  }

  async changeStatus(id, status) {
    return this.appointmentRepo.update(id, { status });
  }
}
