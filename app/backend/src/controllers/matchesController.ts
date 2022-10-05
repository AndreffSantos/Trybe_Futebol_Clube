import { Request, Response } from "express";
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private service: MatchesService) {}

  async getMatches(req: Request, res: Response): Promise<Response> {
    try {
      const { inProgress } = req.query;
      switch (inProgress) {
        case 'true':
          const matchesTrue = await this.service.getByProgress(true);
          return res.status(200).json(matchesTrue);    
        case 'false':
          const matchesFalse = await this.service.getByProgress(false);
          return res.status(200).json(matchesFalse);    
        default:
          const matches = await this.service.getAll();
          return res.status(200).json(matches);
      }
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}
