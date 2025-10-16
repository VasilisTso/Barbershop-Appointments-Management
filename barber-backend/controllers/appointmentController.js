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
    book: async (req, res) => {
      try {
        const payload = { ...req.body, userId: req.user.id };
        const result = await appointmentService.bookAppointment(payload);
        res.status(201).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },

    list: async (req, res) => {
      try {
        const result = await appointmentService.listAppointments(req.user);
        res.json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },

    changeStatus: async (req, res) => {
      try {
        const data = await appointmentService.changeStatus(
          Number(req.params.id),
          req.body.status
        );
        res.json(data);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }
  };
};
