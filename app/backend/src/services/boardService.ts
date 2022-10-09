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
    const placar = new Placar(teams, matches);
    switch (path) {
      case '/':
        const results = placar.calculaPlacar(true, true);
        return results;
      case '/home':
        const home = placar.calculaPlacar(true, false);
        return home;
      case '/away':
        const away = placar.calculaPlacar(false, true);
        return away
      default:
        break;
    }
  }
}
