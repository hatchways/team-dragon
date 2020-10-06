import React, { useEffect } from "react";
import { useGameStatus } from "../contexts/GameContext";
import { useHostId } from "../contexts/DataContext";
import NewGame from "../components/new game/NewGame";
import WaitingRoom from "../components/new game/WaitingRoom";
import Game from "./Game";
import socket from "../socket";

const GameSetup = (props) => {
  const [gameStatus, setGameStatus] = useGameStatus();
  const [hostId] = useHostId();
  const gameId = props.match.params.id;

  useEffect(() => {
    socket.emit("fetch-game", { gameId });

    socket.on("update-game", (currentGame) => {
      console.log("Updated game:" ,currentGame.gameStatus)
      setGameStatus(currentGame.gameStatus)
    });
  }, []);

  useEffect(() => {
    //Shows players now assigned on teams and roles, ALSO - change gameStatus now === "running"
    socket.on("update-roles", (game) => {
      console.log("socket-on-update-roles", game);
      setGameStatus(game.gameStatus);
    });
  }, [gameStatus]);

  const gameJourney = () => {
    if (localStorage.getItem("id") === hostId) {
      return <NewGame value={props} />;
    } else {
      return <WaitingRoom value={props} />;
    }
  };

  return (
    <>
      <div>{gameStatus === "setup" ? gameJourney() : <Game {...props} />}</div>
    </>
  );
};

export default GameSetup;
