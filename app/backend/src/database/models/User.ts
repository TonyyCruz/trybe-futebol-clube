import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id?: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init({
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: STRING(50),
    allowNull: false,
  },
  role: {
    type: STRING(50),
    allowNull: false,
  },
  email: {
    type: STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING(50),
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'users',
  modelName: 'User',
  timestamps: false,
});

export default User;
