import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DrizzleProvider } from "./drizzle/drizzleContext";
import { Provider as ReduxProvider } from "react-redux";
import drizzleOptions from "./drizzle/drizzleOptions";
import { Drizzle } from "@drizzle/store";
import LoadingContainer from "./components/LoadingContainer";


import store from './middleware'

const drizzle = new Drizzle(drizzleOptions, store);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={drizzle.store}>
      <DrizzleProvider drizzle={drizzle}>
        <LoadingContainer>
          <App />
        </LoadingContainer>
      </DrizzleProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
