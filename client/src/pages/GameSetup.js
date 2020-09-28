import React, { useEffect } from "react";
import { useGameStatus } from "../contexts/GameContext";
import { useNewGame, usePlayers } from "../contexts/DataContext";
import NewGame from "../components/new game/NewGame";
import WaitingRoom from "../components/new game/WaitingRoom";
import Game from "../components/Game";
import socket from "../socket";

const GameSetup = (props) => {
  const [gameStatus, setGameStatus] = useGameStatus();
  const [newGame, setNewGame] = useNewGame();
  const [players, setPlayers] = usePlayers();

  const gameData = localStorage.getItem("newGame");

  console.log("gameSetup render");

  useEffect(() => {
    if (gameData) {
      // setNewGame(JSON.parse(localStorage.getItem("newGame")));
      // setPlayers(JSON.parse(localStorage.getItem("players")));
    }
  }, []);

  useEffect(() => {
    //Shows players now assigned on teams and roles, ALSO - change gameStatus now === "running"
    socket.on("update-roles", (match) => {
      console.log("socket-on-update-roles", match);
      setGameStatus(match.gameStatus);
    });
  }, [gameData, setGameStatus /* , setNewGame */]);

  // Stores New Game Info to Local Storage
  useEffect(() => {
    localStorage.setItem("newGame", JSON.stringify(newGame));
  }, [newGame]);

  const gameJourney = () => {
    if (localStorage.getItem("id") === newGame.hostId) {
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
