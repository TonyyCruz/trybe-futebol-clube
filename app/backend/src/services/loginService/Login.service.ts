import HttpError from '../../shared/HttpError';
import jwtToken from '../../utils/jwtToken';
import UserModel from '../../database/models/User';
import { hashValidate } from '../../utils/hashGenerate';

export default class LoginService {
  constructor(private userModel: typeof UserModel) {}

  public async getUser(userData: { email: string, password: string }): Promise<string> {
    const { email, password } = userData;

    const user: UserModel | null = await this.userModel.findOne(
      { where: { email } },
    );

    if (!user) throw new HttpError(401, 'Incorrect email or password');

    const hashDecode = hashValidate(password, user.password);

    if (!hashDecode) throw new HttpError(401, 'Incorrect email or password');

    const token = jwtToken.create(user);

    return token;
  }
}
