import Store from "./store.js";
import View from "./view.js";

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

function init() {
  console.log("ONLOAD");

  const view = new View();
  const store = new Store("storage-key", players);

  function initView() {
    view.closeModal();
    view.clearAllSquares();
    view.setTurnIndicator(store.game.currentPlayer);
    view.updatesScoreBoard(
      store.stats.playersWithWins[0].wins,
      store.stats.playersWithWins[1].wins,
      store.stats.ties
    );
    view.loadExistingMoves(store.game.moves);
  }

  window.addEventListener("storage", () => {
    initView()
  })

  view.bindGamesResetEvent(() => {
    store.reset();
    initView();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    initView();
  });

  initView();

  view.bindGamesResetEvent((event) => {
    console.log("Reset event");
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === square.id
    );
    if (existingMove) {
      console.log("this square is occupied");
      return;
    }

    view.handlePlayerMove(square, store.game.currentPlayer);

    store.playerMove(square.id);

    if (store.game.status.isComplete) {
      view.openModal(store.game.status.winner);
    }

    view.setTurnIndicator(store.game.currentPlayer);
  });

  // view.bindPlayerMoveEvent((event) => {

  //   const clcikedSquare = event.target

  //   console.log(clcikedSquare)

  //   const existingMove = store.game.moves.find(
  //     move => move.squareId === event.id
  //   );
  //   if (existingMove) return;

  //   console.log(clcikedSquare)

  //   view.handlePlayerMove(clcikedSquare, store.game.currentPlayer);

  //   store.playerMove(clcikedSquare.id);

  //   view.setTurnIndicator(store.game.currentPlayer);
  // });
}

window.addEventListener("load", init);
