import Sequelize from 'sequelize';
import fs from 'fs';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
   {
     dialect: 'postgres'
   }
);

const models = {};

fs.readdirSync(__dirname)
  .filter(f => !f.includes('index.js'))
  .forEach((filename) => {
    const name = filename.split('.')[0];
    // eslint-disable-next-line
    Object.assign(models, { [`${name.charAt(0).toUpperCase()}${name.slice(1)}`]: sequelize.import(`./${filename}`) });
  });

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
