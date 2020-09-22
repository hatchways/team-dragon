import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles( theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.white,
  },
  red: {
    color: theme.red,
  }, 
  blue: {
    color: theme.blue,
  },
  assassin: {
    color: theme.grey.dark,
  },
  innocent: {
    color: theme.grey.light,
  },
}));

const BoardCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography>
        {props.word}
      </Typography>
    </Card>
  )
}

BoardCard.propTypes = {
  word: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default BoardCard;