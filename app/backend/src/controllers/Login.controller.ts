import { Request, Response, NextFunction } from 'express';
import UserInterface from '../interfaces/UserInterfaces';
import UserModel from '../database/models/User';
import LoginService from '../services/Login.service';
import HttpError from '../shared/HttpError';

const Service = new LoginService(UserModel);

export default {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token: string = await Service.getUser(req.body);

      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  },

  loginValidate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals;

      if (!user) throw new HttpError(401, 'Invalid token');

      const userData: UserInterface = { ...user };

      res.status(200).json({ role: userData.role });
    } catch (err) {
      next(err);
    }
  },
};
