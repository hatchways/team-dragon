import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  game: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "12vh 88vh",
  },
  gameArea: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "400px 1fr",
    gridTemplateRows: "auto",
  },
}));

export default useStyles;
