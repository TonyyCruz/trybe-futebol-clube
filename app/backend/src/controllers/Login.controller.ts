import { Request, Response, NextFunction } from 'express';
import UserInterface from '../interfaces/UserInterfaces';
import User from '../database/models/User';
import LoginService from '../services/Login.service';

const Service = new LoginService(User);

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: UserInterface = req.body;

    const token: string = await Service.getUser(userData.email, userData.password);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
