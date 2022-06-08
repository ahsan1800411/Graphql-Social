import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    me: String
  }

  type Mutation {
    postCreate(input: CreatePostInput!): PostPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    createdAt: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post]!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type userError {
    message: String
  }
  type PostPayload {
    userErrors: [userError]!
    post: Post!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }
`;
