import React from "react";
import ReactDOM from "react-dom";

import App from "./Components/App/App";

import SignInProvider from "../src/Components/SignIn/SignInContext";

ReactDOM.render(
  <SignInProvider>
    <App />
  </SignInProvider>,
  document.getElementById("root")
);
