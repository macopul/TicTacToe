import { Player } from "../../../ts/type";
import "./TurnIndicator.css";

type TurnIndicatorProps = {
  currentPlayer: Player;
};

export default function TurnIndicator({ currentPlayer }: TurnIndicatorProps) {
  return (
    <div  className="turn" data-id="turn">
      <i key={Math.random()}
        className={[
          currentPlayer.iconClass,
          currentPlayer.colorClass,
          "fa-solid",
        ].join(" ")}
      ></i>
      <p className={currentPlayer.colorClass}>
        Player {currentPlayer.id}, you're up!
      </p>
    </div>
  );
}
