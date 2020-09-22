import React from "react";
import { withRouter, matchPath } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import BrandBar from "./BrandBar";
import MatchBar from "./MatchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "12vh",
    background: theme.white,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  const inMatch = matchPath(props.location.pathname, {
    path: "/match/:id",
  });

  return (
    <nav className={classes.root}>{inMatch ? <MatchBar /> : <BrandBar />}</nav>
  );
};

export default withRouter(NavBar);
