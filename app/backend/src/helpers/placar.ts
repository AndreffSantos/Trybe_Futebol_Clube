export default class Placar {
  constructor(
    private teams: Record<string, any>[],
    private matches: Record<string, any>[],
  ) {}
  
  public calculaPlacar(home: boolean = true, away: boolean = true) {
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
          if (homeTeam) {
            team.totalPoints += 3;
            team.totalGames += 1;
            team.totalVictories += 1;
            team.goalsFavor += match.homeTeamGoals;
            team.goalsOwn += match.awayTeamGoals;  
          } else if (awayTeam) {
            team.totalPoints += 3;
            team.totalGames += 1;
            team.totalVictories += 1;
            team.goalsFavor += match.awayTeamGoals;
            team.goalsOwn += match.homeTeamGoals;  
          }
        } else if (isHomeWin === 0) {
          if (homeTeam) {
            team.totalPoints += 1;
            team.totalGames += 1;
            team.totalDraws += 1;
            team.goalsFavor += match.homeTeamGoals;
            team.goalsOwn +=  match.awayTeamGoals;  
          } else if (awayTeam) {
            team.totalPoints += 1;
            team.totalGames += 1;
            team.totalDraws += 1;
            team.goalsFavor += match.awayTeamGoals;
            team.goalsOwn += match.homeTeamGoals;  
          }
        } else if(isHomeWin < 0) {
          if (homeTeam) {
            team.totalGames += 1;
            team.totalLosses += 1;
            team.goalsFavor += match.homeTeamGoals;
            team.goalsOwn +=  match.awayTeamGoals;    
          } else if (awayTeam) {
            team.totalGames += 1;
            team.totalLosses += 1;
            team.goalsFavor += match.homeTeamGoals;
            team.goalsOwn +=  match.awayTeamGoals;    
            team.goalsFavor += match.awayTeamGoals;
            team.goalsOwn += match.homeTeamGoals;  
          }
        }
      });
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      team.efficiency = (team.totalPoints / (team.totalGames * 3) * 100).toFixed(2);
    });
    return this.teams.map((team) => {
      const { id, teamName, ...rest } = team;
      return { name: teamName, ...rest };
    });
  }
}