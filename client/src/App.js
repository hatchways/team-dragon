import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GameSetup from "./pages/GameSetup";
import ProfileSettings from "./pages/ProfileSettings";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/edit-profile" component={ProfileSettings} />
        <PrivateRoute exact path="/:id" component={GameSetup} />
        <Route exact path="/" component={Landing} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
