import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "@generouted/react-router";
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement as HTMLElement)?.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
