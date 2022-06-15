import bcrypt from 'bcryptjs';

export const hashedPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (candidatePassword: string, user: any) => {
  const isMatch = await bcrypt.compare(candidatePassword, user.password);
  return isMatch;
};
