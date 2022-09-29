import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: INTEGER,
    },
    username: STRING,
    role: STRING,
    email: STRING,
    password: STRING,
  },
  {
    sequelize: db,
    tableName: 'users',
    timestamps: false,
    underscored: false
  });

export default User;