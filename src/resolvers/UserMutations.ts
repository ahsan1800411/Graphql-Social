import { Context } from '..';
import { comparePassword, hashedPassword } from '../utils/hash';
import validator from 'validator';
import { CreateToken } from '../utils/senToken';

interface UserArgs {
  input: {
    name: string;
    bio: string;
    email: string;
    password: string;
  };
}

interface SigninArgs {
  input: {
    email: string;
    password: string;
  };
}

interface UserResult {
  userErrors: { message?: string }[];
  token: string | null;
}

export const UserMutations = {
  signup: async (
    _: any,
    { input }: UserArgs,
    { prisma }: Context
  ): Promise<UserResult> => {
    const { name, bio, email, password } = input;

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
  signin: async (
    _: any,
    { input }: SigninArgs,
    { prisma }: Context
  ): Promise<UserResult> => {
    const { email, password } = input;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isMatch = await comparePassword(password, user);
    if (!isMatch) {
      return {
        userErrors: [
          {
            message: 'Invalid Credentials',
          },
        ],
        token: null,
      };
    }

    const token = CreateToken(user);
    return {
      userErrors: [],
      token,
    };
  },
};
