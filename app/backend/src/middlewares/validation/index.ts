import { Request, Response, NextFunction } from 'express';
import HttpError from '../../shared/HttpError';

import validateEmail from './validateEmail';

export default {
  loginValidation: (req: Request, res: Response, next: NextFunction): void => {
    const { password, email } = req.body;

    if (!password || !email) throw new HttpError(401, 'Incorrect email or password');

    if (password.length <= 6) {
      throw new HttpError(400, 'Password need to have at least 6 characters');
    }

    validateEmail(email);

    next();
  },
};
