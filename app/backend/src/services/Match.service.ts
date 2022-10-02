import Team from '../database/models/Team';
import MatchModel from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import HttpError from '../shared/HttpError';

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

    return matches;
  }

  public async findByProgress(inProgress: boolean): Promise<IMatch[]> {
    const match: IMatch[] | [] = await this.matchModel.findAll({
      where: { inProgress },
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

    return match;
  }

  public async create(newMatch: IMatch): Promise<IMatch> {
    await this.findByPk(newMatch.homeTeam);
    await this.findByPk(newMatch.awayTeam);

    const match: IMatch = await this.matchModel.create({
      homeTeam: newMatch.homeTeam,
      homeTeamGoals: newMatch.homeTeamGoals,
      awayTeam: newMatch.awayTeam,
      awayTeamGoals: newMatch.awayTeamGoals,
      inProgress: newMatch.inProgress,
    });

    return match;
  }

  public async findByPk(id: number): Promise<IMatch> {
    const team: IMatch | null = await this.matchModel.findByPk(id);

    if (!team) throw new HttpError(400, `Team ${id} don't exists`);

    return team;
  }
}
