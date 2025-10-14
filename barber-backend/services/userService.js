//business logic

import { hashPassword, verifyPassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export class UserService {
  constructor({ userRepository }) {
    this.userRepo = userRepository;
    this.jwtSecret = process.env.JWT_SECRET || 'secret';
  }

  async register({ email, password, name }) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('User already exists');
    const hashed = await hashPassword(password);
    const user = await this.userRepo.createUser({ email, password: hashed, name });
    return { id: user.id, email: user.email, name: user.name };
  }

  async login({ email, password }) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');
    const ok = await verifyPassword(password, user.password);
    if (!ok) throw new Error('Invalid credentials');
    const token = jwt.sign({ userId: user.id, role: user.role }, this.jwtSecret, { expiresIn: '8h' });
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }
}
