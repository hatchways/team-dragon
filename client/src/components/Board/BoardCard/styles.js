import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: (props) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.white,
    cursor: props.clicked ? "auto" : "pointer",
    transition: "transform .2s",
    "&:hover:not(.clicked)": {
      transform: "scale(1.2)",
    },
  }),
  red: (props) => ({
    color: props.spyMaster ? theme.red.medium : theme.grey.dark,
    "&.clicked": {
      background: `linear-gradient(45deg, ${theme.red.medium} 50%, ${theme.red.light} 85%)`,
      color: theme.white,
    },
  }),
  blue: (props) => ({
    color: props.spyMaster ? theme.blue.medium : theme.grey.dark,
    "&.clicked": {
      background: `linear-gradient(45deg, ${theme.blue.medium} 50%, ${theme.blue.light} 85%)`,
      color: theme.white,
    },
  }),
  innocent: (props) => ({
    color: props.spyMaster ? theme.grey.mediumDark : theme.grey.dark,
    "&.clicked": {
      background: theme.grey.medium,
      color: theme.grey.mediumDark,
    },
  }),
  assassin: {
    color: theme.grey.dark,
  },
}));

export default useStyles;
