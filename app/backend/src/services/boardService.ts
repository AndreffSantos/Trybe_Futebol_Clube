import Match from '../database/models/matches';
import Team from '../database/models/team';
import Placar from '../helpers/placar';


export default class Boardservice {
  async getAll(route: Record<string, any>) {
    const { path } = route;
    const teams = (await Team.findAll()).map((e) => e.get());
    const matches = (await Match.findAll({
      where: {
        inProgress: false,
      }
    })).map((e) => e.get());
    
    switch (path) {
      case '/':
        const results = new Placar(teams, matches).calculaPlacar(true, true);
        return results;
      case '/home':
        const home = new Placar(teams, matches).calculaPlacar(true, false);
        return home;
      case '/away':
        const away = new Placar(teams, matches).calculaPlacar(false, true);
        return away
      default:
        break;
    }
  }
}
