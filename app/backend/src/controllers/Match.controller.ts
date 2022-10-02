import { Request, Response, NextFunction } from 'express';
import IMatch from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import MatchService from '../services/Match.service';

const matchService = new MatchService(MatchModel);

export default {
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams: IMatch[] = await matchService.findAll();

      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  },

  findByProgress: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      const inProgress: boolean = query.inProgress === 'true';
      console.log('match controller ===----', query);

      const team: IMatch[] = await matchService.findByProgress(inProgress);

      res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  },

  // findByPk: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { id } = req.params;
  //     const team: ITeam = await teamService.findByPk(Number(id));

  //     res.status(200).json(team);
  //   } catch (err) {
  //     next(err);
  //   }
  // },

};
