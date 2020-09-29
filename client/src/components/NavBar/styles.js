import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  NavBar: {
    width: "100%",
    height: "12vh",
    background: theme.white,
  },
  NavBarWrap: {
    width: "90%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
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
}));

export default useStyles;
