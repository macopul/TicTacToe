import { useState } from "react";
import "../css/index.css";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import SquaresGrid from "./components/SquaresGrid/SquaresGrid";
import Stats from "./components/Stats/Stats";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";
import { Game, GameState, Player } from "../ts/type";
import { DerivedGame, DerivedGameStats } from "../ts/store";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

export function derivedGame(state: GameState) {
  const currentPlayer = players[state.currentGameMoves.length % 2];

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

  for (const player of players) {
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

export function derivedStats(state: GameState) {
  return {
    playersWithWins: players.map((player) => {
      const wins = state.history.currentRoundGames.filter(
        (game) => game.status.winner?.id === player.id
      ).length;

      return {
        ...player,
        wins,
      };
    }),

    ties: state.history.currentRoundGames.filter(
      (game) => game.status.winner === null
    ).length,
  };
}

export default function App() {
  const [state, setState] = useState<GameState>({
    currentGameMoves: [],
    history: {
      currentRoundGames: [],
      allGames: [],
    },
  });

  const game = derivedGame(state);
  const stats = derivedStats(state);

  function resetGame(isNewRound: boolean) {
    setState((prev) => {
      const stateClone = structuredClone(prev);

      const { status, moves } = game;

      if (status.isComplete) {
        stateClone.history.currentRoundGames.push({ moves, status });
      }

      stateClone.currentGameMoves = [];

      if (isNewRound) {
        stateClone.history.allGames.push(
          ...stateClone.history.currentRoundGames
        );
        stateClone.history.currentRoundGames = [];
      }

      return stateClone;
    });
  }

  function handlePlayerMove(squareId: number, player: Player) {
    setState((prev) => {
      const stateClone = structuredClone(prev);
      stateClone.currentGameMoves.push({
        squareId,
        player,
      });

      return stateClone;
    });
  }

  console.log(game);
  console.log(stats);

  return (
    <>
      <div className="grid" data-id="grid">
        <TurnIndicator />
        <Menu onAction={(action) => resetGame(action === "new-round")} />
        <SquaresGrid game={game} onPlay={handlePlayerMove} />
        <Stats stats={stats} />
      </div>
      <Footer />
      {game.status.isComplete && (
        <Modal
          message={
            game.status.winner ? `${game.status.winner?.name} wins` : "Tie"
          }
          onClick={() => resetGame(false)}
        />
      )}
    </>
  );
}
