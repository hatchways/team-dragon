import React, { useContext, useState, useMemo, useEffect } from "react";

const EmailContext = React.createContext();

const NewGameContext = React.createContext();

const PlayersContext = React.createContext();

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
    teamBlue: {
      spyMaster: "",
      agents: [],
    },
    teamRed: {
      spyMaster: "",
      agents: [],
    },
  });

  // useeffect with empty array on new gamae component

  useEffect(() => {
    localStorage.setItem("newGame", JSON.stringify(newGame));
  }, [newGame]);

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

  return (
    <NewGameContext.Provider value={providerNewGame}>
      <EmailContext.Provider value={providerEmails}>
        <PlayersContext.Provider value={providerPlayers}>
          {children}
        </PlayersContext.Provider>
      </EmailContext.Provider>
    </NewGameContext.Provider>
  );
}
