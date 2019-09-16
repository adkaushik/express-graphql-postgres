import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    login(username: String!, password: String!) : AuthData!
  }

  type AuthData {
    # userId: ID!
    accessToken: String!
  }
`;
