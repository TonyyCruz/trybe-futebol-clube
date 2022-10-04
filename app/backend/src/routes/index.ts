import { Router } from 'express';

import loginRoute from './login';
import teamsRoute from './teams';
import matchesRoute from './matches';
import leaderboardRoute from './leaderboard';

const routes: Router = Router();

routes.use('/login', loginRoute);

routes.use('/teams', teamsRoute);

routes.use('/matches', matchesRoute);

routes.use('/leaderboard', leaderboardRoute);

export default routes;
