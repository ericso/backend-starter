import Sequelize from 'sequelize';
import { DbInterface } from '../types/DbInterface';
import { UserFactory } from './User';
import { MessageFactory } from './Message';


export const createModels = (sequelizeConfig: any): DbInterface => {
  const { databaseUrl, database, username, password, params } = sequelizeConfig;
  const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, params)
    : new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
    Message: MessageFactory(sequelize, Sequelize),
  };

  // Form relationships between models
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
