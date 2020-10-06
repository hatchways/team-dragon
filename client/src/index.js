import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core";
import { DataProvider } from "./contexts/DataContext";
import { GameProvider } from "./contexts/GameContext";
import { UserProvider } from "./contexts/UserContext";
import { theme } from "./themes/theme";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <DataProvider>
    <GameProvider>
      <UserProvider>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </UserProvider>
    </GameProvider>
  </DataProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
