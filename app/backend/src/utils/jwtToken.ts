import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
import UserInterface from '../interfaces/UserInterfaces';
import HttpError from '../shared/HttpError';

const SECRET = process.env.JWT_SECRET || 'oGato || oKiko';
const jwtConfig = {
  expiresIn: '1d',
};

export default {
  create: (userData: UserInterface) => {
    const { id, username, email, role } = userData;

    const user: UserInterface = { id, username, email, role };

    return Jwt.sign(user, SECRET, jwtConfig);
  },

  authentication: (token: string) => {
    try {
      const decode = Jwt.verify(token, SECRET);
      return decode;
    } catch (err) {
      throw new HttpError(401, 'Invalid token');
    }
  },
};
