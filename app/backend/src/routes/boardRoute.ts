import { Router } from 'express';
import BoardController from '../controllers/boardController';
import Boardservice from '../services/boardService';

const controller = new BoardController(new Boardservice);
const route = Router();

route.get('/', (req, res) => {
  controller.getAll(req, res);
});

route.get('/home', (req, res) => {
  controller.getAll(req, res);
});

route.get('/away', (req, res) => {
  controller.getAll(req, res);
});

export default route;