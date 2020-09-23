import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navBar: {
    width: "100%",
    height: "100%",
    background: theme.white,
  },
  navBarWrap: {
    width: "90%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    textTransform: "uppercase",
    letterSpacing: "0.6rem",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  red: {
    color: theme.red.medium,
  },
  blue: {
    color: theme.blue.medium,
  },
  profileText: {
    padding: "0 0.5rem",
  },
  button: {
    marginRight: "1rem",
  },
}));

export default useStyles;
