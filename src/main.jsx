import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import marcFavicon from "./assets/images/marc.png";

const favicon = document.getElementById("app-favicon");

if (favicon) {
  favicon.setAttribute("href", marcFavicon);
  favicon.setAttribute("type", "image/png");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
