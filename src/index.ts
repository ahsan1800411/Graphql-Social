import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Query, Mutation, Profile, Post, User } from './resolvers';
import { Prisma, PrismaClient } from '@prisma/client';
import { verifyToken } from './utils/verifyToken';
const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    id: number;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile,
    Post,
    User,
  },
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = verifyToken(req.headers.authorization);
    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }: any) => {
  console.log(`🚀 Server ready at ${url}`);
});
