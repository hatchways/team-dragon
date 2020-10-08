import React, { useContext, useState, useMemo } from "react";

const GameStatusContext = React.createContext();

// Custom hook to check if game has started
export function useGameStatus() {
  return useContext(GameStatusContext);
}

export function GameProvider({ children }) {
  //Holds whether game has started
  const [gameStatus, setGameStatus] = useState("setup");
  const providerGameStatus = useMemo(() => [gameStatus, setGameStatus], [
    gameStatus,
    setGameStatus,
  ]);

  return (
    <GameStatusContext.Provider value={providerGameStatus}>
      {children}
    </GameStatusContext.Provider>
  );
}
