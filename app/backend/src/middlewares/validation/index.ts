import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwtToken from '../../utils/jwtToken';
import HttpError from '../../shared/HttpError';

import validateEmail from './validateEmail';

import IUser from '../../interfaces/IUser';
import IMatch from '../../interfaces/IMatch';

import TeamModel from '../../database/models/Team';
import TeamService from '../../services/Team.service';

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

  tokenValidation: (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;

    if (!authorization) throw new HttpError(401, 'Token is required');

    const userData: JwtPayload | string = jwtToken.authentication(authorization);

    res.locals.user = userData as IUser;

    next();
  },

  newMatchValidation: async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const newMatch: IMatch = req.body;
      await teamService.findByPk(newMatch.homeTeam);
      await teamService.findByPk(newMatch.awayTeam);

      next();
    } catch (err) {
      next(err);
    }
  },

};
