import UserInterface from '../interfaces/UserInterfaces';
import HttpError from '../shared/HttpError';
import jwtToken from '../utils/jwtToken';
import UserModel from '../database/models/User';

export default class LoginService {
  constructor(private User: typeof UserModel) {}

  public async getUser(username: string, password: string): Promise<string> {
    const user: UserInterface | null = await this.User.findOne(
      { where: { username, password }, attributes: { exclude: ['password'] } },
    );
    console.log('login service', user);
    if (!user) throw new HttpError(400, 'Invalid data');

    const token = jwtToken.create(user);
    return token;
  }
}
