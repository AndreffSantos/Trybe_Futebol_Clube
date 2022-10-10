export default class Placar {
  constructor(
    private teams: Record<string, any>[],
    private matches: Record<string, any>[],
  ) {}
  
  public calculaPlacar(home: boolean, away: boolean) {
    this.teams.forEach((team) => {
      team.totalPoints = 0;
      team.totalGames = 0;
      team.totalVictories = 0;
      team.totalDraws = 0;
      team.totalLosses = 0;
      team.goalsFavor = 0;
      team.goalsOwn = 0;
      team.goalsBalance = 0;
      team.efficiency = 0.0;
      this.matches.forEach((match) => {
        const homeTeam = home ? (team.id === match.homeTeam) : false;
        const awayTeam = away ? (team.id === match.awayTeam) : false;
        const isHomeWin = match.homeTeamGoals - match.awayTeamGoals;
        if (isHomeWin > 0) {
          if (homeTeam) this.vitoria(team, match);
          else if (awayTeam) this.derrota(team, match);
        } else if (isHomeWin === 0) {
          if (homeTeam) this.empate(team, match);
          else if (awayTeam) this.empate(team, match);
        } else if(isHomeWin < 0) {
          if (homeTeam) this.derrota(team, match);
          else if (awayTeam) this.vitoria(team, match);
        }
      });
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      team.efficiency = (team.totalPoints / (team.totalGames * 3) * 100).toFixed(2);
    });

    const scoreboard = this.teams.map((team) => {
      const { id, teamName, ...rest } = team;
      return { name: teamName, ...rest } as Record<string, any>;
    }).sort(this.compareFn);

    return scoreboard;
  }

  private vitoria(team: Record<string, any>, match: Record<string, any>): void {
    team.totalPoints += 3;
    team.totalGames += 1;
    team.totalVictories += 1;
    team.goalsFavor += match.homeTeamGoals;
    team.goalsOwn += match.awayTeamGoals;  
  }

  private derrota(team: Record<string, any>, match: Record<string, any>) {
    team.totalGames += 1;
    team.totalLosses += 1;
    team.goalsFavor += match.awayTeamGoals;
    team.goalsOwn += match.homeTeamGoals;
  }

  private empate(team: Record<string, any>, match: Record<string, any>) {
    team.totalPoints += 1;
    team.totalGames += 1;
    team.totalDraws += 1;
    team.goalsFavor += match.homeTeamGoals;
    team.goalsOwn +=  match.awayTeamGoals;  
  }

  private compareFn(a: Record<string, any>, b: Record<string, any>) {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;

    if (a.totalPoints === b.totalPoints) {
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;

      if (a.goalsBalance === b.goalsBalance) {
        if (a.goalsFavor > b.goalsFavor) return -1;
        if (a.goalsFavor < b.goalsFavor) return 1;

        if (a.goalsFavor === b.goalsFavor) {
          if (a.goalsOwn > b.goalsOwn) return -1;
          if (a.goalsOwn < b.goalsOwn) return 1;
        }
      }
    }
    return 0;
  }
}