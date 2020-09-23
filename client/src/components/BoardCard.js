import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.white,
    cursor: props.clicked ? "auto" : "pointer",
  }),
  red: (props) => ({
    color: props.spyMaster ? theme.red.medium : theme.grey.dark,
    "&.clicked": {
      background: theme.red.medium,
      background: `linear-gradient(45deg, ${theme.red.medium} 50%, ${theme.red.light} 85%)`,
      color: theme.white,
    },
  }),
  blue: (props) => ({
    color: props.spyMaster ? theme.blue.medium : theme.grey.dark,
    "&.clicked": {
      background: theme.blue.medium,
      background: `linear-gradient(45deg, ${theme.blue.medium} 50%, ${theme.blue.light} 85%)`,
      color: theme.white,
    },
  }),
  innocent: (props) => ({
    color: props.spyMaster ? theme.grey.mediumDark : theme.grey.dark,
    "&.clicked": {
      background: theme.grey.medium,
    },
  }),
  assassin: {
    color: theme.grey.dark,
  },
}));

const BoardCard = (props) => {
  const classes = useStyles(props);

  let styles = [`${classes.root}`];
  if (props.type === "red") {
    styles.push(`${classes.red}`);
  } else if (props.type === "blue") {
    styles.push(`${classes.blue}`);
  } else if (props.type === "innocent") {
    styles.push(`${classes.innocent}`);
  } else {
    styles.push(`${classes.assassin}`);
  }

  if (props.clicked) {
    styles.push("clicked");
  }

  return (
    <Card className={styles.join(" ")}>
      <Typography variant="h3">{props.word}</Typography>
    </Card>
  );
};

BoardCard.defaultProps = {
  spyMaster: false,
};

BoardCard.propTypes = {
  word: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clicked: PropTypes.bool.isRequired,
};

export default BoardCard;
