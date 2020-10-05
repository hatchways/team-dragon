import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ProfileItem: {
    margin: "0 .5rem",
  },
  Profile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;
