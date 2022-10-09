import { Request, Response } from 'express';
import BoardService from '../services/boardService';

export default class BoardController {
  constructor(private service: BoardService) {}
  async getAll(req: Request, res: Response) {
    try {
      const teams = await this.service.getAll(req.route);
      return res.status(200).json(teams);
    } catch (error) {
      return res.json(error);
    }
  }

}