export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs('[data-id="menu"]');
    this.$.menuBtn = this.#qs('[data-id="menu-btn"]');
    this.$.menuItems = this.#qs('[data-id="menu-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
    this.$.modal = this.#qs('[data-id="modal"]');
    this.$.modalText = this.#qs('[data-id="modal-text"]');
    this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
    this.$.turn = this.#qs('[data-id="turn"]');
    this.$.p1wins = this.#qs(`[data-id="p1-wins"]`);
    this.$.p2wins = this.#qs(`[data-id="p2-wins"]`);
    this.$.ties = this.#qs(`[data-id="ties"]`);

    this.$$.squares = this.#qsAll('[data-id="square"]');

    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  bindGamesResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  updatesScoreBoard(p1wins, p2wins, ties) {
    this.$.p1wins.innerText = `${p1wins} wins`;
    this.$.p2wins.innerText = `${p2wins} wins`;
    this.$.ties.innerText = `${ties} ties`;
  }

  openModal(winner) {
    this.$.modal.classList.remove("hidden");
    if (winner) {
      this.$.modalText.innerText = `${winner.name} win!`;
      return;
    }
    this.$.modalText.innerText = "Tie !";
  }

  clearAllSquares() {
    this.$$.squares.forEach((square) => square.replaceChildren());
  }

  loadExistingMoves(moves) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId === square.id);
      if (existingMove) {
        this.handlePlayerMove(square, existingMove.player);
      }
    });
  }

  closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  setTurnIndicator(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you are up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector, parent) {
    const el = parent
      ? parent.querySlector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error("Could nont find elements");

    return el;
  }

  #qsAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("could not find elements");

    return elList;
  }
}
