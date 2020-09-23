import React, { useEffect, useState } from "react";
import NewGame from "../components/new game/NewGame";
import {
  useHost,
  useGameStart,
  useGameSpyMaster,
} from "../contexts/GameContext";
import WaitingRoom from "../components/new game/WaitingRoom";
import socket from '../socket';

const GameSetup = (props) => {
  const HostContext = useHost();
  const [isHost, setisHost] = HostContext;

  const SpyMasterContext = useGameSpyMaster();
  const [isSpyMaster, setIsSpyMaster] = SpyMasterContext;

  const GameStartContext = useGameStart();
  const [gameStart, setGameStart] = GameStartContext;

  const gameJourney = () => {
    if (isHost) {
      return <NewGame value={props} />;
    } else {
      return <WaitingRoom />;
    }
  };

  useEffect(() => {
    //Request isHost and gameStart
    // Updates match state
    socket.on("update-match-state", (match) => {
      console.log("Updated Match State: ", match.players);
    });
  }, []);

  return (
    <div>
      {gameStart ? <p>Match Component Here</p> : gameJourney()}
      <div>Chat Component Here </div>
    </div>
  );
};

export default GameSetup;
