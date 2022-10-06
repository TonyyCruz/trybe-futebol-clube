import { Request, Response, NextFunction } from 'express';
import jwtToken from '../utils/jwtToken';
import HttpError from '../shared/HttpError';
import IUser from '../interfaces/IUser';

export default (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization) throw new HttpError(401, 'Token must be a valid token');

  const userData: IUser = jwtToken.authentication(authorization);

  res.locals.user = userData;

  next();
};
