import { Request, Response, NextFunction } from 'express';
import HttpError from '../../shared/HttpError';
import { LoginInterface } from '../../interfaces/UserInterfaces';

import validateEmail from './validateEmail';

export default {
  loginValidation: (req: Request, res: Response, next: NextFunction): void => {
    const userData: LoginInterface = req.body;
    const { password, email } = userData;

    if (password) throw new HttpError(400, 'Password is required');
    if (email) throw new HttpError(400, 'email is required');

    if (password.length <= 6) {
      throw new HttpError(400, 'Password need to have at least 6 characters');
    }
    validateEmail(email);

    next();
  },
};
