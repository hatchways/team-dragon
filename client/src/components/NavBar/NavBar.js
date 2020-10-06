import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useGameStatus } from "../../contexts/GameContext";

import useStyles from "./styles";

import ProfileBar from "../ProfileBar";

const NavBar = (props) => {
  const classes = useStyles();

  // Contexts
  const [gameStatus] = useGameStatus();

  if (gameStatus === "setup") {
    return (
      <nav className={classes.NavBar}>
        <Box className={classes.NavBarWrap}>
          <Typography className={classes.Brand} variant="h3">
            <Link to="/">Cluewords</Link>
          </Typography>
          <ProfileBar history={props.history} />
        </Box>
      </nav>
    );
  } else {
    return null;
  }
};

export default withRouter(NavBar);
