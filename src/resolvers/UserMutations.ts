import { Context } from '..';
import { hashedPassword } from '../utils/hash';
import validator from 'validator';
import { CreateToken } from '../utils/senToken';

interface UserArgs {
  input: {
    name: string;
    email: string;
    password: string;
    bio: string;
  };
}

interface UserResult {
  userErrors: { message?: string }[];
  token: string | null;
}

export const UserMutations = {
  userCreate: async (
    _: any,
    { input }: UserArgs,
    { prisma }: Context
  ): Promise<UserResult> => {
    const { email, password, name, bio } = input;

    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [{ message: 'Invalid Email' }],
        token: null,
      };
    }
    const isPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isPassword) {
      return {
        userErrors: [
          { message: 'Please provide the password greater than 5 Characters' },
        ],
        token: null,
      };
    }

    if (!email || !password || !name) {
      return {
        userErrors: [{ message: 'Please provide all the values' }],
        token: null,
      };
    }

    const passwordHashed = await hashedPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    const token = CreateToken(user);
    return {
      userErrors: [],
      token,
    };
  },
};
