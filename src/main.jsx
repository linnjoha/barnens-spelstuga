import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Lasa from "./pages/Lasa.jsx";
import Skriva from "./pages/Skriva.jsx";
import Rakna from "./pages/Rakna.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Rita from "./pages/Rita.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lasa" element={<Lasa />} />
        <Route path="/rakna" element={<Rakna />} />
        <Route path="/rita" element={<Rita />} />
        <Route path="/skriva" element={<Skriva />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
