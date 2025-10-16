import { body, validationResult } from 'express-validator';

export const validateAppointmentCreate = [
  body('serviceId')
    .isInt()
    .withMessage('Service ID must be valid')
    .notEmpty(),
  body('startAt')
    .isISO8601()
    .withMessage('Start time must be valid')
    .notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateAppointmentUpdate = [
  body('serviceId')
    .optional()
    .isInt()
    .withMessage('Service ID must be valid'),
  body('startAt')
    .optional()
    .isISO8601()
    .withMessage('Start time must be valid'),
  body('status')
    .optional()
    .isString()
    .isIn(['PENDING', 'CONFIRMED', 'CANCELLED'])
    .withMessage('Invalid status value'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
