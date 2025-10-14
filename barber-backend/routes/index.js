//combine controllers

import { Router } from 'express';
import userController from '../controllers/userController.js';
import serviceController from '../controllers/serviceController.js';
import appointmentController from '../controllers/appointmentController.js';

const router = Router();

router.use('/users', userController);
router.use('/services', serviceController);
router.use('/appointments', appointmentController);

// TODO: create /services and /appointments routes

export default router;
