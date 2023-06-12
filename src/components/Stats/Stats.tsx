import { GameStats } from '../../../ts/type';
import './Stats.css'

type StatsProps = {
  stats : GameStats
}

export default function Stats({stats} : StatsProps) {
  return (
    <>
      <div
        className="score shadow"
        style={{ backgroundColor: "var(--turquoise)" }}
      >
        <p>Player 1</p>
        <span data-id="p1-wins">{stats.playersWithWins[0].wins} Wins</span>
      </div>
      <div
        className="score shadow"
        style={{ backgroundColor: "var(--light-gray)" }}
      >
        <p>Ties</p>
        <span data-id="ties">{stats.ties}</span>
      </div>
      <div
        className="score shadow"
        style={{ backgroundColor: "var(--yellow)" }}
      >
        <p>Player 2</p>
        <span data-id="p2-wins">{stats.playersWithWins[1].wins} Wins</span>
      </div>
    </>
  );
}
