import { Context } from '..';

export const Query = {
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  },
  me: async (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) {
      return {
        userErrors: [{ message: 'Forbidden Access' }],
        post: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.id,
      },
    });

    return user;
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma, userInfo }: Context
  ) => {
    const isMyProfile = Number(userId) === userInfo?.id;

    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
    });

    return {
      ...profile,
      isMyProfile,
    };
  },
};
