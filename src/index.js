import 'dotenv/config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import schema from './schema';
import resolvers from './resolvers';

import models, { sequelize } from './models';


const app = express();
app.use(cors());
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models
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
