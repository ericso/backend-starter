import Sequelize, { DataTypeUUID } from 'sequelize';
import { SequelizeAttributes } from '../types/SequelizeAttributes';
import { MessageInstance, MessageAttributes } from './Message';

export interface UserAttributes {
  id?: DataTypeUUID;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: MessageAttributes[] | MessageAttributes['id'][];
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  getMessages: Sequelize.HasManyGetAssociationsMixin<MessageInstance>;
  setMessages: Sequelize.HasManySetAssociationsMixin<MessageInstance, MessageInstance['id']>;
  addMessages: Sequelize.HasManyAddAssociationsMixin<MessageInstance, MessageInstance['id']>;
  addMessage: Sequelize.HasManyAddAssociationMixin<MessageInstance, MessageInstance['id']>;
  createMessage: Sequelize.HasManyCreateAssociationMixin<MessageAttributes, MessageInstance>;
  removeMessage: Sequelize.HasManyRemoveAssociationMixin<MessageInstance, MessageInstance['id']>;
  removeMessages: Sequelize.HasManyRemoveAssociationsMixin<MessageInstance, MessageInstance['id']>;
  hasMessage: Sequelize.HasManyHasAssociationMixin<MessageInstance, MessageInstance['id']>;
  hasMessages: Sequelize.HasManyHasAssociationsMixin<MessageInstance, MessageInstance['id']>;
  countMessages: Sequelize.HasManyCountAssociationsMixin;
};

export const UserFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  User.associate = models => {
    User.hasMany(models.Message, { foreignKey: 'UserId' });
  };

  return User;
};
