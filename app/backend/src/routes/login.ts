import { Router } from 'express';
import { loginController } from '../controllers';

const login = Router();

login.post('/', loginController);

export default login;
