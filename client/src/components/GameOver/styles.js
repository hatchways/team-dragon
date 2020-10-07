import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles((theme) => ({
  popUpWindow: {
    position: "absolute",
    minWidth: "400px",
    maxWidth: "500px",
    height: "50%",
    minHeight: "400px",
    left: "50%",
    top: "40%",
    transform: "translate(-50%, -50%)",
    zIndex: "10",
  },
  container: {
    background: fade(theme.grey.mediumDark, 0.8),
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "5",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  skullIcon: {
    width: "15%",
  },
  gameOver: {
    fontSize: "1.5rem",
    marginBottom: ".8rem",
  },
  gameOverText: (props) => ({
    color:
      props.endGame.winner === "Blue" ? theme.blue.medium : theme.red.medium,
  }),
  redScore: {
    color: theme.red.medium,
  },
  blueScore: {
    color: theme.blue.medium,
  },
  newGameButton: {
    padding: ".7rem 2.4rem",
  },
}));

export default useStyles;
