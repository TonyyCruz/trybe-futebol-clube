import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../interfaces/IUser';
import HttpError from '../shared/HttpError';

const SECRET = process.env.JWT_SECRET || 'oGato || oKiko';
const jwtConfig = {
  expiresIn: '1d',
};

export default {
  create: (userData: IUser) => {
    const { id, username, email, role } = userData;

    const user: IUser = { id, username, email, role };

    return Jwt.sign(user, SECRET, jwtConfig);
  },

  authentication: (token: string) => {
    try {
      const decode: IUser = Jwt.verify(token, SECRET) as IUser;
      return {
        id: decode.id,
        email: decode.email,
        username: decode.username,
        role: decode.role,
      };
    } catch (err) {
      throw new HttpError(401, 'Token must be a valid token');
    }
  },
};
