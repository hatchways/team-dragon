import React, { useEffect, useState } from "react";
import NewGame from "../components/new game/NewGame";
import { useHost, useGameStart } from "../contexts/GameContext";
import WaitingRoom from "../components/new game/WaitingRoom";

const GameSetup = (props) => {

  const HostContext = useHost();
  const [isHost, setisHost] = HostContext;

  const GameStartContext = useGameStart();
  const [gameStart, setGameStart] = GameStartContext;


  const gameJourney = () => {
    if (isHost) {
      return <NewGame value={props}/>;
    } else {
      return <WaitingRoom />;
    }
  };

  useEffect(() => {
    //Request isHost and gameStart
  }, []);

  return (
    <div>
      {gameStart ? <p>Match Component Here</p> : gameJourney()}
      <div>Chat Component Here </div>
    </div>
  );
};

export default GameSetup;
