import { Router } from 'express';
import controllers from '../controllers';
import validate from '../middlewares/validation';

const loginRoute: Router = Router();

loginRoute.post('/', validate.loginValidation, controllers.loginController);

loginRoute.get('/validate', validate.tokenValidation, controllers.loginValidateController);

export default loginRoute;
