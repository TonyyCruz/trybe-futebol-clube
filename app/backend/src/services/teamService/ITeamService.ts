import ITeam from '../../interfaces/ITeam';

export default interface ITeamService {
  findAll(): Promise<ITeam[] | []>;
  findByPk(id: number): Promise<ITeam>;
}
