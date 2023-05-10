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

const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRonudBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    modal: document.querySelector('[data-id="modal"]'),
    modalText: document.querySelector('[data-id="modal-text"]'),
    modalBtn: document.querySelector('[data-id="modal-btn"]'),
    turn: document.querySelector('[data-id="turn"]'),
  },

  state: {
    Players: [
      {
        id: 1,
        clickedSquares: [],
        name: "Maciek",
        signClass: "fa-x",
        colorClass: "yellow",
      },
      {
        id: 2,
        clickedSquares: [],
        name: "Angie",
        signClass: "fa-o",
        colorClass: "turquoise",
      },
    ],

    currentPlayer: null,
  },

  setCurrentPlayer(player) {
    this.state.currentPlayer = player;
    const playerTurnSign = this.$.turn.firstElementChild;
    const playerTurnName = this.$.turn.lastElementChild;
    playerTurnName.innerText = player.name;
    playerTurnName.classList.add(player.colorClass);
    playerTurnSign.classList.add(player.colorClass, player.signClass);
  },

  getGameStatus() {
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
    const currentPlayer = this.state.currentPlayer;

    const clickedSquaresAmount =
      this.state.Players[0].clickedSquares.length +
      this.state.Players[1].clickedSquares.length;

    if (clickedSquaresAmount === 9) {
      this.$.modalText.innerText = " TIE !";
      this.$.modal.classList.remove("hidden");
    }

    for (let pattern of winningPatterns) {
      const winDetected = pattern.every((square) =>
        currentPlayer.clickedSquares.includes(square)
      );
      if (winDetected) {
        this.$.modalText.innerText = currentPlayer.name + " wins !";
        this.$.modal.classList.remove("hidden");
      }
    }
  },

  init() {
    App.setCurrentPlayer(App.state.Players[0]);
    App.registerEventListeners();
  },

  registerEventListeners() {
    App.$.menu.addEventListener("click", (event) => {
      App.$.menuItems.classList.toggle("hidden");
    });

    App.$.resetBtn.addEventListener("click", (event) => {
      console.log("Reset the game");
    });

    App.$.newRonudBtn.addEventListener("click", (event) => {
      console.log("Start new round");
    });

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const playerTurnName = App.$.turn.lastElementChild;
        const playerTurnSign = App.$.turn.firstElementChild;

        const players = App.state.Players;
        let currentPlayer = App.state.currentPlayer;
        const allClickedSquares = [
          ...players[0].clickedSquares,
          ...players[1].clickedSquares,
        ];

        if (allClickedSquares.includes(+square.id)) {
          return;
        }

        const icon = document.createElement("i");

        icon.classList.add(
          "fa-solid",
          currentPlayer.colorClass,
          currentPlayer.signClass
        );
        square.replaceChildren(icon);

        currentPlayer.clickedSquares.push(+square.id);

        App.getGameStatus();

        App.state.currentPlayer =
          currentPlayer === players[0] ? players[1] : players[0];

        playerTurnName.innerText = App.state.currentPlayer.name;

        currentPlayer = App.state.currentPlayer;
        const oppositePlayer =
          currentPlayer === players[0] ? players[1] : players[0];

        playerTurnSign.classList.add(
          currentPlayer.colorClass,
          currentPlayer.signClass
        );

        playerTurnSign.classList.remove(
          oppositePlayer.colorClass,
          oppositePlayer.signClass
        );
        playerTurnName.classList.add(currentPlayer.colorClass);
        playerTurnName.classList.remove(oppositePlayer.colorClass);
      });
    });

    const handleModalButtonClick = () => {
      console.log("new game should start");

      const playerTurnName = App.$.turn.lastElementChild;
      const playerTurnSign = App.$.turn.firstElementChild;

      App.state.currentPlayer = App.state.Players[0];
      App.$.turn.lastElementChild.innerText = App.state.currentPlayer.name;
      playerTurnSign.classList.remove("fa-o", "turquoise");
      playerTurnSign.classList.add("fa-x", "yellow");
      playerTurnName.classList.remove("turquoise");
      playerTurnName.classList.add("yellow");

      App.state.Players.forEach((player) => (player.clickedSquares = []));

      this.$.modal.classList.add("hidden");

      App.$.squares.forEach((square) => {
        if (square.hasChildNodes()) {
          square.firstChild.remove();
        }
      });
    };

    App.$.modalBtn.addEventListener("click", handleModalButtonClick);
  },
};

window.addEventListener("load", App.init);