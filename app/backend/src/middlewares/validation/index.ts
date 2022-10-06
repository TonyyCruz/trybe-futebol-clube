import { Request, Response, NextFunction } from 'express';
import IMatch from '../../interfaces/IMatch';

import TeamModel from '../../database/models/Team';
import TeamService from '../../services/teamService/Team.service';

import HttpError from '../../shared/HttpError';

import validateEmail from './validateEmail';

const teamService = new TeamService(TeamModel);

export default {
  loginValidation: (req: Request, _res: Response, next: NextFunction): void => {
    const { password, email } = req.body;

    if (!password || !email) throw new HttpError(400, 'All fields must be filled');

    if (password.length <= 6) {
      throw new HttpError(400, 'Password need to have at least 6 characters');
    }

    validateEmail(email);

    next();
  },

  newMatchValidation: async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const newMatch: IMatch = req.body;

      if (newMatch.homeTeam === newMatch.awayTeam) {
        throw new HttpError(401, 'It is not possible to create a match with two equal teams');
      }

      await teamService.findByPk(newMatch.homeTeam);
      await teamService.findByPk(newMatch.awayTeam);

      next();
    } catch (err) {
      next(err);
    }
  },

};
