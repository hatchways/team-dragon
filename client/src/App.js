import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DataProvider } from "./DataContext";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import NavBar from "./components/NavBar";

import "./App.css";
import NewGame from "./pages/NewGame";

function App() {
  return (
    <DataProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/new" component={NewGame} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </DataProvider>
  );
}

export default App;
