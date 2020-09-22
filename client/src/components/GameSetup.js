import React, { useEffect, useState } from "react";
import NewGame from "../pages/NewGame";
import WaitingRoom from "../components/new game/WaitingRoom";

const GameSetup = () => {
  const [isHost, setisHost] = useState(false);
  const [gameStart, setgGameStart] = useState(false);

  const gameJourney = () => {
    if (isHost) {
      return <NewGame />;
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
