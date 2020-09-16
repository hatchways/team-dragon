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

function App() {
  return (
    <DataProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new" component={NewGame} />
            <Route path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </DataProvider>
  );
}

export default App;
