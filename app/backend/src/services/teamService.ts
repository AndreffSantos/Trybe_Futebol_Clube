import Team from '../database/models/team';
import ServerError from '../helpers/NewError';

export default class TeamService {
  constructor(private model: typeof Team) {}

  async getAll() {
    const teams = await this.model.findAll();
    return teams;
  }
}