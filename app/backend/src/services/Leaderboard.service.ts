import ILeaderboard from '../interfaces/ILeaderboard';
import MatchService from './Match.service';
import MatchModel from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import ITeam from '../interfaces/ITeam';
import HttpError from '../shared/HttpError';

type gameLocation = 'home' | 'away';
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

  private _location?: gameLocation;

  constructor(public model: typeof MatchModel) {
    super(model);
  }

  public async getLeaderboard(teams: ITeam[], location?: gameLocation)
    : Promise<ILeaderboard[]> {
    this._location = location;

    const isInProgress = false;
    const matches: IMatch[] = await this.findByProgress(isInProgress);

    const newBoard = this.boardCreate(teams, matches);

    return Leaderboard.OrdainBoard(newBoard);
  }

  // private boardHomeCreate(teams: ITeam[], matches: IMatch[]): ILeaderboard[] {
  //   const leaderboard: ILeaderboard[] = teams.map((team) => {
  //     if (!team.id) throw new HttpError(500, 'Unknown error');

  //     const teamHomeMatches = matches.filter((match) => match.homeTeam === team.id);
  //     this.teamStatsCreate(team, teamHomeMatches);

  //     return this._teamBoard;
  //   });

  //   return leaderboard;
  // }

  private boardCreate(teams: ITeam[], matches: IMatch[])
    : ILeaderboard[] {
    const leaderboard: ILeaderboard[] = teams.map((team) => {
      if (!team.id) throw new HttpError(500, 'Unknown error');

      const teamMatches = this.teamMatchesFilter(team.id, matches);
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

    this.efficiencyCalculate();
  }

  private awayMatchCalculate(match: IMatch): void {
    this.pointsEarned(match.awayTeamGoals, match.homeTeamGoals);
    this._teamBoard.totalGames += 1;
    this._teamBoard.goalsFavor += match.awayTeamGoals;
    this._teamBoard.goalsOwn += match.homeTeamGoals;
    this._teamBoard.goalsBalance = this._teamBoard.goalsFavor - this._teamBoard.goalsOwn;

    this.efficiencyCalculate();
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

  private teamMatchesFilter(teamId: number, matches: IMatch[]) {
    if (this._location === 'home') { return matches.filter((match) => match.homeTeam === teamId); }
    if (this._location === 'away') { return matches.filter((match) => match.awayTeam === teamId); }

    return matches.filter((match) => match.homeTeam === teamId
      || match.awayTeam === teamId);
  }

  private efficiencyCalculate() {
    const efficiency = (
      (this._teamBoard.totalPoints / (this._teamBoard.totalGames * 3)) * 100)
      .toFixed(2);

    this._teamBoard.efficiency = Number(efficiency);
  }

  private static OrdainBoard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    const orderPriorityDefine = (a: ILeaderboard, b: ILeaderboard): number => {
      const equalVictories = a.totalVictories === b.totalVictories;
      const equalGoalsBalance = a.goalsBalance === b.goalsBalance;
      const equalGoalsFavor = a.goalsFavor === b.goalsFavor;

      if (!equalVictories) return a.totalVictories > b.totalVictories ? -1 : 1;
      if (!equalGoalsBalance) return a.goalsBalance > b.goalsBalance ? -1 : 1;
      if (!equalGoalsFavor) return a.goalsFavor > b.goalsFavor ? -1 : 1;

      return a.goalsOwn > b.goalsOwn ? -1 : 1;
    };

    const ordainedBoard = leaderboard.sort((a, b) => {
      const equalPoints = a.totalPoints === b.totalPoints;

      if (!equalPoints) return a.totalPoints > b.totalPoints ? -1 : 1;

      return orderPriorityDefine(a, b);
    });

    return ordainedBoard;
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
