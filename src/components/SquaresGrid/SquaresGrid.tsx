import { useState } from "react";
import "./SquaresGrid.css";
import classNames from "classnames";

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

export default function SquaresGrid() {

  const squareIcons = ['fa-x turquoise', 'fa-o yellow']

  const [icon, setIcon] = useState(squareIcons[1])

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
        return (
          <div key={squareId} className="square shadow">
            <i className= {classNames('fa-solid', icon)}></i>
          </div>
        );
      })}
    </>
  );
}
