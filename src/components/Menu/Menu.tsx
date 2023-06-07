import { useState } from "react";
import classNames from 'classnames'
import "./Menu.css";

type Props = {
  onAction(action: "reset" | "new-round"): void;
};

// function onAction(action: "reset" | "new-round");

export default function Menu({ onAction }: Props) {
  
  const [menuOpen, setMenuOpen] = useState(false);

  if(menuOpen) {
    console.log('menu opened')
  }

  return (
    <div className="menu">
      <button className="menu-btn" onClick={() => setMenuOpen((prev) => !prev)}>
        Actions
        <i
          className={classNames(
            menuOpen ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"
          )}
        ></i>
      </button>

      {menuOpen && (
        <div className="items border">
          <button onClick={() => onAction("reset")}>Reset</button>
          <button onClick={() => onAction("new-round")}>New Round</button>
        </div>
      )}
    </div>
  );
}
