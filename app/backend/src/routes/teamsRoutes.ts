import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamService from '../services/teamService';
import Team from '../database/models/team';

const controller = new TeamController(new TeamService(Team));

const route = Router();

route.get('/', (req, res) => {
  controller.getAll(req, res);
});

route.get('/:id', (req, res) => {
  controller.getById(req, res);
});

export default route;