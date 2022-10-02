import { Router } from 'express';
import controllers from '../controllers';
import validate from '../middlewares/validation';

const { matchController } = controllers;

const matchesRoute: Router = Router();

matchesRoute.get('/', matchController.findAll);

matchesRoute.get('/search', matchController.findByProgress);

matchesRoute.post('/', validate.newMatchValidation, matchController.create);

matchesRoute.patch('/:id/finish', matchController.updateProgress);

export default matchesRoute;
