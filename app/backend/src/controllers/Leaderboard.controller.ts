import { Request, Response, NextFunction } from 'express';

import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';

import LeaderboardService from '../services/Leaderboard.service';
import TeamService from '../services/Team.service';
// import HttpError from '../shared/HttpError';

import ILeaderboard from '../interfaces/ILeaderboard';
import ITeam from '../interfaces/ITeam';

const leaderboardService = new LeaderboardService(MatchModel);
const teamService = new TeamService(TeamModel);

export default {
  getLeaderboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams: ITeam[] = await teamService.findAll();
      const leaderboards: ILeaderboard[] = await leaderboardService.getLeaderboard(teams);

      res.status(200).json(leaderboards);
    } catch (err) {
      next(err);
    }
  },
};
