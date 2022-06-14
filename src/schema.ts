import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(input: PostInput!): PostPayload!
    postUpdate(postId: ID!, input: PostInput!): PostPayload!
    userCreate(input: UserInput!): UserPayload!
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

  type UserPayload {
    userErrors: [userError!]!
    token: String
  }

  input PostInput {
    title: String
    content: String
  }
  input UserInput {
    name: String
    email: String
    password: String
    bio: String
  }
`;
