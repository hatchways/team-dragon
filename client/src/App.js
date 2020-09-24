import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { GameProvider } from "./contexts/GameContext";
import { theme } from "./themes/theme";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GameSetup from "./pages/GameSetup";

function App() {
  return (
    <DataProvider>
      <GameProvider>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/:id" component={GameSetup} />
              <Route path="/" component={Landing} />
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
      </GameProvider>
    </DataProvider>
  );
}

export default App;
