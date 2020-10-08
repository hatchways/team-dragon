import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import GlobalSnackbar from "./components/GlobalSnackbar";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GameSetup from "./pages/GameSetup";
import ProfileSettings from "./pages/ProfileSettings";
import { useUser } from "./contexts/UserContext";
import Cookies from "js-cookie";

const App = () => {
  const [, setUser] = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // check if token already set, if so assign user data to context
    const token = Cookies.get("token");

    if (token !== undefined) {
      const decoded = decode(token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        profileImageLocation: decoded.profileImageLocation,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }

    setIsLoading(false);
  }, [setUser]);

  return (
    !isLoading && (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/edit-profile"
            component={ProfileSettings}
          />
          <PrivateRoute exact path="/:id" component={GameSetup} />
          <Route exact path="/" component={Landing} />
        </Switch>
        <GlobalSnackbar />
      </BrowserRouter>
    )
  );
};

export default App;
