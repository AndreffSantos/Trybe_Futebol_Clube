import Match from '../database/models/matches';
import Team from '../database/models/team';

const INCLUDE = [
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
];

export default class MatchesService {
  constructor(private model: typeof Match) {}

  async getAll() {
    const matches = await this.model.findAll({
      include: INCLUDE,
    });
    return matches;
  }

  async getByProgress(inProgress: boolean) {
    const matches = await this.model.findAll({
      where: {
        inProgress: inProgress,
      },
      include: INCLUDE,
    });
    return matches;
  }
}