import UserInterface from '../interfaces/IUser';
import HttpError from '../shared/HttpError';
import jwtToken from '../utils/jwtToken';
import UserModel from '../database/models/User';
import rashGenerate from '../utils/rashGenerate';

export default class LoginService {
  constructor(private userModel: typeof UserModel) {}

  static rashCreate(pass: string): string {
    return rashGenerate(pass);
  }

  public async getUser(userData: { email: string, password: string }): Promise<string> {
    const { email, password } = userData;
    const rashPassword: string = LoginService.rashCreate(password);

    const user: UserInterface | null = await this.userModel.findOne(
      { where: { email, password: rashPassword }, attributes: { exclude: ['password'] } },
    );

    if (!user) throw new HttpError(401, 'Incorrect email or password');

    const token = jwtToken.create(user);

    return token;
  }
}
