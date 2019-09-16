import user from './user'
import auth from './auth';
import customScalarResolver from '../customTypes';

export default [
  customScalarResolver,
  ...user,
  ...auth
];
