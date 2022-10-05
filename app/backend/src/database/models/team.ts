import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './matches';


class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
  },
  teamName: STRING
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default Team;