import { Context } from '..';

export const Query = {
  posts: (_: any, __: any, { prisma }: Context) => {
    return prisma.post.findMany({
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
  profile: (_: any, { userId }: { userId: string }, { prisma }: Context) => {
    return prisma.profile.findUnique({
      where: {
        userId: Number(userId),
      },
    });
  },
};
