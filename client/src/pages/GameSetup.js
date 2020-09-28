import React, { useEffect } from "react";
import { useGameStatus } from "../contexts/GameContext";
import { usePlayers, useHostId } from "../contexts/DataContext";
import NewGame from "../components/new game/NewGame";
import WaitingRoom from "../components/new game/WaitingRoom";
import Game from "../components/Game";
import socket from "../socket";

const GameSetup = (props) => {
  const [gameStatus, setGameStatus] = useGameStatus();
  const [players, setPlayers] = usePlayers();
  const [hostId, setHostId] = useHostId();


  useEffect(() => {
    //Shows players now assigned on teams and roles, ALSO - change gameStatus now === "running"
    socket.on("update-roles", (match) => {
      console.log("socket-on-update-roles", match);
      setGameStatus(match.gameStatus);
    });
  }, [setGameStatus]);



  const gameJourney = () => {
    if (localStorage.getItem("id") === hostId) {
      return <NewGame value={props} />;
    } else {
      return <WaitingRoom value={props} />;
    }
  };

  return (
    <div>{gameStatus === "running" ? <Game {...props} /> : gameJourney()}</div>
  );
};

export default GameSetup;
