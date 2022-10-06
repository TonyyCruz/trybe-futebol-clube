import { Router } from 'express';
import controllers from '../controllers';
import validate from '../middlewares/validation';
import tokenAuthentication from '../middlewares/auth';

const { matchController } = controllers;

const matchesRoute: Router = Router();

matchesRoute.get('/', matchController.findAll);

matchesRoute.get('/search', matchController.findByProgress);

//  ===== token validation, ESTAVA GERANDO ERRO NO PROJETO =====  //
// matchesRoute.use(validate.tokenValidation);

matchesRoute.post(
  '/',
  tokenAuthentication,
  validate.newMatchValidation,
  matchController.create,
);

matchesRoute.patch('/:id/finish', tokenAuthentication, matchController.updateProgress);

matchesRoute.patch('/:id', tokenAuthentication, matchController.updateGoals);

export default matchesRoute;
