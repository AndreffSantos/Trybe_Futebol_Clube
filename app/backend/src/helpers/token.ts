import { JwtPayload, Secret, sign, SignOptions, verify } from "jsonwebtoken";
import ServerError from "./NewError";
import 'dotenv/config';
import Payload from '../entities/Payload';

const JWT_SECRET: Secret = `${process.env.JWT_SECRET}`;
const JWT_OPTIONS: SignOptions = { 
  algorithm: 'HS256',
  expiresIn: '1d'
};

class Token {
  create(payload: Payload): string {
    return sign(payload, JWT_SECRET, JWT_OPTIONS);
  }
  
  validate(token: string): Payload {
    try {
      return verify(token, JWT_SECRET) as Payload;
    } catch (error) {
      throw new ServerError(401, 'Token must be a valid token');
    }
  }
}

export const token = new Token;