import ILeaderboard from '../../interfaces/ILeaderboard';

export type gameLocation = 'home' | 'away';

export default interface ILeaderboardService {
  _teamBoard: ILeaderboard
  getLeaderboard(location?: gameLocation): Promise<ILeaderboard[]>;
}
