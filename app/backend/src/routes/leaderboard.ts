import { Router } from 'express';
import controllers from '../controllers';
// import validate from '../middlewares/validation';

const { leaderboardController } = controllers;

const leaderboardRoute: Router = Router();

leaderboardRoute.get('/', leaderboardController.getLeaderboardGeneral);

leaderboardRoute.get('/home', leaderboardController.getLeaderboardHome);

leaderboardRoute.get('/away', leaderboardController.getLeaderboardAway);

export default leaderboardRoute;
