import { Router } from 'express';

import loginRoute from './login';
import teamsRoute from './teams';
import matchesRoute from './matches';

const routes: Router = Router();

routes.use('/login', loginRoute);

routes.use('/teams', teamsRoute);

routes.use('/matches', matchesRoute);

export default routes;
