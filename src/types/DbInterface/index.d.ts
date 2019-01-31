import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance } from '../../models/User';
import { MessageAttributes, MessageInstance } from '../../models/Message';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Message: Sequelize.Model<MessageAttributes, MessageInstance>;
}
