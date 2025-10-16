import { body, validationResult } from 'express-validator';

export const validateAppointment = [
  body('serviceId').isInt({ min: 1 }).withMessage('Service ID must be valid'),
  body('startAt').isISO8601().withMessage('startAt must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
