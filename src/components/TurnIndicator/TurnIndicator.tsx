import './TurnIndicator.css'

export default function TurnIndicator () {
  return (
    <div className="turn" data-id="turn">
      <i className="fa-solid fa-x turquoise"></i>
      <p className="turquoise">Player 1, you're up!</p>
    </div>
  );
}