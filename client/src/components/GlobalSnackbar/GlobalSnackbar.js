import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  useSnackbarOpen,
  useSnackbarMessage,
} from "../../contexts/SnackbarContext";

const GlobalSnackbar = () => {
  const [open, setOpen] = useSnackbarOpen();
  const [message] = useSnackbarMessage();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setOpen(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default GlobalSnackbar;
