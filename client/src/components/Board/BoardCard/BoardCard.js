import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const BoardCard = (props) => {
  const classes = useStyles(props);

  let styles = [`${classes.Card}`];
  if (props.type === "red") {
    styles.push(`${classes.Red}`);
  } else if (props.type === "blue") {
    styles.push(`${classes.Blue}`);
  } else if (props.type === "innocent") {
    styles.push(`${classes.Innocent}`);
  } else {
    styles.push(`${classes.Assassin}`);
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
  clicked: false,
  spyMaster: false,
};

BoardCard.propTypes = {
  word: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  clicked: PropTypes.bool.isRequired,
  spyMaster: PropTypes.bool,
};

export default BoardCard;
