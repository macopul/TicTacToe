import "../css/index.css";
import Footer from "./components/Footer/Footer";
import Menu from "./components/Menu/Menu";
import Modal from "./components/Modal/Modal";
import SquaresGrid from "./components/SquaresGrid/SquaresGrid";
import Stats from "./components/Stats/Stats";
import TurnIndicator from "./components/TurnIndicator/TurnIndicator";

export default function App() {
  return (
    <>
      <div className="grid" data-id="grid">
        <TurnIndicator />
        <Menu onAction={(action) => console.log(action)} />
        <SquaresGrid />
        <Stats />
      </div>
      <Footer />
      <Modal />
    </>
  );
}
