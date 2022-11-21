import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import AppContainer from "./AppContainer";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
