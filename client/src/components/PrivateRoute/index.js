import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user] = useUser();
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
