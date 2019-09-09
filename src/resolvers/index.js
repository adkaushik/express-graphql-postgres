import user from './user'
import customScalarResolver from '../customTypes';

export default [
  customScalarResolver,
  ...user
]
