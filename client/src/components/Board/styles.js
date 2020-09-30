import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Board: {
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
    display: "grid",
    position: "relative",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "1rem",
    background: theme.grey.medium,
    padding: "4rem",
  },
}));

export default useStyles;
