import JWT from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    return JWT.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
  } catch (error) {
    return null;
  }
};
