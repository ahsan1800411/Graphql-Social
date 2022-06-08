import { Post } from '@prisma/client';
import { Context } from '..';

interface PostCreateArgs {
  input: {
    title: string;
    content: string;
  };
}
interface PostCreateResult {
  userErrors: { message?: string }[];
  post: Post | null;
}

export const Mutation = {
  postCreate: async (
    _: any,
    { input }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostCreateResult> => {
    const { content, title } = input;
    if (!title || !content) {
      return {
        userErrors: [{ message: 'Please provide all the values' }],
        post: null,
      };
    }
    const post = await prisma.post.create({
      data: {
        content,
        title,
        authorId: 1,
      },
    });

    return {
      userErrors: [],
      post,
    };
  },
};
