import { Context } from '..';

interface UserType {
  id: number;
}

export const User = {
  posts: (parent: UserType, _: any, { prisma, userInfo }: Context) => {
    const isOwnerInfo = parent.id === userInfo?.id;
    if (isOwnerInfo) {
      return prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return prisma.post.findMany({
        where: {
          published: true,
        },
      });
    }
  },
};
