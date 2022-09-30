import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwtToken from '../../utils/jwtToken';
import HttpError from '../../shared/HttpError';

import validateEmail from './validateEmail';
import UserInterface from '../../interfaces/UserInterfaces';

export default {
  loginValidation: (req: Request, res: Response, next: NextFunction): void => {
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

    if (!authorization) throw new HttpError(401, 'Invalid token');

    const userData: JwtPayload | string = jwtToken.authentication(authorization);
    console.log('jwt token validate', userData);

    res.locals.user = userData as UserInterface;

    next();
  },
};
