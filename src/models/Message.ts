/**
 * This is an example model to illustrate a relationship between User and itself.
 */

import Sequelize, { DataTypeUUID } from 'sequelize';
import uuid from 'uuid';
import { SequelizeAttributes } from '../types/SequelizeAttributes';
import { UserInstance, UserAttributes } from './User';

export interface MessageAttributes {
  id?: DataTypeUUID;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserAttributes | UserAttributes['id'];
};

export interface MessageInstance extends Sequelize.Instance<MessageAttributes>, MessageAttributes {
  getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserInstance, UserAttributes>;
};

export const MessageFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<MessageInstance, MessageAttributes> => {
  const attributes: SequelizeAttributes<MessageAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuid(),
    },
    text: {
      type: DataTypes.STRING,
    },
  };

  const Message = sequelize.define<MessageInstance, MessageAttributes>(
    'Message', attributes);

  Message.associate = models => {
    Message.belongsTo(models.User, { as: 'user', foreignKey: 'UserId' });
  };

  return Message;
};
