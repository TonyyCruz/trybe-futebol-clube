import { Router } from 'express';
import controllers from '../controllers';
// import validate from '../middlewares/validation';

const { leaderboardController } = controllers;

const leaderboardRoute: Router = Router();

leaderboardRoute.get('/home', leaderboardController.getLeaderboard);

// leaderboardRoute.get('/validate', leaderboardController.getLeaderboard);

export default leaderboardRoute;
