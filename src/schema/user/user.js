import { gql } from 'apollo-server-express';

export default gql `
  extend type Query {
    getUsers: [User!] @authenticate
  }

  extend type Mutation {
    createUser(username: String!, password: String!) : User
  }

  type User {
    id: ID!
    username: String!
    createdAt: Date!
    token: String!
    posts: Post!
  }
`
