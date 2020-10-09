import { makeStyles } from "@material-ui/core";

const font = "'Sansita Swashed', cursive";

const useStyles = makeStyles((theme) => ({
  ProfileItem: {
    margin: "0 .5rem",
  },
  UserName: {
    margin: "0 .5rem",
    fontFamily: font,
    fontWeight: "bold",
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
