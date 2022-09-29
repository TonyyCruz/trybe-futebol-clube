import customError from '../../utils/CustomError';
import loginInterface from './interfaces/login';

export default class validation {
  public loginValidation(req: loginInterface) {
    const { email, password } = req;

    if (password.length <= 6) {
      throw new customError(400, 'Password need to have at least 6 characters');
    }
  }
}