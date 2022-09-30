import UserInterface from '../interfaces/UserInterfaces';
import HttpError from '../shared/HttpError';
import jwtToken from '../utils/jwtToken';
import UserModel from '../database/models/User';
import rashGenerate from '../utils/rashGenerate';

export default class LoginService {
  constructor(private User: typeof UserModel) {}

  static rashCreate(pass: string): string {
    return rashGenerate(pass);
  }

  public async getUser(username: string, password: string): Promise<string> {
    const rashPassword: string = LoginService.rashCreate(password);

    const user: UserInterface | null = await this.User.findOne(
      { where: { username, password: rashPassword }, attributes: { exclude: ['password'] } },
    );

    if (!user) throw new HttpError(400, 'Invalid data');

    const token = jwtToken.create(user);
    return token;
  }
}
