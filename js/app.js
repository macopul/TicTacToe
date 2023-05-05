const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRonudBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
  },

  state: {
    Players: [
      { id: 1, clickedSquares: [] },
      { id: 2, clickedSquares: [] },
    ],

    currentPlayerID: 1,
  },

  getGameStatus(state) {
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

    const Player1Squares = state.Players[0].clickedSquares;
    const Player2Squares = state.Players[1].clickedSquares;

    let winner = null;

    winningPatterns.forEach((pattern) => {
      if (state.currentPlayerID === 1) {
        const Player1Wins = pattern.every((v) => Player1Squares.includes(v));
        if (Player1Wins) {
          winner = "player1";
        }
      } else {
        const Player2Wins = pattern.every((v) => Player2Squares.includes(v));
        if (Player2Wins) {
          winner = "player2";
        }
      }

      // if (Player1Wins) {
      //   winner = "player1";
      // }

      // if (Player2Wins) {
      //   winner = "player2";
      // }
    });

    console.log(Player1Squares);
    return {
      status: "in progress",
      winner,
    };
  },

  init() {
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
        const currentPlayerID = App.state.currentPlayerID;
        const Players = App.state.Players;
        const Player1 = Players[0];
        const Player2 = Players[1];

        console.log(currentPlayerID);

        const currentPlayer = currentPlayerID === 1 ? Player1 : Player2;
        // console.log(Player1.clickedSquares);
        // console.log(Player2.clickedSquares);

        const isSquareBusy = (squreID) => {
          const isBusy =
            App.state.Players[0].clickedSquares.find(
              (square) => square === squreID
            ) ||
            App.state.Players[1].clickedSquares.find(
              (square) => square === squreID
            );

          return isBusy !== undefined;
        };

        // console.log(isSquareBusy(+square.id));

        if (isSquareBusy(+square.id)) {
          return;
        }


        // console.log(
        //   "this is the current player" + JSON.stringify(currentPlayer)
        // );

        const icon = document.createElement("i");
        // const classNames = {
        //   1: ["fa-x", "yellow"],
        //   2: ["fa-o", "turquoise"],
        // };

        if (currentPlayer.id === 1) {
          icon.classList.add("fa-solid", "fa-x", "yellow");
        } else {
          icon.classList.add("fa-solid", "fa-o", "turquoise");
        }
        // console.log({ currentPlayer, App, this: this });
        // icon.classList.add("fa-solid", ...classNames[currentPlayer.id]);
        square.replaceChildren(icon);

        currentPlayer.clickedSquares.push(+square.id);

        const gameStatus = App.getGameStatus();
        console.log(gameStatus);

        App.state.currentPlayerID = currentPlayer.id === 1 ? 2:1;
        this.state.currentPlayer2 = "dupa";
        console.log(currentPlayer);

        // console.log(
        //   "this is the updated current player ID: " + App.state.currentPlayerID
        // );
      });
    });
  },
};

window.addEventListener("load", App.init);
