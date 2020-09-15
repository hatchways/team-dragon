import React, { useContext, useState, useMemo } from "react";

const EmailContext = React.createContext();

const NewGameContext = React.createContext();

const PlayersContext = React.createContext();

const RolesContext = React.createContext();

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

// Custom hook for setting roles before starting the game
export function useRoles() {
  return useContext(RolesContext);
}

export function DataProvider({ children }) {
  //Holds emails to be invited to game
  const [emails, setEmails] = useState([]);
  const providerEmails = useMemo(() => [emails, setEmails], [
    emails,
    setEmails,
  ]);

  //Holds New Game Steps + Game Data
  const [newGame, setNewGame] = useState({ step: 1, gameId: "" });
  const providerNewGame = useMemo(() => [newGame, setNewGame], [
    newGame,
    setNewGame,
  ]);

  //Holds Players who have accepted game invite
  const [players, setPlayers] = useState([
    "host",
    "player2",
    "player3",
    "player4",
    "player6",
  ]);
  const providerPlayers = useMemo(() => [players, setPlayers], [
    players,
    setPlayers,
  ]);

  // Roles before starting the game

  const [roles, setRoles] = useState({
    matchId: "gameId here",
    teamBlue: {
      spyMaster: "id_spyMasterBlue",
      agents: ["id_1AgentBlue", "id_2AgentBlue"],
    },
    teamRed: {
      spyMaster: "id_spyMasterRed",
      agents: ["id_1AgentRed", "id_2AgentRed"],
    },
  });
  const providerRoles = useMemo(() => [roles, setRoles], [roles, setRoles]);

  return (
    <NewGameContext.Provider value={providerNewGame}>
      <EmailContext.Provider value={providerEmails}>
        <PlayersContext.Provider value={providerPlayers}>
          <RolesContext.Provider value={providerRoles}>
            {children}
          </RolesContext.Provider>
        </PlayersContext.Provider>
      </EmailContext.Provider>
    </NewGameContext.Provider>
  );
}
