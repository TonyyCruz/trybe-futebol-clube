import { Router } from 'express';

import loginRoute from './login';
import teamsRoute from './teams';

const routes: Router = Router();

routes.use('/login', loginRoute);

routes.use('/teams', teamsRoute);

export default routes;
