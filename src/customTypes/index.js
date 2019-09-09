import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLLong } from './Long';

const customScalarResolver = {
  Date: GraphQLDateTime,
  JSON: GraphQLJSON,
  Long: GraphQLLong
}

export default customScalarResolver;
