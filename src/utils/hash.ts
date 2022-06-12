import bcrypt from 'bcryptjs';

export const hashedPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
