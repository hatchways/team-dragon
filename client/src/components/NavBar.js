import React from "react";
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
  }
}));

function NavBar(props) {
  const classes = useStyles();

  return (
    <header className={classes.root}> 
      <h1 className={classes.brand}>Cluewords</h1>
    </header>
  );
}

export default NavBar;
