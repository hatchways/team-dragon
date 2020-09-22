import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import BoardCard from "./BoardCard";

const useStyles = makeStyles( theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    gap: "1rem",
    background: theme.grey.medium,
    padding: "3rem",
  }
}));

const Board = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.board.map((card, idx) => (
        <BoardCard
          spyMaster
          key={idx} 
          word={card.word}
          type={card.type}
          clicked={card.clicked}
        />
      ))}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
}

export default Board;
