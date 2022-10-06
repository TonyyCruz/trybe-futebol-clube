import { Router } from 'express';
import controllers from '../controllers';
import validate from '../middlewares/validation';
import tokenAuthentication from '../middlewares/auth';

const { loginController } = controllers;

const loginRoute: Router = Router();

loginRoute.post('/', validate.loginValidation, loginController.login);

loginRoute.get('/validate', tokenAuthentication, loginController.loginValidate);

export default loginRoute;
