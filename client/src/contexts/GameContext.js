import React, { useContext, useState, useMemo } from "react";

const HostContext = React.createContext();

const GameStartContext = React.createContext();

// Custom hook to check if user is host
export function useHost() {
  return useContext(HostContext);
}

// Custom hook to check if game has started
export function useGameStart() {
  return useContext(GameStartContext);
}

export function GameProvider({ children }) {
  //Holds whether user is host
  const [isHost, setIsHost] = useState(true);
  const providerIsHost = useMemo(() => [isHost, setIsHost], [
    isHost,
    setIsHost,
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
        {children}
      </GameStartContext.Provider>
    </HostContext.Provider>
  );
}
