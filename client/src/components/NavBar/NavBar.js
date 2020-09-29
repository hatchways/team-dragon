import React from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useGameStatus } from "../../contexts/GameContext";
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  const [gameStatus] = useGameStatus();

  if (gameStatus !== "running") {
    return (
      <nav className={classes.NavBar}>
        <Box className={classes.NavBarWrap}>
          <Typography className={classes.Brand} variant="h3">
            <Link to="/">Cluewords</Link>
          </Typography>
        </Box>
      </nav>
    );
  } else {
    return null;
  }
};

export default NavBar;
