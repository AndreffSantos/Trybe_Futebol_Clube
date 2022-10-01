import ServerError from "./NewError";

class Validate {
  email(email: string) {
    if (!email)
      throw new ServerError(400, '"email" é um campo obrigatório');
  }

  password(password: string) {
    if (!password) 
      throw new ServerError(400, '"password" é um campo obrigatório');
  }
}

export const validate = new Validate;