//combine controllers

import { Router } from 'express';
import { makeInvoker } from 'awilix-express';

import { UserController } from '../controllers/userController.js';
import { ServiceController } from '../controllers/serviceController.js';
import { AppointmentController } from '../controllers/appointmentController.js';

import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

// Create invokers
const userAPI = makeInvoker(UserController);
const serviceAPI = makeInvoker(ServiceController);
const appointmentAPI = makeInvoker(AppointmentController);

// User routes
router.post('/users/register', userAPI('register'));
router.post('/users/login', userAPI('login'));

// Service routes
router.get('/services', serviceAPI('list'));
router.post('/services', authMiddleware, requireAdmin, serviceAPI('create'));

// Appointment routes
router.post('/appointments', authMiddleware, appointmentAPI('book'));
router.get('/appointments', authMiddleware, appointmentAPI('list'));
router.put('/appointments/:id/status', authMiddleware, requireAdmin, appointmentAPI('changeStatus'));

export default router;
