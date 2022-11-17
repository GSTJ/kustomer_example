import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  useEffect(() => {
    // Resize Kustomer's iframe after initialization.
    window.Kustomer.initialize({}, (context) => {
      if (context) {
        window.Kustomer.resize();
      }
    });
  });

  return <div>Hello world!</div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
