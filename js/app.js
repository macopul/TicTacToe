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
			{ id: 1, clickedSquares: [], name: "Player 1" },
			{ id: 2, clickedSquares: [], name: "Player 2" },
		],

		currentPlayer: null,
	},

	setCurrentPlayer(player) {
		this.state.currentPlayer = player;
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

		for (let pattern of winningPatterns) {
			const winDetected = pattern.every((square) =>
				currentPlayer.clickedSquares.includes(square)
			);
			if (winDetected) {
				alert(`wins : ${currentPlayer.name}`);
				break;
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
				const players = App.state.Players;
				const currentPlayer = App.state.currentPlayer;
				const allClickedSquares = [
					...players[0].clickedSquares,
					...players[1].clickedSquares,
				];

				if (allClickedSquares.includes(+square.id)) {
					return;
				}

				const icon = document.createElement("i");
				const classNames = {
					1: ["fa-x", "yellow"],
					2: ["fa-o", "turquoise"],
				};

				icon.classList.add("fa-solid", ...classNames[currentPlayer.id]);
				square.replaceChildren(icon);

				currentPlayer.clickedSquares.push(+square.id);

				App.getGameStatus();

				App.state.currentPlayer =
					currentPlayer === players[0] ? players[1] : players[0];
			});
		});
	},
};

window.addEventListener("load", App.init);
