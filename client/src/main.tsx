import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Router from "./router.tsx";

import "./index.css";
import "./assets/fonts/index.css";
import Debug from "./debug/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
      <Debug />
    </Provider>
  </StrictMode>,
);
