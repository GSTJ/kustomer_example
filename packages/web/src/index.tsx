import "./i18n";
import "./index.css";

import React from "react";

import AppContainer from "./AppContainer";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
