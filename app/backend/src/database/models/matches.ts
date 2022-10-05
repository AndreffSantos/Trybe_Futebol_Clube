import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './team';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoal!: number;
  awayTeam!: number;
  awayTeamGoal!: number;
  inProgress!: number;
}

Match.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER,
  },
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: {
    type: BOOLEAN
  },
},
{
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

Team.hasMany(Match, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

export default Match;