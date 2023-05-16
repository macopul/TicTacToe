
const initialValue = {
  currentGameMoves:
    JSON.parse(localStorage.getItem("current game moves")) || [],
  history: {
    currentRoundGames: [],
    allGames: [],
  },
};

export default class Store {
  LOCAL_STORAGE_CURRENT_GAME_MOVES_KEY = "current game moves";
  LOCAL_STORAGE_HISTORY_KEY = "history";

  saveDataInStorageForKey = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data));
  };

  getHistoryInLocalStorage = () => {
    return (
      JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_HISTORY_KEY)) ||
      initialValue.history
    );
  };

  getCurrentMovesInLocalStorage = () => {
    return JSON.parse(
      localStorage.getItem(this.LOCAL_STORAGE_CURRENT_GAME_MOVES_KEY)
    );
  };

  loadCurrentMovesInLocalStorage = () => {
    this.saveDataInStorageForKey(this.LOCAL_STORAGE_CURRENT_GAME_MOVES_KEY, []);
  };

  loadHistoryInLocalStorage = () => {
    console.log(this.getHistoryInLocalStorage());
    this.saveDataInStorageForKey(
      this.LOCAL_STORAGE_HISTORY_KEY,
      this.getHistoryInLocalStorage()
    );
  };

  // clearState = () => {
  //   this.#state = initialValue
  // }
  // export const getThemeModeFromLocalStorage = () => {
  //   return JSON.parse(localStorage.getItem(DARK_STORAGE_THEME_MODE));
  // };

  #state = initialValue;

  constructor(players) {
    this.players = players;
  }

  get game() {
    // console.log("game was invoked");

    const state = this.#getState();

    const currentPlayer = this.players[state.currentGameMoves.length % 2];

    const winningPatterns = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    let winner = null;

    for (const player of this.players) {
      const selectedSquaresIds = state.currentGameMoves
        .filter((move) => move.player.id === player.id)
        .map((move) => +move.squareId);

      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selectedSquaresIds.includes(v))) {
          winner = player;
        }
      }
    }

    return {
      moves: state.currentGameMoves,
      currentPlayer,
      status: {
        isComplete: winner !== null || state.currentGameMoves.length === 9,
        winner,
      },
    };
  }

  setCurrentGameRound = () => {
    const currentHistoryInLocalStorage = this.getHistoryInLocalStorage();
    const currentRoundGameInLocalStorage =
      currentHistoryInLocalStorage.currentRoundGames;
    currentRoundGameInLocalStorage.push({
      Moves: this.game.moves,
      Status: this.game.status,
    });
    this.saveDataInStorageForKey(
      this.LOCAL_STORAGE_HISTORY_KEY,
      currentHistoryInLocalStorage
    );
  };

  getPlayerWins = (playerId) => {
    const currentHistoryInLocalStorage = this.getHistoryInLocalStorage();
    const PlayerWins = currentHistoryInLocalStorage.currentRoundGames.filter(
      (game) => game.Status.winner.id === playerId
    );
    console.log(PlayerWins.length);
    // console.log(PlayerWins.length);
  };

  playerMove(squareId) {
    const state = this.#getState();

    const StateClone = structuredClone(state);

    StateClone.currentGameMoves.push({
      squareId,
      player: this.game.currentPlayer,
    });

    this.#saveState(StateClone);

    this.saveDataInStorageForKey(
      this.LOCAL_STORAGE_CURRENT_GAME_MOVES_KEY,
      this.game.moves
    );
  }

  clearCurrentGameMoves() {
    this.saveDataInStorageForKey("current game moves", []);
  }

  clearAllSquaresInState() {
    this.#state.currentGameMoves = [];
  }

  // clearAllSquaresInState() {
  //   this.#state.currentGameMoves = [];
  // }

  #getState() {
    return this.#state;
  }

  #saveState(stateOrFn) {
    const prevState = this.#getState();

    let newState;

    switch (typeof stateOrFn) {
      case "function":
        newState = stateOrFn(prevState);
        break;
      case "object":
        newState = stateOrFn;
        break;
      default:
        throw new Error("Invalid argument passed to saveState");
    }

    this.#state = newState;
  }
}
