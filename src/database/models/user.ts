import { INTEGER, STRING, Model, DATE } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
});

export default User;
