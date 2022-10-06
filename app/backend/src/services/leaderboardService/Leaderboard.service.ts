import ILeaderboard from '../../interfaces/ILeaderboard';
import IMatch from '../../interfaces/IMatch';
import ITeam from '../../interfaces/ITeam';
import ILeaderboardService, { gameLocation } from './ILeaderboardService';

import MatchModel from '../../database/models/Match';
import TeamModel from '../../database/models/Team';

import HttpError from '../../shared/HttpError';

export default class Leaderboard implements ILeaderboardService {
  public teamBoard: ILeaderboard;
  public location?: gameLocation;

  constructor(private matchModel: typeof MatchModel, private teamModel: typeof TeamModel) {
    this.resetStateTeamBoard();
  }

  public async getLeaderboard(location?: gameLocation)
    : Promise<ILeaderboard[]> {
    this.location = location;

    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });

    const newBoard = this.boardCreate(teams, matches);

    return Leaderboard.OrdainBoard(newBoard);
  }

  private boardCreate(teams: ITeam[], matches: IMatch[])
    : ILeaderboard[] {
    const leaderboard: ILeaderboard[] = teams.map((team) => {
      if (!team.id) throw new HttpError(500, 'Unknown error');

      const teamMatches = this.teamMatchesFilter(team.id, matches);
      this.teamStatsCreate(team, teamMatches);

      return this.teamBoard;
    });

    return leaderboard;
  }

  private teamStatsCreate(team: ITeam, matches: IMatch[]): void {
    this.resetStateTeamBoard(team.teamName);

    matches.forEach((match) => {
      if (match.homeTeam === team.id) return this.homeMatchCalculate(match);
      this.awayMatchCalculate(match);
    });
  }

  private homeMatchCalculate(match: IMatch): void {
    this.pointsEarned(match.homeTeamGoals, match.awayTeamGoals);
    this.teamBoard.totalGames += 1;
    this.teamBoard.goalsFavor += match.homeTeamGoals;
    this.teamBoard.goalsOwn += match.awayTeamGoals;
    this.teamBoard.goalsBalance = this.teamBoard.goalsFavor - this.teamBoard.goalsOwn;

    this.efficiencyCalculate();
  }

  private awayMatchCalculate(match: IMatch): void {
    this.pointsEarned(match.awayTeamGoals, match.homeTeamGoals);
    this.teamBoard.totalGames += 1;
    this.teamBoard.goalsFavor += match.awayTeamGoals;
    this.teamBoard.goalsOwn += match.homeTeamGoals;
    this.teamBoard.goalsBalance = this.teamBoard.goalsFavor - this.teamBoard.goalsOwn;

    this.efficiencyCalculate();
  }

  private pointsEarned(currentTeamGoals: number, opposingTeamGoals: number): void {
    if (currentTeamGoals > opposingTeamGoals) {
      this.teamBoard.totalPoints += 3;
      this.teamBoard.totalVictories += 1;
      return;
    }

    if (currentTeamGoals === opposingTeamGoals) {
      this.teamBoard.totalPoints += 1;
      this.teamBoard.totalDraws += 1;
      return;
    }

    this.teamBoard.totalLosses += 1;
  }

  private teamMatchesFilter(teamId: number, matches: IMatch[]) {
    if (this.location === 'home') { return matches.filter((match) => match.homeTeam === teamId); }
    if (this.location === 'away') { return matches.filter((match) => match.awayTeam === teamId); }

    return matches.filter((match) => match.homeTeam === teamId
      || match.awayTeam === teamId);
  }

  private efficiencyCalculate() {
    const efficiency = (
      (this.teamBoard.totalPoints / (this.teamBoard.totalGames * 3)) * 100)
      .toFixed(2);

    this.teamBoard.efficiency = Number(efficiency);
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

  private resetStateTeamBoard(name?: string): void {
    this.teamBoard = {
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
