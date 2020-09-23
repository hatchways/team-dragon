import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();

  return (
    <nav className={classes.navBar}>
      <Box className={classes.navBarWrap}>
        <Typography className={classes.brand} variant="h3">
          <Link to="/">Cluewords</Link>
        </Typography>
      </Box>
    </nav>
  );
};

export default NavBar;
