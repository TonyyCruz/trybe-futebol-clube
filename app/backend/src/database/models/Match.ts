import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id?: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  modelName: 'Match',
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamName' });
Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamAway' });

Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamName' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Match;
