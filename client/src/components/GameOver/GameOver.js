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
    gameOverText: {
      fontSize: "1.5rem",
    },
    blueWins: {
      color: theme.blue.medium,
    },
    redWins: {
      color: theme.red.medium,
    },
    newGameButton: {
      padding: ".7rem 2.4rem",
    },
  }),
);

const GameOver = (props) => {
  const [hostId] = useHostId();
  const userId = window.localStorage.getItem("id");
  const classes = useStyles();
  const {
    popUpWindow,
    container,
    content,
    skullIcon,
    gameOverText,
    redWins,
    blueWins,
    newGameButton,
  } = classes;

  const handleNewGame = () => {
    //Reset Game
  };

  const winnerText = (winner) => {
    switch (winner) {
      case "red":
        return (
          <Typography variant="h3" className={redWins}>
            Red wins
          </Typography>
        );
      case "blue":
        return (
          <Typography variant="h3" className={blueWins}>
            Blue wins
          </Typography>
        );
      default:
        return;
    }
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
              <Typography className={gameOverText} variant="h3">
                Game over!
              </Typography>
            </Box>
            <Box>{winnerText(props.winner)}</Box>
            <Box my={3}>
              <Typography variant="h3">
                <Box variant="span" display="inline" className={blueWins}>
                  {props.blueScore.toString()}
                </Box>{" "}
                :{" "}
                <Box variant="span" display="inline" className={redWins}>
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
  winner: PropTypes.string.isRequired,
  redScore: PropTypes.number.isRequired,
  blueScore: PropTypes.number.isRequired,
};

export default GameOver;
