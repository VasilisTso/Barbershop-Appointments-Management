export class AppointmentService {
  constructor({ appointmentRepository }) {
    this.appointmentRepo = appointmentRepository;
  }

  async bookAppointment({ userId, serviceId, startAt, notes }) {
    if (!serviceId || !startAt) throw new Error('Missing data');
    return this.appointmentRepo.create({
      userId,
      serviceId,
      startAt: new Date(startAt),
      notes,
    });
  }

  async listAppointments(user) {
    if (user.role === 'ADMIN') {
      return this.appointmentRepo.getAll();
    } else {
      return this.appointmentRepo.getAllByUser(user.id);
    }
  }

  async changeStatus(id, status) {
    return this.appointmentRepo.updateStatus(id, status);
  }
}
