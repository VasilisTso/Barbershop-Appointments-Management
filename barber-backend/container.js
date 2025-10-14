//awilix setup

import { createContainer, asClass, asValue } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { UserRepository } from './repositories/userRepository.js';
import { UserService } from './services/userService.js';
import { prisma } from './prismaClient.js';
import { ServiceRepository } from './repositories/serviceRepository.js';
import { ServiceService } from './services/serviceService.js';
import { AppointmentRepository } from './repositories/appointmentRepository.js';
import { AppointmentService } from './services/appointmentService.js';

export const container = createContainer();

container.register({
  prisma: asValue(prisma),
  userRepository: asClass(UserRepository).scoped(),
  userService: asClass(UserService).scoped(),
  serviceRepository: asClass(ServiceRepository).scoped(),
  serviceService: asClass(ServiceService).scoped(),
  appointmentRepository: asClass(AppointmentRepository).scoped(),
  appointmentService: asClass(AppointmentService).scoped(),
});

// in app, use scopePerRequest(container) to attach scoped containers per req
export default container;
