import { Router } from 'express';
import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import User from '../database/models/user';

const controller = new LoginController(new LoginService(User));

const route = Router();

route.post('/', (req, res) => {
  controller.login(req, res);
});
route.get('/validate', (req, res) => {
  controller.validate(req, res);
})

export default route;