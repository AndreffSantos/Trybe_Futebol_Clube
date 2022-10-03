import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private service: LoginService) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const token = await this.service.login(req.body);
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }

  async validate(req: Request, res: Response): Promise<Response> {
    try {
      const role = await this.service.validate(req.headers);
      return res.status(200).json({ role });
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}
