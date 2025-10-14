// routes handlers

import { Router } from 'express';
const router = Router();

// awilix-express can inject services, but i'll keep it simple and get service from req.container
router.post('/register', async (req, res) => {
  try {
    const userService = req.container.resolve('userService');
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userService = req.container.resolve('userService');
    const result = await userService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default router;
