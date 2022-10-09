import { Request, Response } from "express";
import MatchesService from '../services/matchesService';


export default class MatchesController {
  constructor(private service: MatchesService) {}

  async getMatches(req: Request, res: Response): Promise<Response> {
    try {
      const matches = await this.service.getAllByProgress(req.query);
      return res.status(200).json(matches);
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }

  async createMatch(req: Request, res: Response): Promise<Response> {
    try {
      const newMatch = await this.service.createMatch(req.body, req.headers);
      return res.status(201).json(newMatch);
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }

  async finish(req: Request, res: Response): Promise<Response> {
    try {
      await this.service.finish(req.params);
      return res.status(200).json({ message: "Finished" });
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }

  async update( req: Request, res: Response): Promise<Response> {
    try {
      await this.service.update(req.params, req.body);
      return res.status(200).json({ message: "Edited" })
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}
