import Sequelize from 'sequelize';
import { DbInterface } from '../types/DbInterface';
import { UserFactory } from './User';


export const createModels = (sequelizeConfig: any): DbInterface => {
  const { database, username, password, params } = sequelizeConfig;
  const sequelize = new Sequelize(database, username, password, params);

  const db: DbInterface = {
    sequelize,
    Sequelize,
    User: UserFactory(sequelize, Sequelize),
  };

  return db;
};
