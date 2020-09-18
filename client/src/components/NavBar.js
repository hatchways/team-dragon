import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "12vh",
    background: theme.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  brand: {
    textTransform: "uppercase",
    letterSpacing: "0.6rem",
    "& a": {
      textDecoration: "none",
      color: "black",
    }
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}> 
      <h1 className={classes.brand}>
        <Link to="/">Cluewords</Link>
      </h1>
    </header>
  );
}

export default NavBar;
