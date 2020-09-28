import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  board: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "1rem",
    background: theme.grey.medium,
    padding: "4rem",
  },
}));

export default useStyles;
