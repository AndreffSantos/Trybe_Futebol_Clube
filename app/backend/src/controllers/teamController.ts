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

  async getById(req: Request, res: Response) {
    try {
      const user = await this.service.getById(req.params);
      return res.status(200).json(user);
    } catch (error) {
      
    }
  }
}