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
    matchId: "testID",
    teamBlue: {
      spyMaster: "",
      agents: [],
    },
    teamRed: {
      spyMaster: "",
      agents: [],
    },
  });

  const providerNewGame = useMemo(() => [newGame, setNewGame], [
    newGame,
    setNewGame,
  ]);

  //Holds Players who have accepted game invite
  const [players, setPlayers] = useState([
    { id: "1", name: "host", team: "noTeam", spyMaster: false },
    { id: "2", name: "player2", team: "noTeam", spyMaster: false },
    { id: "3", name: "player3", team: "noTeam", spyMaster: false },
    { id: "4", name: "player4", team: "noTeam", spyMaster: false },
    { id: "5", name: "player5", team: "noTeam", spyMaster: false },
    { id: "6", name: "player6", team: "noTeam", spyMaster: false },
  ]);

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
