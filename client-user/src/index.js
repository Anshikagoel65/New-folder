import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LocationProvider } from "./context/LocationContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <LocationProvider>
      <App />
    </LocationProvider>
  </AuthProvider>
);
