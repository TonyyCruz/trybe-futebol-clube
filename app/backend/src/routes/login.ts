import { Router } from 'express';
import controllers from '../controllers';

const loginRoute: Router = Router();

loginRoute.post('/', controllers.loginController);

export default loginRoute;
