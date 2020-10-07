import React, { useEffect, useState } from "react";
import { useGameStatus } from "../contexts/GameContext";
import { useHostId } from "../contexts/DataContext";
import NewGame from "../components/new game/NewGame";
import WaitingRoom from "../components/new game/WaitingRoom";
import Game from "./Game";
import socket from "../socket";
import Messenger from "../components/Messenger";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  WaitingRoom: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "400px 1fr",
    gridTemplateRows: "auto",
  },
}));

const GameSetup = (props) => {
  const classes = useStyles();
  const [gameStatus, setGameStatus] = useGameStatus();
  const [hostId] = useHostId();
  const name = localStorage.getItem("name");
  const [messages, setMessages] = useState([]);
  const gameId = props.match.params.id;

  useEffect(() => {
    socket.on("play-again", (currentGame) => {
      console.log("Play-again:", currentGame.players);
      setGameStatus(currentGame.gameStatus);
    });
  }, [setGameStatus]);

  useEffect(() => {
    socket.emit("fetch-game", { gameId });

    socket.on("fetch-game", (currentGame) => {
      console.log("Updated game:", currentGame.gameStatus);
      setGameStatus(currentGame.gameStatus);
    });
  }, [gameId, setGameStatus]);

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
      sender: name,
      message: msg,
    };

    // send message to the server
    socket.emit("message", {
      gameId,
      msgData,
    });
  };

  const gameJourney = () => {
    if (localStorage.getItem("id") === hostId) {
      return <NewGame value={props} />;
    } else {
      return <WaitingRoom value={props} />;
    }
  };

  const renderWaitRoom = () => {
    if (gameStatus === "running") {
      return null;
    } else if (gameStatus === "setup") {
      return (
        <Messenger
          messages={messages}
          sendMessage={sendMessage}
          name={name}
          // isSpyMaster={isSpyMaster}
          // isTurn={team === currentTurn}
          // changeTurn={changeTurn}
        />
      );
    }
  };

  return (
    <div className={classes.WaitingRoom}>
      {renderWaitRoom()}
      <div>{gameStatus === "setup" ? gameJourney() : <Game {...props} />}</div>
    </div>
  );
};

export default GameSetup;
