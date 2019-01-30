import Sequelize from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.DATABASE,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user/model'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
