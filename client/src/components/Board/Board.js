import React from "react";
import PropTypes from "prop-types";
import BoardCard from "./BoardCard";
import useStyles from "./styles";

const Board = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.Board}>
      {props.board.map((card, idx) => (
        <BoardCard
          isSpyMaster={props.isSpyMaster}
          key={idx}
          word={card.word}
          type={card.type}
          clicked={card.clicked}
        />
      ))}
    </div>
  );
};

Board.defaultProps = {
  isSpyMaster: false,
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  isSpyMaster: PropTypes.bool,
};

export default Board;
