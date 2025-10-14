import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

export async function hashPassword(plain) {
  return await bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain, hash) {
  return await bcrypt.compare(plain, hash);
}
