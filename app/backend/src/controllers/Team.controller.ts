import { Request, Response, NextFunction } from 'express';
import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';
import TeamService from '../services/teamService/Team.service';

const teamService = new TeamService(TeamModel);

export default {
  findAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams: ITeam[] = await teamService.findAll();

      res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  },

  findByPk: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team: ITeam = await teamService.findByPk(Number(id));

      res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  },

};
