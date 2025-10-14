export class ServiceService {
  constructor({ serviceRepository }) {
    this.serviceRepo = serviceRepository;
  }

  async listServices() {
    return this.serviceRepo.getAll();
  }

  async getService(id) {
    const svc = await this.serviceRepo.getById(id);
    if (!svc) throw new Error('Service not found');
    return svc;
  }

  async createService(data) {
    if (!data.name || !data.durationMin || !data.priceCents)
      throw new Error('Missing required fields');
    return this.serviceRepo.create(data);
  }

  async updateService(id, data) {
    return this.serviceRepo.update(id, data);
  }

  async deleteService(id) {
    return this.serviceRepo.delete(id);
  }
}
