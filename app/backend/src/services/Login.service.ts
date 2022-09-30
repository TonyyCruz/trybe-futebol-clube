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

  public async getUser(userData: { email: string, password: string }): Promise<string> {
    const { email, password } = userData;
    const rashPassword: string = LoginService.rashCreate(password);
    console.log(rashPassword, email);

    const user: UserInterface | null = await this.User.findOne(
      { where: { email }, attributes: { exclude: ['password'] } },
    );

    if (!user) throw new HttpError(401, 'Incorrect email or password');

    const token = jwtToken.create(user);

    return token;
  }
}
