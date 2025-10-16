/* BEFORE DI

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
*/

// after DI
export const ServiceController = ({ serviceService }) => {
  return {
    list: async (req, res) => {
      try {
        const data = await serviceService.listServices();
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },

    getOne: async (req, res) => {
      try {
        const data = await serviceService.getServiceById(Number(req.params.id));
        res.json(data);
      } catch (err) {
        res.status(404).json({ error: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const data = await serviceService.createService(req.body);
        res.status(201).json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const data = await serviceService.updateService(Number(req.params.id), req.body);
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },

    remove: async (req, res) => {
      try {
        await serviceService.deleteService(Number(req.params.id));
        res.status(204).send();
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
  };
};
