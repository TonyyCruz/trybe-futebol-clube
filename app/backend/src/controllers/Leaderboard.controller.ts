import { Request, Response, NextFunction } from 'express';

import ILeaderboard from '../interfaces/ILeaderboard';

import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

import LeaderboardService from '../services/leaderboardService/Leaderboard.service';

const leaderboardService = new LeaderboardService(MatchModel, TeamModel);

export default {
  getLeaderboardHome: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard('home');

      res.status(200).json(leaderboards);
    } catch (err) {
      next(err);
    }
  },

  getLeaderboardAway: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard('away');

      res.status(200).json(leaderboards);
    } catch (err) {
      next(err);
    }
  },

  getLeaderboardGeneral: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard();

      res.status(200).json(leaderboards);
    } catch (err) {
      next(err);
    }
  },
};
