import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Query } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
  },
});

server.listen().then(({ url }: any) => {
  console.log(`🚀 Server ready at ${url}`);
});
