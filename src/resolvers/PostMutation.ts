import { Post } from '@prisma/client';
import { Context } from '..';

interface PostArgs {
  input: {
    title?: string;
    content?: string;
  };
}
interface PostResult {
  userErrors: { message?: string }[];
  post: Post | null;
}

export const PostMutations = {
  postCreate: async (
    _: any,
    { input }: PostArgs,
    { prisma }: Context
  ): Promise<PostResult> => {
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

  postUpdate: async (
    _: any,
    { postId, input }: { postId: string; input: PostArgs['input'] },
    { prisma }: Context
  ): Promise<PostResult> => {
    const { title, content } = input;

    if (!title && !content) {
      return {
        userErrors: [{ message: 'Please provide atleast one values' }],
        post: null,
      };
    }
    const existsPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!existsPost) {
      return {
        userErrors: [{ message: 'Post doesnt exist' }],
        post: null,
      };
    }

    let postUpdatePayload = {
      title,
      content,
    };

    if (!title) delete postUpdatePayload.title;
    if (!content) delete postUpdatePayload.content;

    const post = await prisma.post.update({
      data: {
        ...postUpdatePayload,
      },
      where: {
        id: Number(postId),
      },
    });
    return {
      userErrors: [],
      post,
    };
  },
};
