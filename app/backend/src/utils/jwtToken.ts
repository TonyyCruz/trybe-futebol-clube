import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserInterface from '../interfaces/UserInterfaces';
import HttpError from '../shared/HttpError';

const SECRET = process.env.JWT_SECRET || 'tapaNoTeclado';
const jwtConfig = {
  expiresIn: '1d',
};

export default {
  create: (userData: UserInterface) => Jwt.sign(userData, SECRET, jwtConfig),

  authentication: (token: string) => {
    try {
      const decode = Jwt.verify(token, SECRET);
      return decode;
    } catch (err) {
      throw new HttpError(401, 'Invalid token');
    }
  },
};
