import React, { useState } from "react";
import {Button} from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";
import socket from "../../socket";

const PlayAgain = (props) => {
  const history = useHistory();
  const params = useParams();
  // const handleNewGame = () => {
  //   history.push("/")
  // }
  const gameId = params.id;
  const handleNewGame = () => {
    socket.emit("play-again",gameId);
    history.push(`/${gameId}`);
  }

  return (<Button
    variant="contained"
    color="primary"
    onClick={handleNewGame}
    // className={newGameButton}
  >
    Play again
  </Button>);
    
};


export default PlayAgain;
