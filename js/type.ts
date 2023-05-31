export type Player = {
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

export type Move = {
  squareId: number;
  player: Player;
};

export type GameStatus = {
  isComplete: boolean;
  winner: Player | null ;
};

export type Game = {
  moves: Move[];
  status: GameStatus;
  currentPlayer : Player;
};

export type PlayersWithWins = Player & { wins: number };

export type GameStats = {
  playersWithWins: PlayersWithWins[];
  ties: number;
};

export type GameState = {
  currentGameMoves: Move[];
  history: {
    currentRoundGames: Game[];
    allGames: Game[]; 
  };
};
