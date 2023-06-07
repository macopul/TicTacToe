import "./Modal.css";

export default function Modal() {
  return (
    <div className="modal hidden">
      <div className="modal-contents">
        <p>Player 1 wins!</p>
        <button>Play again</button>
      </div>
    </div>
  );
}
