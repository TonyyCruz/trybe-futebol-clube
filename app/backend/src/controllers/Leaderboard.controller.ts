import { Request, Response, NextFunction } from 'express';

import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

import LeaderboardService from '../services/leaderboardService/Leaderboard.service';
import TeamService from '../services/teamService/Team.service';

import ILeaderboard from '../interfaces/ILeaderboard';
import ITeam from '../interfaces/ITeam';

const leaderboardService = new LeaderboardService(MatchModel);
const teamService = new TeamService(TeamModel);

export default {
  getLeaderboardHome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams: ITeam[] = await teamService.findAll();
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard(teams, 'home');

      res.status(200).json(leaderboards);
    } catch (err) {
      next(err);
    }
  },

  getLeaderboardAway: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams: ITeam[] = await teamService.findAll();
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard(teams, 'away');

      res.status(200).json(leaderboards);
    } catch (err) {
      next(err);
    }
  },

  getLeaderboardGeneral: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams: ITeam[] = await teamService.findAll();
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard(teams);

      res.status(200).json(leaderboards);
    } catch (err) {
      next(err);
    }
  },
};
