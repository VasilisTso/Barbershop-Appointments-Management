export class ServiceService {
  constructor({ serviceRepository }) {
    this.serviceRepo = serviceRepository;
  }

  async listServices() {
    return this.serviceRepo.getAll();
  }

  async getServiceById(id) {
    const service = await this.serviceRepo.getById(id);
    if (!service) throw new Error('Service not found');
    return service;
  }

  async createService(data) {
    if (!data.name || !data.durationMin || !data.priceCents) {
      throw new Error('Missing required fields');
    }
    return this.serviceRepo.create(data);
  }

  async updateService(id, data) {
    const existing = await this.serviceRepo.getById(id);
    if (!existing) throw new Error('Service not found');
    return this.serviceRepo.update(id, data);
  }

  async deleteService(id) {
    const existing = await this.serviceRepo.getById(id);
    if (!existing) throw new Error('Service not found');
    return this.serviceRepo.delete(id);
  }
}
