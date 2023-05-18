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

  window.addEventListener("storage", () =>
    view.render(store.game, store.stats)
  );

  store.addEventListener("statechange", () =>
    view.render(store.game, store.stats)
  );

  view.bindGamesResetEvent(() => {
    store.reset();
  });

  view.bindNewRoundEvent(() => {
    store.newRound();
  });

  view.render(store.game, store.stats);

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === square.id
    );
    if (existingMove) {
      console.log("this square is occupied");
      return;
    }

    store.playerMove(square.id);
  });
}

window.addEventListener("load", init);
