//awilix setup, DI(Dependency Injection)

import { createContainer, asClass, asValue } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { prisma } from './prismaClient.js';

// repos
import { UserRepository } from './repositories/userRepository.js';
import { ServiceRepository } from './repositories/serviceRepository.js';
import { AppointmentRepository } from './repositories/appointmentRepository.js';

// services
import { UserService } from './services/userService.js';
import { ServiceService } from './services/serviceService.js';
import { AppointmentService } from './services/appointmentService.js';

const container = createContainer();

container.register({
  // low-level / values
  prisma: asValue(prisma),

  // repos
  userRepository: asClass(UserRepository).scoped(),
  appointmentRepository: asClass(AppointmentRepository).scoped(),
  serviceRepository: asClass(ServiceRepository).scoped(),

  //service
  serviceService: asClass(ServiceService).scoped(),
  userService: asClass(UserService).scoped(),
  appointmentService: asClass(AppointmentService).scoped(),
});

// in app, use scopePerRequest(container) to attach scoped containers per req
export { container, scopePerRequest };
