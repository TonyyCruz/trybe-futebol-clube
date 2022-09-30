import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/User';
import LoginService from '../services/Login.service';

const Service = new LoginService(UserModel);

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = await Service.getUser(req.body);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
