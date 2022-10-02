import Team from '../database/models/Team';
import MatchModel from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
// import HttpError from '../shared/HttpError';

export default class MatchService {
  constructor(private matchModel: typeof MatchModel) {}

  public async findAll(): Promise<IMatch[] | []> {
    const matches: IMatch[] | [] = await this.matchModel.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    console.log('match service <<>>', matches);

    return matches;
  }

  // public async findByPk(id: number): Promise<ITeam> {
  //   const team: ITeam | null = await this.matchModel.findByPk(id);

  //   if (!team) throw new HttpError(400, 'team service findByPk');

  //   return team;
  // }
}
