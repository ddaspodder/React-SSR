import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import BrowserRouter from "./router/BrowserRouter";

hydrateRoot(
  document.getElementById("root"),
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
