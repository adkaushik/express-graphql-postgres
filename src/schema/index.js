import userSchema from './user';
import { gql } from 'apollo-server-express';

const linkSchema = gql `
  scalar Date
  scalar JSON
  scalar Long

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, ...userSchema]
