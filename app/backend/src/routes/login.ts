import { Router } from 'express';
import controllers from '../controllers';
import validate from '../middlewares/validation';

const { loginController } = controllers;

const loginRoute: Router = Router();

loginRoute.post('/', validate.loginValidation, loginController.login);

loginRoute.get('/validate', validate.tokenValidation, loginController.loginValidate);

export default loginRoute;
