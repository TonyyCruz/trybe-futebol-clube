import ILeaderboard from '../../interfaces/ILeaderboard';
import ITeam from '../../interfaces/ITeam';

export type gameLocation = 'home' | 'away';

export default interface ILeaderboardService {
  _teamBoard: ILeaderboard
  getLeaderboard(teams: ITeam[], location?: gameLocation): Promise<ILeaderboard[]>;
}
