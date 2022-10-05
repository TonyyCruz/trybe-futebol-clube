import TeamModel from '../../database/models/Team';
import ITeam from '../../interfaces/ITeam';
import HttpError from '../../shared/HttpError';
import ITeamService from './ITeamService';

export default class TeamService implements ITeamService {
  constructor(private teamModel: typeof TeamModel) {}

  public async findAll(): Promise<ITeam[] | []> {
    const teams: ITeam[] | [] = await this.teamModel.findAll();

    return teams;
  }

  public async findByPk(id: number): Promise<ITeam> {
    const team: ITeam | null = await this.teamModel.findByPk(id);

    if (!team) throw new HttpError(404, 'There is no team with such id!');

    return team;
  }
}
