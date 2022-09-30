import { Router } from 'express';
import controllers from '../controllers';
import validate from '../middlewares/validation';

const loginRoute: Router = Router();

loginRoute.post('/', validate.loginValidation, controllers.loginController);

export default loginRoute;
