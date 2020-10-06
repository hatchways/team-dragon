import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  Game: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateAreas: `
      'Gamebar Gamebar'
      'Messenger Board'
    `,
    gridTemplateColumns: "400px 1fr",
    gridTemplateRows: "12vh 88vh",
  },
  Gamebar: {
    gridArea: "Gamebar",
  },
  Messenger: {
    gridArea: "Messenger",
  },
  Board: {
    gridArea: "Board",
  },
  Snackbar: {
    fontSize: "2rem",
  },
}));

export default useStyles;
