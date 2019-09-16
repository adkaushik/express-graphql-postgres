import userSchema from './user';
import authSchema from './auth';
import { gql } from 'apollo-server-express';

const linkSchema = gql `
  directive @authenticate on QUERY | MUTATION | FIELD_DEFINITION
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

export default [linkSchema, ...userSchema, ...authSchema];
