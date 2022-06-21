import { Context } from '../index';
import { userLoader } from '../loader/userLoader';

interface ParentType {
  authorId: number;
}

export const Post = {
  user: (parent: ParentType, _: any, { prisma }: Context) => {
    console.log('Called');
    return userLoader.load(parent.authorId);
  },
};
