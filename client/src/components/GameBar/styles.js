import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  NavBar: {
    width: "100%",
    height: "100%",
    background: theme.white,
  },
  NavBarWrap: {
    width: "90%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Brand: {
    textTransform: "uppercase",
    letterSpacing: "0.6rem",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  Scoreboard: {
    display: "flex",
    alignItems: "center",
  },
  BlueScore: (props) => ({
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: props.currentTurn === "blue" ? theme.white : theme.blue.medium,
    background: props.currentTurn === "blue" ? theme.blue.medium : "none",
    borderRadius: "5px",
    "& h3": {
      margin: "0.5rem",
      fontSize: "1.5rem",
    },
  }),
  RedScore: (props) => ({
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: props.urrentTurn === "red" ? theme.white : theme.red.medium,
    background: props.currentTurn === "red" ? theme.red.medium : "none",
    borderRadius: "5px",
    "& h3": {
      margin: "0.5rem",
      fontSize: "1.5rem",
    },
  }),
  BarControls: {
    display: "flex",
    alignItems: "center",
  },
  NewGameButton: {
    marginRight: "2rem",
  },
  Profile: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
