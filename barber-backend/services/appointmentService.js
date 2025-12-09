export class AppointmentService {
  // Added serviceRepository to constructor injection
  constructor({ appointmentRepository, serviceRepository }) {
    this.appointmentRepo = appointmentRepository;
    this.serviceRepo = serviceRepository; // Save it to use in bookAppointment
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

    // Overlap Validation Logic
    
    // 1. Get the service details for the NEW appointment to find its duration
    const service = await this.serviceRepo.getById(data.serviceId);
    if (!service) throw new Error('Service not found');

    // 2. Calculate New Appointment Start & End times
    const newStart = new Date(data.startAt);
    const newEnd = new Date(newStart.getTime() + service.durationMin * 60000); // Add minutes in ms

    // 3. Get all active appointments (not cancelled)
    const existingAppts = await this.appointmentRepo.findActiveAppointments();

    // 4. Check for overlaps
    for (const appt of existingAppts) {
      // Calculate Existing Appointment Start & End
      const existingStart = new Date(appt.startAt);
      const existingEnd = new Date(existingStart.getTime() + appt.service.durationMin * 60000);

      // 5. The Overlap Formula:
      // (StartA < EndB) AND (EndA > StartB)
      if (newStart < existingEnd && newEnd > existingStart) {
        throw new Error('This time slot is already booked. Please choose another time.');
      }
    }
    // 

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
