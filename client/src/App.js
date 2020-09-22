import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DataProvider } from "./DataContext";
import { theme } from "./themes/theme";

import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import NewGame from "./pages/NewGame";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GameSetup from "./components/GameSetup";
import Match from "./pages/Match";
import CreateGameForm from "./components/CreateGameForm"; //testing request /create-match

function App() {
  return (
    <DataProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/create-match" component={CreateGameForm} />
            <Route exact path="/match/:id" component={Match} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/match/:id" component={GameSetup} />
            <Route exact path="/:id" component={NewGame} />
            <Route path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </DataProvider>
  );
}

export default App;
