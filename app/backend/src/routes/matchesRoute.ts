import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';
import Match from '../database/models/matches';

const controller = new MatchesController(new MatchesService(Match));

const route = Router();

route.get('/', (req, res) => {
  controller.getMatches(req, res);
});

route.post('/', (req, res) => {
  controller.createMatch(req, res);
});

route.patch('/:id/finish', (req, res) => {
  controller.finish(req, res);
});

export default route;