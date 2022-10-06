import ILeaderboard from '../../interfaces/ILeaderboard';

export type gameLocation = 'home' | 'away';

export default interface ILeaderboardService {
  teamBoard: ILeaderboard;
  location?: gameLocation;
  getLeaderboard(location?: gameLocation): Promise<ILeaderboard[]>;
}
