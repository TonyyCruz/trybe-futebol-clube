import IMatch, { ITeamGoals } from '../../interfaces/IMatch';

export default interface IMatchService {
  findAll(): Promise<IMatch[] | []>;
  findByProgress(inProgress: boolean): Promise<IMatch[]>;
  create(newMatch: IMatch): Promise<IMatch>;
  findByPk(id: number): Promise<IMatch>;
  updateProgress(id: number): Promise<{ message: string }>
  updateGoals(id: number, goals: ITeamGoals): Promise<{ message: string }>;
}
