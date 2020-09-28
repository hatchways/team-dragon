import React, { useContext, useState, useMemo, useEffect } from "react";

const EmailContext = React.createContext();

const NewGameContext = React.createContext();

const PlayersContext = React.createContext();

const SpyMasterContext = React.createContext();

const HostNameContext = React.createContext();

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

export function useHostName() {
  return useContext(HostNameContext);
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
    gameId: "",
    hostId: null,
  });

  const providerNewGame = useMemo(() => [newGame, setNewGame], [
    newGame,
    setNewGame,
  ]);

  //Holds Players who have accepted game invite
  const [players, setPlayers] = useState([]);

  //Default State (for testing)
  // const [players, setPlayers] = useState([
  //   { name: "Karl", id: "1" },
  //   { name: "Jorawar", id: "2" },
  //   { name: "Nicholas", id: "3" },
  //   { name: "Bonnie", id: "4" },
  //   { name: "Henry", id: "5" },
  //   { name: "Joy", id: "6" },
  // ]);

  const providerPlayers = useMemo(() => [players, setPlayers], [
    players,
    setPlayers,
  ]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  //Holds SpyMaster
  const [spyMaster, setSpyMaster] = useState({ blue: "", red: "" });

  const providerSpyMaster = useMemo(() => [spyMaster, setSpyMaster], [
    spyMaster,
    setSpyMaster,
  ]);

  const [hostName, setHostName] = useState("");

  const providerHostName = useMemo(() => [hostName, setHostName], [
    hostName,
    setHostName,
  ]);

  return (
    <NewGameContext.Provider value={providerNewGame}>
      <EmailContext.Provider value={providerEmails}>
        <PlayersContext.Provider value={providerPlayers}>
          <SpyMasterContext.Provider value={providerSpyMaster}>
            <HostNameContext.Provider value={providerHostName}>
              {children}
            </HostNameContext.Provider>
          </SpyMasterContext.Provider>
        </PlayersContext.Provider>
      </EmailContext.Provider>
    </NewGameContext.Provider>
  );
}
