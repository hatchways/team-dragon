import React from "react";
import { Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import socket from "../../socket";
import useStyles from "./styles";

const PlayAgain = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  const gameId = params.id;
  const handleNewGame = () => {
    socket.emit("play-again", gameId);
    history.push(`/${gameId}`);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleNewGame}
      className={classes.playAgainButton}
    >
      Play again
    </Button>
  );
};

export default PlayAgain;
