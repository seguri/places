import React from "react";
import { createRoot } from "react-dom/client";
import Places from "./Places.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Places />
  </React.StrictMode>,
);
