import React, { useContext, useState, useMemo } from "react";

const HostContext = React.createContext();

const GameStatusContext = React.createContext();

const IsSpyMasterContext = React.createContext();

// Custom hook to check if user is host
export function useHost() {
  return useContext(HostContext);
}

// Custom hook to check if game has started
export function useGameStatus() {
  return useContext(GameStatusContext);
}

// Custom hook to control is player is spymaster
export function useGameSpyMaster() {
  return useContext(IsSpyMasterContext);
}

export function GameProvider({ children }) {
  //Holds whether user is host
  const [isHost, setIsHost] = useState(false);
  const providerIsHost = useMemo(() => [isHost, setIsHost], [
    isHost,
    setIsHost,
  ]);

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
    <HostContext.Provider value={providerIsHost}>
      <GameStatusContext.Provider value={providerGameStatus}>
        <IsSpyMasterContext.Provider value={providerIsSpyMaster}>
          {children}
        </IsSpyMasterContext.Provider>
      </GameStatusContext.Provider>
    </HostContext.Provider>
  );
}
