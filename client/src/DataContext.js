import React, { useContext, useState, useMemo } from "react";

const EmailContext = React.createContext();

// Custom hook for EmailContext
export function useEmails() {
  return useContext(EmailContext);
}

export function DataProvider({ children }) {
  //Holds emails to be invited to game
  const [emails, setEmails] = useState([]);
  const providerEmails = useMemo(() => [emails, setEmails], [
    emails,
    setEmails,
  ]);

  return (
    <EmailContext.Provider value={providerEmails}>
      {children}
    </EmailContext.Provider>
  );
}
