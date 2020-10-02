import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Messenger: {
    width: "100%",
    height: "100%",
    background: theme.grey.superLight,
    overflow: "hidden",
  },
  MessageContainer: (props) => ({
    padding: "2rem",
    minHeight: props.isTurn ? "calc(80% - 52px)" : "80%",
    maxHeight: props.isTurn ? "calc(80% - 52px)" : "80%",
    overflow: "auto",
  }),
  Message: {
    padding: "0.8rem",
    width: "auto",
  },
  MessageSender: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  MessageMsg: {
    margin: 0,
    padding: "1rem",
    background: theme.grey.medium,
    borderRadius: "0px 15px 15px 15px",
    display: "inline-block",
  },
  MessageMe: {
    padding: "0.8rem",
    width: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  MessageMeMsg: {
    margin: 0,
    padding: "1rem",
    background: theme.red.medium,
    borderRadius: "15px 15px 0px 15px",
    color: theme.white,
    display: "inline-block",
  },
  MessageInput: {
    height: "20%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Alert: {
    fontStyle: "italic",
    color: theme.grey.dark,
  },
  YourTurn: {
    height: "52px",
    padding: "0.8rem",
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.grey.dark,
    color: theme.white,
  },
}));

export default useStyles;
