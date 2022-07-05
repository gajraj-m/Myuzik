import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContext"

// ReactDOM.render(<App/>, document.getElementById("root")); // deprecated
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);