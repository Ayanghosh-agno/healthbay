import React from "react";
import ReactDOM from "react-dom";

import Router from "./Router";
import AuthProvider from "./contexts/AuthContext";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
