import type { Game, Move, Player } from "./type";
import type Store from "./store";

export default class View {
  $: Record<string, Element> = {};
  $$: Record<string, NodeListOf<Element>> = {};

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
    this.$.grid = this.#qs('[data-id="grid"]');

    this.$$.squares = this.#qsAll('[data-id="square"]');

    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  bindGamesResetEvent(handler: EventListener) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler: EventListener) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler: (el: Element)=> void) {
    this.#delegate(this.$.grid, '[data-id= "square"]', "click", handler);
  }

  render(game: Store["game"], stats: Store["stats"]) {
    const { playersWithWins, ties } = stats;

    const {
      moves,
      currentPlayer,
      status: { isComplete, winner },
    } = game;

    this.#closeModal();
    this.#clearAllSquares();
    this.#updatesScoreBoard(
      playersWithWins[0].wins,
      playersWithWins[1].wins,
      ties
    );
    this.#loadExistingMoves(moves);

    if (isComplete) {
      this.#openModal(winner);
      return;
    }
    this.#setTurnIndicator(currentPlayer);
  }

  #updatesScoreBoard(p1wins: number, p2wins: number, ties: number) {
    this.$.p1wins.textContent = `${p1wins} wins`;
    this.$.p2wins.textContent = `${p2wins} wins`;
    this.$.ties.textContent = `${ties} ties`;
  }

  #openModal(winner: Player | null) {
    this.$.modal.classList.remove("hidden");
    if (winner) {
      this.$.modalText.textContent = `${winner.name} win!`;
      return;
    }
    this.$.modalText.textContent = "Tie !";
  }

  #clearAllSquares() {
    this.$$.squares.forEach((square) => square.replaceChildren());
  }

  #loadExistingMoves(moves: Move[]) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId === +square.id);
      if (existingMove) {
        this.handlePlayerMove(square, existingMove.player);
      }
    });
  }

  #closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");
  }

  handlePlayerMove(squareEl: Element, player: Player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  #setTurnIndicator(player: Player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you are up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  #qs(selector: string, parent?: Element) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error("Could nont find elements");

    return el;
  }

  #qsAll(selector: string) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("could not find elements");

    return elList;
  }

  #delegate(
    el: Element,
    selector: string,
    eventKey: string,
    handler: (el: Element) => void
  ) {
    el.addEventListener(eventKey, (event) => {
      if (!(event.target instanceof Element)) {
        throw new Error("Event target not found");
      }

      if (event.target.matches(selector)) {
        handler(event.target);
      }
    });
  }
}
