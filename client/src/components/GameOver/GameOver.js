import React from "react";
import PropTypes from "prop-types";
import { Paper, Box, Typography } from "@material-ui/core";
import { useHostId } from "../../contexts/DataContext";
import { useUser } from "../../contexts/UserContext";
import PlayAgain from "../PlayAgain";
import useStyles from "./styles";

const GameOver = (props) => {
  const [hostId] = useHostId();
  const [user] = useUser();
  const classes = useStyles(props);
  const {
    popUpWindow,
    container,
    content,
    skullIcon,
    gameOver,
    gameOverText,
    redScore,
    blueScore
  } = classes;

  return (
    <>
      <Box className={container}>
        <Paper className={popUpWindow}>
          <Box className={content}>
            <img
              className={skullIcon}
              src="/skull-and-crossbones.png"
              alt="game-over-icon"
            />
            <Box my={3}>
              <Typography className={gameOver} variant="h3" align="center">
                Game over!
              </Typography>
              {props.endGame.winner !== "No" && (
                <Typography variant="body1" align="center">
                  {props.endGame.gameOverText}
                </Typography>
              )}
            </Box>
            <Box>
              {props.endGame.winner !== "No" ? (
                <Typography variant="h3" className={gameOverText}>
                  {props.endGame.winner} wins
                </Typography>
              ) : (
                <Typography variant="h3">
                  {props.endGame.gameOverText}
                </Typography>
              )}
            </Box>
            <Box my={3}>
              <Typography variant="h3">
                <Box variant="span" display="inline" className={blueScore}>
                  {props.blueScore.toString()}
                </Box>{" "}
                :{" "}
                <Box variant="span" display="inline" className={redScore}>
                  {props.redScore.toString()}
                </Box>
              </Typography>
            </Box>
            <Box>{user.id === hostId && <PlayAgain />}</Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
GameOver.propTypes = {
  redScore: PropTypes.number.isRequired,
  blueScore: PropTypes.number.isRequired,
};

export default GameOver;
