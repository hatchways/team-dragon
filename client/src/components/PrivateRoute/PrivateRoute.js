import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

// Show the component only when the user is logged in
// Otherwise, redirect the user to /login page
const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user] = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login?redirect=${props.location.pathname}`} />
        )
      }
    />
  );
};

export default PrivateRoute;
