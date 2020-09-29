import React from "react";
import { Button, Paper, Box, Typography, Grid } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
// import { useGameStatus } from "../../contexts/GameContext";
import { useHostId } from "../../contexts/DataContext";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    popUpWindow: {
      position: "fixed",
      width: "50%",
      height: "50%",
      top: "25%",
      left: "25%",
      zIndex: "10",
    },
    container: {
      background: fade(theme.grey.mediumDark, 0.8),
      position: "fixed",
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
        padding: ".7rem 2.4rem"
    }
  }),
);

const GameOver = () => {
  //   const [gameStatus, setGameStatus] = useGameStatus();
  const [hostId] = useHostId();
  const classes = useStyles();
  const {
    popUpWindow,
    container,
    content,
    skullIcon,
    gameOverText,
    redWins,
    blueWins,
    newGameButton
  } = classes;

  const handleNewGame = () => {
    //Reset Game
  };

  const blueScore = "6";
  const redScore = "6";

  let winner = "blue";

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
        return <Typography variant="h3">Tie game</Typography>;
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
            <Box>{winnerText(winner)}</Box>
            <Box my={3}>
              <Typography variant="h3">
                <Typography variant="span" className={blueWins}>
                  {blueScore}
                </Typography>
                <Typography variant="span"> : </Typography>
                <Typography variant="span" className={redWins}>
                  {redScore}
                </Typography>
              </Typography>
            </Box>
            <Box>
              {localStorage.getItem("id") === hostId && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNewGame}
                  className={newGameButton}
                >
                  New Game
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default GameOver;
