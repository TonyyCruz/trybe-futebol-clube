export interface ITeamGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default interface IMatch extends ITeamGoals {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}
