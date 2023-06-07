import './Stats.css'

export default function Stats() {
  return (
    <>
      <div
        className="score shadow"
        style={{ backgroundColor: "var(--turquoise)" }}
      >
        <p>Player 1</p>
        <span data-id="p1-wins">0 Wins</span>
      </div>
      <div
        className="score shadow"
        style={{ backgroundColor: "var(--light-gray)" }}
      >
        <p>Ties</p>
        <span data-id="ties">0</span>
      </div>
      <div
        className="score shadow"
        style={{ backgroundColor: "var(--yellow)" }}
      >
        <p>Player 2</p>
        <span data-id="p2-wins">0 Wins</span>
      </div>
    </>
  );
}
