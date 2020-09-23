import React, { useContext, useState, useMemo } from "react";

const GameStatusContext = React.createContext();

const IsSpyMasterContext = React.createContext();

// Custom hook to check if game has started
export function useGameStatus() {
  return useContext(GameStatusContext);
}

// Custom hook to control is player is spymaster
export function useGameSpyMaster() {
  return useContext(IsSpyMasterContext);
}

export function GameProvider({ children }) {
  //Holds if player is spymaster
  const [isSpyMaster, setIsSpyMaster] = useState(false);
  const providerIsSpyMaster = useMemo(() => [isSpyMaster, setIsSpyMaster], [
    isSpyMaster,
    setIsSpyMaster,
  ]);

  //Holds whether game has started
  const [gameStatus, setGameStatus] = useState("setup");
  const providerGameStatus = useMemo(() => [gameStatus, setGameStatus], [
    gameStatus,
    setGameStatus,
  ]);

  return (
    <GameStatusContext.Provider value={providerGameStatus}>
      <IsSpyMasterContext.Provider value={providerIsSpyMaster}>
        {children}
      </IsSpyMasterContext.Provider>
    </GameStatusContext.Provider>
  );
}
