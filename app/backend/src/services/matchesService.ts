import Match from '../database/models/matches';
import Team from '../database/models/team';

export default class MatchesService {
  constructor(private model: typeof Match) {}

  async getAll() {
    const matches = await this.model.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        }
      ]
    });
    return matches;
  }
}