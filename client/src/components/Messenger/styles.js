import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messenger: {
    width: "100%",
    height: "100%",
    background: theme.grey.superLight,
    overflow: "hidden",
  },
  messageContainer: {
    padding: "2rem",
    minHeight: "80%",
    maxHeight: "80%",
    overflow: "auto",
  },
  message: {
    padding: "0.8rem",
    width: "auto",
  },
  messageSender: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  messageMsg: {
    margin: 0,
    padding: "1rem",
    background: theme.grey.medium,
    borderRadius: "0px 15px 15px 15px",
    display: "inline-block",
  },
  messageMe: {
    padding: "0.8rem",
    width: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  messageMeMsg: {
    margin: 0,
    padding: "1rem",
    background: theme.red.medium,
    borderRadius: "15px 15px 0px 15px",
    color: theme.white,
    display: "inline-block",
  },
  messageInput: {
    height: "20%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alert: {
    fontStyle: "italic",
    color: theme.grey.dark,
  },
}));

export default useStyles;
