import { Request, Response } from "express";
import TeamService from '../services/teamService';

export default class TeamController {
  constructor(private service: TeamService) {}

  async getAll(_req: Request, res: Response) {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error: any) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}