
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
import { validateAppointmentCreate, validateAppointmentUpdate } from '../validators/appointmentValidator.js';

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
// for finishing CRUD getOne
router.get('/services/:id', serviceAPI('getOne'));
router.post('/services', authMiddleware, requireAdmin, validateService, serviceAPI('create'));
// for finishing CRUD
router.put('/services/:id', authMiddleware, requireAdmin, validateService, serviceAPI('update'));
router.delete('/services/:id', authMiddleware, requireAdmin, serviceAPI('remove'));

// Appointment routes
router.get('/appointments', authMiddleware, appointmentAPI('list'));
// for finishing CRUD getOne
router.get('/appointments/:id', authMiddleware, appointmentAPI('getOne'));
router.post('/appointments', authMiddleware, validateAppointmentCreate, appointmentAPI('book'));
// for finishing CRUD update, remove
router.put('/appointments/:id', authMiddleware, validateAppointmentUpdate, appointmentAPI('update'));
router.delete('/appointments/:id', authMiddleware, appointmentAPI('remove'));
router.put('/appointments/:id/status', authMiddleware, requireAdmin, appointmentAPI('changeStatus'));

export default router;
