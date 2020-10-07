import React from "react";

const SnackbarOpenContext = React.createContext();
const useSnackbarOpen = () => React.useContext(SnackbarOpenContext);

const SnackbarMessageContext = React.createContext();
const useSnackbarMessage = () => React.useContext(SnackbarMessageContext);

const SnackbarProvider = (props) => {
  const [open, setOpen] = React.useState(false);
  const providerOpen = React.useMemo(() => [open, setOpen], [open, setOpen]);

  const [message, setMessage] = React.useState("");
  const providerMessage = React.useMemo(() => [message, setMessage], [
    message,
    setMessage,
  ]);

  return (
    <SnackbarOpenContext.Provider value={providerOpen}>
      <SnackbarMessageContext.Provider value={providerMessage}>
        {props.children}
      </SnackbarMessageContext.Provider>
    </SnackbarOpenContext.Provider>
  );
};

export { useSnackbarOpen, useSnackbarMessage, SnackbarProvider };
