import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { GameProvider } from "./contexts/GameContext";
import { theme } from "./themes/theme";
import withNav from "./hocs/withNav";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GameSetup from "./pages/GameSetup";
import Game from "./pages/Game";

function App() {
  return (
    <DataProvider>
      <GameProvider>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/register" component={withNav(Register)} />
              <Route exact path="/login" component={withNav(Login)} />
              <Route exact path="/:id" component={withNav(GameSetup)} />
              <Route exact path="/game/:id" component={Game} />
              <Route path="/" component={withNav(Landing)} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </GameProvider>
    </DataProvider>
  );
}

export default App;
