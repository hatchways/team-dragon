import React, { useContext, useState, useMemo, useEffect } from "react";

const EmailContext = React.createContext();

const NewGameContext = React.createContext();

const PlayersContext = React.createContext();

const SpyMasterContext = React.createContext();

// Custom hook for Emails to be invited to game
export function useEmails() {
  return useContext(EmailContext);
}

// Custom hook for new Game Data
export function useNewGame() {
  return useContext(NewGameContext);
}

// Custom hook for getting accepted players
export function usePlayers() {
  return useContext(PlayersContext);
}

// Custom hook for holding SpyMaster
export function useSpyMaster() {
  return useContext(SpyMasterContext);
}

export function DataProvider({ children }) {
  //Holds emails to be invited to game
  const [emails, setEmails] = useState([]);
  const providerEmails = useMemo(() => [emails, setEmails], [
    emails,
    setEmails,
  ]);

  //Holds New Game Steps + Game Data
  const [newGame, setNewGame] = useState({
    step: 1,
    matchId: "",
    hostId: null,
  });

  const providerNewGame = useMemo(() => [newGame, setNewGame], [
    newGame,
    setNewGame,
  ]);

  //Holds Players who have accepted game invite
  const [players, setPlayers] = useState([{id: "", name: "", team: ""}]);

  const providerPlayers = useMemo(() => [players, setPlayers], [
    players,
    setPlayers,
  ]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  //Holds SpyMaster
  const [spyMaster, setSpyMaster] = useState({ teamBlue: "", teamRed: "" });

  const providerSpyMaster = useMemo(() => [spyMaster, setSpyMaster], [
    spyMaster,
    setSpyMaster,
  ]);

  return (
    <NewGameContext.Provider value={providerNewGame}>
      <EmailContext.Provider value={providerEmails}>
        <PlayersContext.Provider value={providerPlayers}>
          <SpyMasterContext.Provider value={providerSpyMaster}>
            {children}
          </SpyMasterContext.Provider>
        </PlayersContext.Provider>
      </EmailContext.Provider>
    </NewGameContext.Provider>
  );
}
