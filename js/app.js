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
