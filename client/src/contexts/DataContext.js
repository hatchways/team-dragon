import React, { useContext, useState, useMemo } from "react";

const EmailContext = React.createContext();

const NewGameContext = React.createContext();

const PlayersContext = React.createContext();

const SpyMasterContext = React.createContext();

const HostNameContext = React.createContext();

const HostIdContext = React.createContext();

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

// Holds Host Name to display for Waiting Room.js
export function useHostName() {
  return useContext(HostNameContext);
}

//Holds Host Id on Game Setup.js to determine if the user is a host.
export function useHostId() {
  return useContext(HostIdContext);
}

export function DataProvider({ children }) {
  //Holds emails to be invited to game
  const [emails, setEmails] = useState([]);
  const providerEmails = useMemo(() => [emails, setEmails], [
    emails,
    setEmails,
  ]);

  //Holds New Game Steps for Host
  const initialState = () =>
    Number(window.localStorage.getItem("newGame") || null);
  const [newGame, setNewGame] = useState(initialState);

  const providerNewGame = useMemo(() => [newGame, setNewGame], [
    newGame,
    setNewGame,
  ]);

  //Holds Players who have accepted game invite
  const [players, setPlayers] = useState([]);

  const providerPlayers = useMemo(() => [players, setPlayers], [
    players,
    setPlayers,
  ]);

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

  const [hostId, setHostId] = useState("");
  const providerHostId = useMemo(() => [hostId, setHostId], [
    hostId,
    setHostId,
  ]);

  return (
    <NewGameContext.Provider value={providerNewGame}>
      <EmailContext.Provider value={providerEmails}>
        <PlayersContext.Provider value={providerPlayers}>
          <SpyMasterContext.Provider value={providerSpyMaster}>
            <HostNameContext.Provider value={providerHostName}>
              <HostIdContext.Provider value={providerHostId}>
                {children}
              </HostIdContext.Provider>
            </HostNameContext.Provider>
          </SpyMasterContext.Provider>
        </PlayersContext.Provider>
      </EmailContext.Provider>
    </NewGameContext.Provider>
  );
}
