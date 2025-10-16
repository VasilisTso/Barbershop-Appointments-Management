
import { Router } from 'express';
// DI
import { makeInvoker } from 'awilix-express';

// controllers
import { UserController } from '../controllers/userController.js';
import { ServiceController } from '../controllers/serviceController.js';
import { AppointmentController } from '../controllers/appointmentController.js';

// middleware
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

// validators
import { validateRegister, validateLogin } from '../validators/userValidator.js';
import { validateService } from '../validators/serviceValidator.js';
import { validateAppointment } from '../validators/appointmentValidator.js';


const router = Router();

// Create invokers
const userAPI = makeInvoker(UserController);
const serviceAPI = makeInvoker(ServiceController);
const appointmentAPI = makeInvoker(AppointmentController);

// User routes
router.post('/users/register', validateRegister, userAPI('register'));
router.post('/users/login', validateLogin, userAPI('login'));

// Service routes
router.get('/services', serviceAPI('list'));
router.post('/services', authMiddleware, requireAdmin, validateService, serviceAPI('create'));

// Appointment routes
router.post('/appointments', authMiddleware, validateAppointment, appointmentAPI('book'));
router.get('/appointments', authMiddleware, appointmentAPI('list'));
router.put('/appointments/:id/status', authMiddleware, requireAdmin, appointmentAPI('changeStatus'));

export default router;
