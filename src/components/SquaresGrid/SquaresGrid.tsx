import { useState } from "react";
import "./SquaresGrid.css";
import classNames from "classnames";
import { DerivedGame, DerivedGameStats } from "../../../ts/store";
import { derivedGame } from "../../App";
import { GameState, Move } from "../../../ts/type";

// export default function SquaresGrid() {
//   return (
//     <>
//       <div id="1" className="square shadow" data-id="square"></div>
//       <div id="2" className="square shadow" data-id="square"></div>
//       <div id="3" className="square shadow" data-id="square"></div>
//       <div id="4" className="square shadow" data-id="square"></div>
//       <div id="5" className="square shadow" data-id="square"></div>
//       <div id="6" className="square shadow" data-id="square"></div>
//       <div id="7" className="square shadow" data-id="square"></div>
//       <div id="8" className="square shadow" data-id="square"></div>
//       <div id="9" className="square shadow" data-id="square"></div>
//     </>
//   );
// }

export default function SquaresGrid({ game, onPlay }) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
        const existingMove = game.moves.find(
          (move) => move.squareId === squareId
        );

        return (
          <div
            key={squareId}
            className="square shadow"
            onClick={() => onPlay(squareId, game.currentPlayer)}
          >
            {existingMove && (
              <i
                className={classNames(
                  "fa-solid",
                  existingMove.player.colorClass,
                  existingMove.player.iconClass
                )}
              ></i>
            )}
          </div>
        );
      })}
    </>
  );
}
