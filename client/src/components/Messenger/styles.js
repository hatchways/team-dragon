import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Messenger: {
    width: "100%",
    height: "100%",
    background: theme.grey.superLight,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // borderRight: `4px solid ${theme.palette.secondary.main}`,
    backgroundColor: "#537895",
    backgroundImage: "linear-gradient(0deg, #01579b 0%,  #039be5 74%)",
  },
  MessageContainer: (props) => ({
    padding: "2rem",
    minHeight: props.isTurn ? "calc(65% - 52px)" : "65%",
    maxHeight: props.isTurn ? "calc(65% - 52px)" : "65%",
    overflow: "auto",
  }),
  Message: {
    padding: "0.8rem",
    width: "auto",
  },
  MessageSender: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    color: theme.grey.light,
    fontWeight: "bold"
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
    height: "25%",
    padding: "1rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Alert: {
    fontStyle: "italic",
    color: theme.grey.light,
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
  ChatBar: {
    width: "100%",
    height: "3rem",
    padding: ".5rem",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    zIndex: "5",
    boxShadow: "0 3px 10px 6px rgba(129,212,250,.6)"
  },
  SendButton: {
    marginLeft: "1rem",
  },
  DoneButton: {
    marginTop: "1rem",
  },
  messageInputColor:{
    color:theme.grey.light
  }
}));

export default useStyles;
