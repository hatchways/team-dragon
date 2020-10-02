import React, { useContext, useState, useMemo } from "react";

const UserContext = React.createContext();

// Custom hook for User Authentication status
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  //Holds User Information
  const [user, setUser] = useState(null);

  const providerUser = useMemo(() => [user, setUser], [user, setUser]);
  return (
    <UserContext.Provider value={providerUser}>{children}</UserContext.Provider>
  );
}
