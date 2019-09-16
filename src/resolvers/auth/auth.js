import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sequelize } from "../../models";

const authSecret = process.env.AUTH_SECRET;

export default {
  Query: {
    login: async (parent, { username, password }, { models }) => {

      const user = await models.User.findOne({ where: { username }, attributes: ['password'] });
      const match = await bcrypt.compare(password, user.password);

      console.log('is matched ', match);

      if (!match) {
        throw new Error('User not found in database');
      }

      const authToken = await jwt.sign({ username }, authSecret);

      models.AuthToken.create({
        username,
        authToken
      });

      console.log('auth token', authToken);

      return {
        accessToken: authToken
      };
    }
  }
}
