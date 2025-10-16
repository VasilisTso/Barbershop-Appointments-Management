import express from 'express';
import { createService, getAllServices } from '../controllers/serviceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

// Public: anyone can view services
router.get('/', getAllServices);

// Protected: only admin can create a service
router.post('/', authMiddleware, requireAdmin, createService);

export default router;
