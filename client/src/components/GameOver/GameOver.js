import React from "react";
import { Button, Paper, Box } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { useGameStatus } from "../../contexts/GameContext";
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
  }),
);

const GameOver = () => {
  const [gameStatus, setGameStatus] = useGameStatus();
  const [hostId] = useHostId();
  const classes = useStyles();
  const { popUpWindow, container } = classes;

  const handleNewGame = () => {
    //Reset Game
  };

  return (
    <>
      <Box className={container}>
        <Paper className={popUpWindow}>
          <h1>Content</h1>
          {localStorage.getItem("id") === hostId && (
            <Button onClick={handleNewGame}>New Game</Button>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default GameOver;
