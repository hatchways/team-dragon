import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const GameBar = (props) => {
  const classes = useStyles(props);

  return (
    <nav className={classes.NavBar}>
      <Box className={classes.NavBarWrap}>
        <Typography className={classes.Brand} variant="h3">
          <Link to="/">Cluewords</Link>
        </Typography>
        <Box className={classes.Scoreboard}>
          <Box className={classes.BlueScore}>
            <Typography variant="h3">{props.blueScore}</Typography>
            <Typography>Blue Team</Typography>
          </Box>
          <Box display="flex" justifyContent="center" padding={"0 10px"}>
            <Typography variant="h2">-</Typography>
          </Box>
          <Box className={classes.RedScore}>
            <Typography variant="h3">{props.redScore}</Typography>
            <Typography>Red Team</Typography>
          </Box>
        </Box>
        
        <Box className={classes.BarControls}>
        <Button
            className={classes.EndGameButton}
            variant="contained"
            size="large"
            onClick={props.endGame}
          >
            End Game
          </Button>
          <Button
            className={classes.NewGameButton}
            variant="contained"
            color="primary"
            size="large"
          >
            New Game
          </Button>
          <Box className={classes.Profile}>
            <Avatar>U</Avatar>
            <Button>
              <Typography>My Profile</Typography>
              <Icon>arrow_drop_down</Icon>
            </Button>
          </Box>
        </Box>
      </Box>
    </nav>
  );
};

GameBar.propTypes = {
  currentTurn: PropTypes.string.isRequired,
  redScore: PropTypes.number.isRequired,
  blueScore: PropTypes.number.isRequired,
};

export default GameBar;
