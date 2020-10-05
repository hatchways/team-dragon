import React from "react";
import { useHostId } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import ProfileBar from "../ProfileBar";

const GameBar = (props) => {
  const classes = useStyles(props);
  const [hostId] = useHostId();
  const userId = window.localStorage.getItem("id");

  return (
    <nav className={classes.NavBar}>
      <Box className={classes.NavBarWrap}>
        <Typography className={classes.Brand} variant="h3">
          <Link to="/">Cluewords</Link>
        </Typography>
        <Box className={classes.Scoreboard}>
          <Box className={classes.BlueTeam}>
            <Box>
              <Typography className={classes.SpyMasterText} variant="body1">
                SpyMaster - {props.teamList.blue.spyMaster}
              </Typography>
            </Box>
            {props.teamList.blue.guesser.map((player, i) => (
              <Typography key={i}>{player}</Typography>
            ))}
          </Box>
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
          <Box className={classes.RedTeam}>
            <Box>
              <Typography className={classes.SpyMasterText} variant="body1">
                SpyMaster - {props.teamList.red.spyMaster}
              </Typography>
            </Box>
            {props.teamList.red.guesser.map((player, i) => (
              <Typography key={i}>{player}</Typography>
            ))}
          </Box>
        </Box>
        <Box className={classes.BarControls}>
          {userId === hostId && (
            <Button
              className={classes.EndGameButton}
              variant="contained"
              size="large"
              onClick={props.stopGame}
              disabled={props.gameStatus === "over"}
            >
              End Game
            </Button>
          )}
          <Button
            className={classes.NewGameButton}
            variant="contained"
            color="primary"
            size="large"
          >
            New Game
          </Button>
          <ProfileBar />
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
