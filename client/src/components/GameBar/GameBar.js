import React from "react";
import { useHostId } from "../../contexts/DataContext";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import ProfileBar from "../ProfileBar";
import PlayAgain from "../PlayAgain";

const GameBar = (props) => {
  const classes = useStyles(props);
  const [hostId] = useHostId();
  const [user] = useUser();

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
            <Typography variant="h3">-</Typography>
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
          {user.id === hostId && (
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
          <ProfileBar history={props.history} />
        </Box>
      </Box>
    </nav>
  );
};

GameBar.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  currentTurn: PropTypes.string.isRequired,
  redScore: PropTypes.number.isRequired,
  blueScore: PropTypes.number.isRequired,
  stopGame: PropTypes.func.isRequired,
  isSpyMaster: PropTypes.bool.isRequired,
  teamList: PropTypes.object.isRequired,
};

export default GameBar;
