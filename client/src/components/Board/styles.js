import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Board: {
    width: "100%",
    height: "100%",
    position: "relative",
    top: "0",
    left: "0",
    // background: theme.grey.medium,
    backgroundImage: 'url(./background-3.jpg)',
    backgroundSize: '110%',
    backgroundPosition:"center",
    padding: "5rem 6rem 5rem 9rem",
    display: "flex",
    flexFlow: "column",
  },
  BoardCards: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "1rem",
  },
  BoardBottom: {
    paddingTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  Timer: (props) => ({
    color: props.timer <= 10 ? theme.red.medium : theme.palette.primary.main,
  }),
}));

export default useStyles;
