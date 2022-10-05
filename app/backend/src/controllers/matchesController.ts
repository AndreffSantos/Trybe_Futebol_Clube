import { Request, Response } from "express";
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private service: MatchesService) {}

  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const matches = await this.service.getAll();
      return res.status(200).json(matches);
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}
