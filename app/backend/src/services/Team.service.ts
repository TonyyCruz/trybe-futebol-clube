import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/ITeam';
import HttpError from '../shared/HttpError';

export default class TeamService {
  constructor(private teamModel: typeof TeamModel) {}

  public async findAll(): Promise<ITeam[] | []> {
    const teams: ITeam[] | [] = await this.teamModel.findAll();

    return teams;
  }

  public async findByPk(id: number): Promise<ITeam> {
    const team: ITeam | null = await this.teamModel.findByPk(id);

    if (!team) throw new HttpError(400, 'team service findByPk');

    return team;
  }
}