import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <LayoutProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LayoutProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
