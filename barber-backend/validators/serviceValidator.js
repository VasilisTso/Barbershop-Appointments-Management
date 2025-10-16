import { body, validationResult } from 'express-validator';

export const validateService = [
  body('name').notEmpty().withMessage('Service name is required'),
  body('durationMin').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('priceCents').isInt({ min: 0 }).withMessage('Price must be a non-negative integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
