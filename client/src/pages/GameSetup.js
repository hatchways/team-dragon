import React, { useState, useEffect } from "react";
import { useNewGame } from "../contexts/DataContext";
import { useGameStatus } from "../contexts/GameContext";
import NewGame from "../components/new game/NewGame";
import WaitingRoom from "../components/new game/WaitingRoom";
import Game from "../components/Game";
import socket from "../socket";

const GameSetup = (props) => {
  const [game, setGame] = useState(null);

  const [newGame, setNewGame] = useNewGame();
  const [gameStatus, setGameStatus] = useGameStatus();

  const gameData = localStorage.getItem("newGame");

  useEffect(() => {
    if (gameData) {
      setNewGame(JSON.parse(localStorage.getItem("newGame")));
    }

    //Shows players now assigned on teams and roles, ALSO - change gameStatus now === "running"
    socket.on("update-roles", (match) => {
      setGameStatus(match.gameStatus);
      setGame(match);
    });
  }, []);

  // Stores New Game Info to Local Storage
  useEffect(() => {
    localStorage.setItem("newGame", JSON.stringify(newGame));
  }, [newGame, gameStatus]);

  const gameJourney = () => {
    if (localStorage.getItem("id") === newGame.hostId) {
      return <NewGame value={props} />;
    } else {
      return <WaitingRoom value={props} />;
    }
  };

  return (
    <div>
      {gameStatus === "running" 
        ? <Game {...props} game={game} /> 
        : gameJourney()
      }
    </div>
  );
};

export default GameSetup;
