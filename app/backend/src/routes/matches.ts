import { Router } from 'express';
import controllers from '../controllers';
import validate from '../middlewares/validation';

const { matchController } = controllers;

const matchesRoute: Router = Router();

matchesRoute.get('/', matchController.findAll);

matchesRoute.get('/search', matchController.findByProgress);

//  ===== token validation, ESTAVA GERANDO ERRO NO PROJETO =====  //
// matchesRoute.use(validate.tokenValidation);

matchesRoute.post(
  '/',
  validate.tokenValidation,
  validate.newMatchValidation,
  matchController.create,
);

matchesRoute.patch('/:id/finish', validate.tokenValidation, matchController.updateProgress);

matchesRoute.patch('/:id', validate.tokenValidation, matchController.updateGoals);

export default matchesRoute;
