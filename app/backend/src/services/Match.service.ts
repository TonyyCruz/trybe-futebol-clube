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

    if (!team) throw new HttpError(400, `Match ${id} don't exists`);

    return team;
  }

  public async updateProgress(id: number): Promise<{ message: string }> {
    const [affectedRows]: [number, IMatch[]] = await this.matchModel.update({
      inProgress: false }, {
      where: {
        id,
      },
    });

    if (!affectedRows) throw new HttpError(401, 'Update error');

    return { message: 'Finished' };
  }
}
