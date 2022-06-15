import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(input: PostInput!): PostPayload!
    postUpdate(postId: ID!, input: PostInput!): PostPayload!
    signup(input: UserInput!): UserPayload!
    signin(input: Credentials): UserPayload!
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
  input Credentials {
    email: String
    password: String
  }
  input UserInput {
    name: String
    bio: String
    email: String
    password: String
  }
`;
