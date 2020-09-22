import React, { useEffect, useState } from "react";
import NewGame from "../components/new game/NewGame";
import { useHost, useGameStart, useGameSpyMaster } from "../contexts/GameContext";
import {
  useNewGame,
} from "../contexts/DataContext"; 
import WaitingRoom from "../components/new game/WaitingRoom";

const GameSetup = (props) => {

  const HostContext = useHost();
  const [isHost, setIsHost] = HostContext;

  const SpyMasterContext = useGameSpyMaster();
  const [isSpyMaster, setIsSpyMaster] = SpyMasterContext;

  const GameStartContext = useGameStart();
  const [gameStart, setGameStart] = GameStartContext;

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;


  const gameJourney = () => {
    if (localStorage.getItem("id") === newGame.hostId) {
      console.log(localStorage.getItem("id") === newGame.hostId)
      return <NewGame value={props}/>;
    } else {
      return <WaitingRoom />;
    }
  };

  // const gameData = localStorage.getItem("newGame");

  // useEffect(() => {
  //   if (gameData) {
  //     setNewGame(JSON.parse(localStorage.getItem("newGame")));
  //   }
  // }, []);

  // // Stores New Game Info to Local Storage
  // useEffect(() => {
  //   localStorage.setItem("newGame", JSON.stringify(newGame));
  // }, [newGame]);

  console.log(newGame)
  console.log(localStorage.getItem("id") === newGame.hostId)



  return (
    <div>
      {gameStart ? <p>Match Component Here</p> : gameJourney()}
      <div>Chat Component Here </div>
    </div>
  );
};

export default GameSetup;
