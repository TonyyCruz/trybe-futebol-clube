import { Router } from 'express';

import login from './login';

const routes: Router = Router();

routes.use('/login', login);

export default routes;
