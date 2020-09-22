import React, { useContext, useState, useMemo } from "react";

const HostContext = React.createContext();

const GameStartContext = React.createContext();

const IsSpyMasterContext = React.createContext();

// Custom hook to check if user is host
export function useHost() {
  return useContext(HostContext);
}

// Custom hook to check if game has started
export function useGameStart() {
  return useContext(GameStartContext);
}

// Custom hook to control is player is spymaster
export function useGameSpyMaster() {
  return useContext(IsSpyMasterContext);
}

export function GameProvider({ children }) {
  //Holds whether user is host
  const [isHost, setIsHost] = useState(true);
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
  const [gameStart, setGameStart] = useState(false);
  const providerGameStart = useMemo(() => [gameStart, setGameStart], [
    gameStart,
    setGameStart,
  ]);

  return (
    <HostContext.Provider value={providerIsHost}>
      <GameStartContext.Provider value={providerGameStart}>
        <IsSpyMasterContext.Provider value={providerIsSpyMaster}>
          {children}
        </IsSpyMasterContext.Provider>
      </GameStartContext.Provider>
    </HostContext.Provider>
  );
}
