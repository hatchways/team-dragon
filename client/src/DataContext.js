import React, { useContext, useState, useMemo } from "react";

const EmailContext = React.createContext();

const NewGameContext = React.createContext();

// Custom hook for Emails to be invited to game
export function useEmails() {
  return useContext(EmailContext);
}

// Custom hook for new Game Data
export function useNewGame() {
  return useContext(NewGameContext);
}

export function DataProvider({ children }) {
  //Holds emails to be invited to game
  const [emails, setEmails] = useState([]);
  const providerEmails = useMemo(() => [emails, setEmails], [
    emails,
    setEmails,
  ]);

  //Holds New Game Steps + Game Data
  const [newGame, setNewGame] = useState({ step: 1 });
  const providerNewGame = useMemo(() => [newGame, setNewGame], [
    newGame,
    setNewGame,
  ]);

  return (
    <NewGameContext.Provider value={providerNewGame}>
      <EmailContext.Provider value={providerEmails}>
        {children}
      </EmailContext.Provider>
    </NewGameContext.Provider>
  );
}
