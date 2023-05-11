import Store from "./store.js";
import View from "./view.js";
// const App = {
//   $: {
//     menu: document.querySelector('[data-id="menu"]'),
//     menuItems: document.querySelector('[data-id="menu-items"]'),
//     resetBtn: document.querySelector('[data-id="reset-btn"]'),
//     newRonudBtn: document.querySelector('[data-id="new-round-btn"]'),
//     squares: document.querySelectorAll('[data-id="square"]'),
//   },

//   state: {
//     Players: [
//       { id: 1, clickedSquares: [] },
//       { id: 2, clickedSquares: [] },
//     ],

//     currentPlayerID: 1,
//   },

//   getGameStatus() {
//     const winningPatterns = [
//       [1, 2, 3],
//       [4, 5, 6],
//       [7, 8, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 6, 9],
//       [1, 5, 9],
//       [3, 5, 7],
//     ];

//     const Player1Squares = App.state.Players[0].clickedSquares;
//     const Player2Squares = App.state.Players[1].clickedSquares;
//     console.log(Player1Squares);
//     console.log(Player2Squares);

//     let winner = null;

//     const winningCase = (clcikedSquares) => {
//       let isWin = false;
//       //   winningPatterns.forEach(
//       //     (pattern) => (isWin = pattern.every((v) => clcikedSquares.includes(v)))
//       //   );
//       //   return isWin;
//       // };

//       for (let i = 0; i < winningPatterns.length; i++) {
//         const pattern = winningPatterns[i];
//         isWin = pattern.every((v) => clcikedSquares.includes(v));
//         if (isWin) {
//           break;
//         }
//       }

//       return isWin
//     };

//     const winPlayer1 = winningCase(Player1Squares);
//     const winPlayer2 = winningCase(Player2Squares);

//     console.log({winPlayer1});
//     console.log({winPlayer2});

//     if (winningCase(Player2Squares)) {
//       winner = "player2";
//     }

//     // winningPatterns.forEach((pattern) => {
//     //   if (App.state.currentPlayerID === 1) {
//     //     const Player1Wins = pattern.every((v) => Player1Squares.includes(v));
//     //     if (Player1Wins) {
//     //       winner = "player1";
//     //     }
//     //   } else {
//     //     const Player2Wins = pattern.every((v) => Player2Squares.includes(v));
//     //     if (Player2Wins) {
//     //       winner = "player2";
//     //     }
//     //   }
//     // });

//     return {
//       status: "in progress",
//       winner,
//     };
//   },

//   init() {
//     App.registerEventListeners();
//   },

//   registerEventListeners() {
//     App.$.menu.addEventListener("click", (event) => {
//       App.$.menuItems.classList.toggle("hidden");
//     });

//     App.$.resetBtn.addEventListener("click", (event) => {
//       console.log("Reset the game");
//     });

//     App.$.newRonudBtn.addEventListener("click", (event) => {
//       console.log("Start new round");
//     });

//     App.$.squares.forEach((square) => {
//       square.addEventListener("click", (event) => {
//         const currentPlayerID = App.state.currentPlayerID;
//         const Players = App.state.Players;
//         const Player1 = Players[0];
//         const Player2 = Players[1];

//         const currentPlayer = currentPlayerID === 1 ? Player1 : Player2;

//         const isSquareBusy = (squreID) => {
//           const isBusy =
//             App.state.Players[0].clickedSquares.find(
//               (square) => square === squreID
//             ) ||
//             App.state.Players[1].clickedSquares.find(
//               (square) => square === squreID
//             );

//           return isBusy !== undefined;
//         };

//         if (isSquareBusy(+square.id)) {
//           return;
//         }

//         const icon = document.createElement("i");

//         if (currentPlayer.id === 1) {
//           icon.classList.add("fa-solid", "fa-x", "yellow");
//         } else {
//           icon.classList.add("fa-solid", "fa-o", "turquoise");
//         }
//         square.replaceChildren(icon);

//         currentPlayer.clickedSquares.push(+square.id);

//         const gameStatus = App.getGameStatus();
//         console.log(gameStatus);

//         App.state.currentPlayerID = currentPlayer.id === 1 ? 2 : 1;
//       });
//     });
//   },
// };

// window.addEventListener("load", App.init);

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
  console.log("ONLOARd");

  const view = new View();
  const store = new Store(players);

  view.bindGamesResetEvent((event) => {
    console.log("Reset event");
    console.log(event);
  });

  view.bindNewRoundEvent((event) => {
    console.log("New round event");
    console.log(event);
  });

  view.bindPlayerMoveEvent((square) => {
    // const clickedSquare = square.target

    console.log(store.game.status);

    const existingMove = store.game.moves.find(
      (move) => move.squareId === square.id
    );
    if (existingMove) return;

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
