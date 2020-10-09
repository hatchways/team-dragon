import React, { useEffect, useState } from "react";
import { useGameStatus } from "../contexts/GameContext";
import { useHostId, useNewGame } from "../contexts/DataContext";
import { useUser } from "../contexts/UserContext";
import {
  useSnackbarOpen,
  useSnackbarMessage,
} from "../contexts/SnackbarContext";
import NewGame from "../components/new game/NewGame";
import WaitingRoom from "../components/new game/WaitingRoom";
import Game from "./Game";
import socket from "../socket";
import Messenger from "../components/Messenger";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Typography, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  WaitingRoom: {
    width: "100%",
    height: "88vh",
    display: "grid",
    gridTemplateColumns: "400px 1fr",
    gridTemplateRows: "auto",
  },
}));

const GameSetup = (props) => {
  const classes = useStyles();
  const [gameStatus, setGameStatus] = useGameStatus();
  const [, setSnackbarOpen] = useSnackbarOpen();
  const [, setSnackbarMessage] = useSnackbarMessage();
  const [hostId] = useHostId();
  const [messages, setMessages] = useState([]);
  const [, setNewGame] = useNewGame();
  const [user] = useUser();
  const gameId = props.match.params.id;

  // When host ends the game and clicks play again button, this socket fetches the reset version fo the same game with the same players
  useEffect(() => {
    socket.on("play-again", (currentGame) => {
      console.log("Play-again:", currentGame.players);
      setGameStatus(currentGame.gameStatus);
      setNewGame(1);
    });
  }, [setGameStatus, setNewGame]);

  // Fetches the game status to update the component according to the gameStatus
  useEffect(() => {
    socket.on("error", () => {
      setSnackbarMessage("Game does not exist!");
      setSnackbarOpen(true);
      props.history.push("/");
    });
  }, [props.history, setSnackbarMessage, setSnackbarOpen]);

  useEffect(() => {
    //Shows players now assigned on teams and roles, ALSO - change gameStatus now === "running"
    socket.on("update-roles", (game) => {
      console.log("socket-on-update-roles", game);
      setGameStatus(game.gameStatus);
    });
  }, [gameStatus, setGameStatus]);

  useEffect(() => {
    socket.on("new-message", (recv) => {
      setMessages((prevMessages) => [...prevMessages, recv]);
    });
  }, []);

  //Send message event
  const sendMessage = (msg) => {
    const msgData = {
      sender: user.name,
      message: msg,
    };

    // send message to the server
    socket.emit("message", {
      gameId,
      msgData,
    });
  };

  const gameJourney = () => {
    if (user.id === hostId) {
      return <NewGame value={props} />;
    } else {
      return <WaitingRoom value={props} />;
    }
  };

  return (
    <div className={classes.WaitingRoom}>
      {gameStatus === "setup" ? (
        <Messenger messages={messages} sendMessage={sendMessage} name={name} />
      ) : null}
      <div>{gameStatus === "setup" ? gameJourney() : <Game {...props} />}</div>
    </div>
  );
};

export default GameSetup;
