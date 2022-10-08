import ServerError from '../helpers/NewError';
import Match from '../database/models/matches';
import Team from '../database/models/team';
import { validate } from '../helpers/validator';

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

  async createMatch(data: Record<string, any>, auth: Record<string, any>) {
    validate.token(auth.authorization);
    if(data.homeTeam === data.awayTeam) 
      throw new ServerError(401, 'It is not possible to create a match with two equal teams');
    const existHome =  await Team.findOne({
      where: {
        id: data.homeTeam,
      },
      attributes: ['id'],
    });
    const existAway = await Team.findOne({
      where: {
        id: data.awayTeam,
      },
      attributes: ['id'],
    });
    if(!existHome || !existAway)
      throw new ServerError(404, 'There is no team with such id!');

    const newMatch = await this.model.create({
      homeTeam: data.homeTeam,
      homeTeamGoals: data.homeTeamGoals,
      awayTeam: data.awayTeam,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }

  async finish(params: Record<string, any>) {
    await this.model.update({
      inProgress: false,
    }, {
      where: {
        id: params.id,
      },
      fields: ['inProgress'],
    });
  }

  async update(params: Record<string, any>, body: Record<string, any>) {
    await this.model.update({
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
    }, {
      where: {
        id: params.id,
      },
      fields: ['homeTeamGoals', 'awayTeamGoals'],
    });
  }
}