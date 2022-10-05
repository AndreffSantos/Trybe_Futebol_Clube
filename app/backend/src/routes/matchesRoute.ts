import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';
import Match from '../database/models/matches';

const controller = new MatchesController(new MatchesService(Match));

const route = Router();

route.get('/', (req, res) => {
  controller.getAll(req, res);
});

export default route;