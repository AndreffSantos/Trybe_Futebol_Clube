import ServerError from "./NewError";
import { token } from '../helpers/token';

class Validate {
  token(authorization: string): string {
    const payload = token.validate(authorization);
    return payload.role;
  }

  email(email: string) {
    if (!email)
      throw new ServerError(400, 'All fields must be filled');
  }

  password(password: string) {
    if (!password) 
      throw new ServerError(400, 'All fields must be filled');
  }
}

export const validate = new Validate;