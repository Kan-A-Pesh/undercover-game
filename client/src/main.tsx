import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./router.tsx";

import "./index.css";
import "./assets/fonts/index.css";
import Debug from "./debug/index.tsx";
import SocketListeners from "./socket/listeners.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router />
    <SocketListeners />
    <Debug />
  </StrictMode>,
);
