import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultTypeResolver } from 'graphql';
import jwt from 'jsonwebtoken';
const { defaultFieldResolver } = require("graphql");

const authSecret = process.env.AUTH_SECRET;

async function verifyUser(token) {
  return jwt.verify(token, authSecret)
}

class AuthenticationDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultTypeResolver } = field;
    field.resolve = async function (...args) {
      const [, , ctx] = args;

      const accessToken = ctx.authToken;
      console.log('field resolve ', accessToken);

      if (!accessToken) {
        ctx.userAuthentication = {
          type: 'UNAUTHENTICATED'
        }

        return resolve.apply(this, args);
      }

      try {
        const decoded = verifyUser(accessToken);

        ctx.userAuthentication = {
          type: 'AUTHENTICATED'
        }
      } catch (e) {
        ctx.userAuthentication = {
          type: 'UNAUTHENTICATED'
        }
      }

      return resolve.apply(this, args);
    }
  }
}

export default AuthenticationDirective;