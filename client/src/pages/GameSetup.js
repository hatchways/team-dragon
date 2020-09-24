import React, { useEffect, useState } from "react";
import NewGame from "../components/new game/NewGame";
import { useGameStatus, useGameSpyMaster } from "../contexts/GameContext";
import { useNewGame } from "../contexts/DataContext";
import Game from "../components/Game";
import WaitingRoom from "../components/new game/WaitingRoom";
import socket from "../socket";

const GameSetup = (props) => {
  const SpyMasterContext = useGameSpyMaster();
  const [isSpyMaster, setIsSpyMaster] = SpyMasterContext;

  const GameStatusContext = useGameStatus();
  const [gameStatus, setGameStatus] = GameStatusContext;

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;

  const gameJourney = () => {
    if (localStorage.getItem("id") === newGame.hostId) {
      return <NewGame value={props} />;
    } else {
      return <WaitingRoom value={props} />;
    }
  };

  const gameData = localStorage.getItem("newGame");

  useEffect(() => {
    if (gameData) {
      setNewGame(JSON.parse(localStorage.getItem("newGame")));
    }

    //Shows players now assigned on teams and roles, ALSO - change gameStatus now === "running"
    socket.on("update-roles", (match) => {
      setGameStatus(match.gameStatus);
      console.log("Updated Roles: ", match);
    });
  }, []);

  // Stores New Game Info to Local Storage
  useEffect(() => {
    localStorage.setItem("newGame", JSON.stringify(newGame));
  }, [newGame, gameStatus]);

  return (
    <div>{gameStatus === "running" ? <Game {...props} /> : gameJourney()}</div>
  );
};

export default GameSetup;
