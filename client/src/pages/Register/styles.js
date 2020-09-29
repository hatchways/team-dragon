import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Register: {
    paddingTop: theme.spacing(4),
  },
  FormContainer: {
    padding: "2rem 4rem",
  },
  Form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TextField: {
    fontFamily: theme.fontFamily,
    margin: "1rem 0",
  },
  Button: {
    margin: "1rem 0",
  },
}));

export default useStyles;
