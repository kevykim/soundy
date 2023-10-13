import React from "react";
import { createRoot } from "react-dom/client";
import Root from "./root";
import "./index.css";

// Get the root element by its id, if it exists
const rootElement = document.getElementById("root");

if (rootElement) {
  const main = createRoot(rootElement);

  main.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
} else {
  // Handle the case where the root element does not exist
  console.error("Root element with id 'root' not found.");
}
