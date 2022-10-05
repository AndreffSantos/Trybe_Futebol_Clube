import { Model, INTEGER } from 'sequelize';
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
  home_team: INTEGER,
  home_team_goals: INTEGER,
  away_team: INTEGER,
  away_team_goals: INTEGER,
  in_progress: INTEGER,

},
{
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, {
  foreignKey: 'id',
  as: 'team_id',
});

export default Match;