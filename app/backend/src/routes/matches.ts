import { Router } from 'express';
import controllers from '../controllers';
// import validate from '../middlewares/validation';
const { matchController } = controllers;

const matchesRoute: Router = Router();

matchesRoute.get('/', matchController.findAll);

// matchesRoute.get('/:id', matchController.findByPk);

export default matchesRoute;
