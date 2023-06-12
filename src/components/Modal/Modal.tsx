import "./Modal.css";

type ModalProps = {
  message : string;
  onClick():void;
}

export default function Modal({message, onClick}:ModalProps) {
  return (
    <div className="modal">
      <div className="modal-contents">
        <p>{message}</p>
        <button onClick={onClick}>Play again</button>
      </div>
    </div>
  );
}
