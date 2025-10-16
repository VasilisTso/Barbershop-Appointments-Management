/* BEFORE DI
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// User books appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const appointmentService = req.container.resolve('appointmentService');
    const result = await appointmentService.bookAppointment({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get appointments (user = own, admin = all)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointmentService = req.container.resolve('appointmentService');
    const result = await appointmentService.listAppointments(req.user);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin changes status
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN')
      return res.status(403).json({ error: 'Forbidden' });
    const appointmentService = req.container.resolve('appointmentService');
    const result = await appointmentService.changeStatus(
      req.params.id,
      req.body.status
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
*/

// after DI
export const AppointmentController = ({ appointmentService }) => {
  return {
    list: async (req, res) => {
      try {
        const data = await appointmentService.listAppointments(req.user);
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },

    getOne: async (req, res) => {
      try {
        const data = await appointmentService.getAppointment(Number(req.params.id), req.user);
        res.json(data);
      } catch (err) {
        res.status(403).json({ error: err.message });
      }
    },

    book: async (req, res) => {
      try {
        const payload = { ...req.body, userId: req.user.id };
        const data = await appointmentService.bookAppointment(payload);
        res.status(201).json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const data = await appointmentService.updateAppointment(
          Number(req.params.id),
          req.body,
          req.user
        );
        res.json(data);
      } catch (err) {
        res.status(403).json({ error: err.message });
      }
    },

    remove: async (req, res) => {
      try {
        await appointmentService.deleteAppointment(Number(req.params.id), req.user);
        res.status(204).send();
      } catch (err) {
        res.status(403).json({ error: err.message });
      }
    },

    changeStatus: async (req, res) => {
      try {
        const data = await appointmentService.changeStatus(Number(req.params.id), req.body.status);
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
  };
};
