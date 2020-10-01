import React from "react";
import PropTypes from "prop-types";
import { Button, Paper, Box, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { useHostId } from "../../contexts/DataContext";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    popUpWindow: {
      position: "absolute",
      minWidth: "400px",
      maxWidth: "500px",
      height: "50%",
      minHeight: "400px",
      left: "50%",
      top: "40%",
      transform: "translate(-50%, -50%)",
      zIndex: "10",
    },
    container: {
      background: fade(theme.grey.mediumDark, 0.8),
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "5",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    skullIcon: {
      width: "15%",
    },
    gameOver: {
      fontSize: "1.5rem",
      marginBottom: ".8rem"
    },
    gameOverText: (props) => ({
      color:
        props.endGame.winner === "Blue" ? theme.blue.medium : theme.red.medium,
    }),
    redScore: {
      color: theme.red.medium,
    },
    blueScore: {
      color: theme.blue.medium,
    },
    newGameButton: {
      padding: ".7rem 2.4rem",
    },
  }),
);

const GameOver = (props) => {
  const [hostId] = useHostId();
  const userId = window.localStorage.getItem("id");
  const classes = useStyles(props);
  const {
    popUpWindow,
    container,
    content,
    skullIcon,
    gameOver,
    gameOverText,
    redScore,
    blueScore,
    newGameButton,
  } = classes;
console.log('props.endGame.winner', props.endGame.winner)
  const handleNewGame = () => {
    //Reset Game
  };

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
              <Typography variant="body1"  align="center">
              {props.endGame.gameOverText}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h3"
                className={
                  props.endGame.winner !== "none" ? gameOverText : null
                }
              >
                {props.endGame.winner} team wins
              </Typography>
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
            <Box>
              {userId === hostId && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNewGame}
                  className={newGameButton}
                >
                  Play again
                </Button>
              )}
            </Box>
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
