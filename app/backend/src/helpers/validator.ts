import ServerError from "./NewError";

class Validate {
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