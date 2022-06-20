import { Context } from '../index';

interface ParentType {
  authorId: number;
}

export const Post = {
  user: (parent: ParentType, _: any, { prisma }: Context) => {
    console.log('Called');

    return prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });
  },
};
