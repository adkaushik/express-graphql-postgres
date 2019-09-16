import 'dotenv/config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import schema from './schema';
import resolvers from './resolvers';
import directives from './directives';

import models, { sequelize } from './models';


const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  schemaDirectives: directives,
  context: async ({ req }) => {

    if (req) {
      const identifier = req.headers.identifier;
      console.log('came inside req');
      let authToken = null;
      if (req.headers.authorization && typeof req.headers.authorization === 'string') {
        authToken = req.headers.authorization.split(' ')[1];
      }

      return {
        models,
        sequelize,
        req,
        authToken,
      };
    }
    return {};
  },

  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message
    }
  }
});

server.applyMiddleware({ app, path: '/myproject' });

sequelize.sync().then(async () => {
  app.listen({ port: 7777 }, () => {
    console.log('Apollo Server on http://localhost:7777/myproject')
  })
})

console.log('Hello Project.');
console.log(process.env.POWER_STAR)
