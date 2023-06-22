import { Player } from '../../../ts/type';
import './TurnIndicator.css'

type TurnIndicatorProps = {
  currentPlayer: Player
}

export default function TurnIndicator ({currentPlayer}: TurnIndicatorProps) {
  return (
    <div className="turn" data-id="turn">
      <i className={[currentPlayer.iconClass, currentPlayer.colorClass].join(' ')}></i>
      <p className={currentPlayer.colorClass}>Player 1, you're up!</p>
    </div>
  );
}