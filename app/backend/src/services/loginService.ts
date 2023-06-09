import User from '../database/models/user';
import ServerError from '../helpers/NewError';
import { token } from '../helpers/token';
import { hash } from '../helpers/hash';
import { validate } from '../helpers/validator';

export default class LoginService {
  constructor(private model: typeof User) {}

  async login(data: Record<string, any>): Promise<string> {
    validate.email(data.email);
    validate.password(data.password);
    const user = await this.model.findOne({
      where: {
        email: data.email
      },
    });
    if (!user || !hash.validate(data.password, user.password)) {
      throw new ServerError(401, 'Incorrect email or password');
    }
    const newToken = token.create({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
    return newToken;
  }

  validate(data: Record<string, any>): string {
    return validate.token(data.authorization);
  }
}