import { sequelize } from "../../models";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export default {
  Query: {
    getUsers: async (parent, args, { models }) => {

      const users = await models.User.findAll();

      return users;
      // 1,2,3,4
    }
  },

  // parent : 1,2,3,4
  posts: () => ['s'],

  Mutation: {
    createUser: async (parent, { username, password }, { models }) => {

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log('hashed and normal password ', hashedPassword, password);

      return models.User.create({
        username,
        password: hashedPassword
      });

    }
  }
}
