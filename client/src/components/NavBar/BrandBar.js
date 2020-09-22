import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "90%",
    height: "100%",
    margin: "0 auto",
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
    },
  },
}));

const BrandBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.brand} variant="h3">
        <Link to="/">Cluewords</Link>
      </Typography>
    </div>
  );
};

export default BrandBar;
