import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id?: number;
  teamName!: string;
}

Team.init({
  id: {
    primaryKey: true,
    type: INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING(50),
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  modelName: 'Team',
  timestamps: false,
  underscored: true,
});

export default Team;
