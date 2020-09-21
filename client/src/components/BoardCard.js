import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles( theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.white,
  }
}));

const BoardCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {props.text}
    </Card>
  )
}

BoardCard.propTypes = {
  text: PropTypes.string.isRequired,
}

export default BoardCard;