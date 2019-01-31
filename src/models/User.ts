import Sequelize, { DataTypeUUID } from 'sequelize';
import uuid from 'uuid';
import { SequelizeAttributes } from '../types/SequelizeAttributes';
import { MessageAttributes } from './Message';

export interface UserAttributes {
  id?: DataTypeUUID;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: MessageAttributes[] | MessageAttributes['id'][];
};

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  // At the moment, there's nothing more to add apart
  // from the methods and attributes that the types
  // `Sequelize.Instance<UserAttributes>` and
  // `UserAttributes` give us. We'll add more here when
  //  we get on to adding associations.
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
      defaultValue: uuid(),
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
