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
          spyMaster={props.spyMaster}
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
  spyMaster: false,
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  spyMaster: PropTypes.bool,
};

export default Board;
