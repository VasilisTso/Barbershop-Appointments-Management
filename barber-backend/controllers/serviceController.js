import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const svcService = req.container.resolve('serviceService');
    const data = await svcService.listServices();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const svcService = req.container.resolve('serviceService');
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const data = await svcService.createService(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
