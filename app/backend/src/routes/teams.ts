import { Router } from 'express';
import controllers from '../controllers';
// import validate from '../middlewares/validation';
const { teamController } = controllers;

const teamsRoute: Router = Router();

teamsRoute.get('/', teamController.findAll);

teamsRoute.get('/:id', teamController.findByPk);

export default teamsRoute;
