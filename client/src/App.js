import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { GameProvider } from "./contexts/GameContext";
import { UserProvider } from "./contexts/UserContext";
import { theme } from "./themes/theme";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GameSetup from "./pages/GameSetup";
import ProfileSettings from "./pages/ProfileSettings";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <DataProvider>
      <GameProvider>
        <UserProvider>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <NavBar />
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={ProfileSettings} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/:id" component={GameSetup} />
                <Route path="/" component={Landing} />
              </Switch>
            </BrowserRouter>
          </MuiThemeProvider>
        </UserProvider>
      </GameProvider>
    </DataProvider>
  );
}

export default App;
