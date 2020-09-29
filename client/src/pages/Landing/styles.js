import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Landing: {
    paddingTop: theme.spacing(4),
  },
  Card: {
    padding: "2rem",
    textAlign: "center",
  },
  Heading: {
    marginBottom: "2rem",
  },
  Button: {
    margin: "0 1rem",
  },
}));

export default useStyles;
