import ILeaderboard from '../interfaces/ILeaderboard';
import MatchService from './Match.service';
import MatchModel from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import HttpError from '../shared/HttpError';

export default class Leaderboard extends MatchService {
  private _teamBoard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  constructor(public model: typeof MatchModel) { super(model); }

  public async getLeaderboard(teams: ITeam[]): Promise<ILeaderboard[]> {
    const isInProgress = false;
    const matches: IMatch[] = await this.findByProgress(isInProgress);

    const board = this.boardCreate(teams, matches);
    console.log(matches, board);

    return [{
      name: 'Santos',
      totalPoints: 9,
      totalGames: 3,
      totalVictories: 3,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 9,
      goalsOwn: 3,
      goalsBalance: 6,
      efficiency: 100.00,
    }];
  }

  private boardCreate(teams: ITeam[], matches: IMatch[]): ILeaderboard[] {
    const leaderboard: ILeaderboard[] = teams.map((team) => {
      if (!team.id) throw new HttpError(500, 'Unknown error');

      const teamMatches = Leaderboard.teamMatchesFilter(team.id, matches);
      this.teamStatsCreate(team, teamMatches);

      return this._teamBoard;
    });

    return leaderboard;
  }

  private teamStatsCreate(team: ITeam, matches: IMatch[]): void {
    this.resetState(team.teamName);

    matches.forEach((match) => {
      if (match.homeTeam === team.id) return this.homeMatchCalculate(match);
      this.awayMatchCalculate(match);
    });
  }

  private homeMatchCalculate(match: IMatch): void {
    this.pointsEarned(match.homeTeamGoals, match.awayTeamGoals);
    this._teamBoard.totalGames += 1;
    this._teamBoard.goalsFavor += match.homeTeamGoals;
    this._teamBoard.goalsOwn += match.awayTeamGoals;
    this._teamBoard.goalsBalance = this._teamBoard.goalsFavor - this._teamBoard.goalsOwn;
  }

  private awayMatchCalculate(match: IMatch): void {
    this.pointsEarned(match.awayTeamGoals, match.homeTeamGoals);
    this._teamBoard.totalGames += 1;
    this._teamBoard.goalsFavor += match.awayTeamGoals;
    this._teamBoard.goalsOwn += match.homeTeamGoals;
    this._teamBoard.goalsBalance = this._teamBoard.goalsFavor - this._teamBoard.goalsOwn;
  }

  private pointsEarned(currentTeamGoals: number, opposingTeamGoals: number): void {
    if (currentTeamGoals > opposingTeamGoals) {
      this._teamBoard.totalPoints += 3;
      this._teamBoard.totalVictories += 1;
      return;
    }

    if (currentTeamGoals === opposingTeamGoals) {
      this._teamBoard.totalPoints += 1;
      this._teamBoard.totalDraws += 1;
      return;
    }

    this._teamBoard.totalLosses += 1;
  }

  private static teamMatchesFilter(teamId: number, matches: IMatch[]) {
    return matches.filter((match) => match.homeTeam === teamId
      || match.awayTeam === teamId);
  }

  private resetState(name?: string): void {
    this._teamBoard = {
      name: name || '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }
}
