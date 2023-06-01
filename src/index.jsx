import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./css/index.css"

// import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <h1>Some text</h1>
    <p>Paragraf</p>
  </StrictMode>
);  