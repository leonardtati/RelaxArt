import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./Components/App";

import configureStore from "./store";
import SignInProvider from "../src/Components/SignInContext";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <SignInProvider>
      <App />
    </SignInProvider>
  </Provider>,
  document.getElementById("root")
);
