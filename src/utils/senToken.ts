import JWT from 'jsonwebtoken';

export const CreateToken = (user: any) => {
  return JWT.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
