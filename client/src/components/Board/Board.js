import React from "react";
import PropTypes from "prop-types";
import GameOver from "../GameOver/GameOver";
import BoardCard from "./BoardCard";
import useStyles from "./styles";

const Board = (props) => {
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.Board}>
        {(props.gameStatus === "over" && props.endGame) && (
          <GameOver
            redScore={props.redScore}
            blueScore={props.blueScore}
            endGame={props.endGame}
          />
        )}
        {props.board.map((card, idx) => (
          <BoardCard
            isSpyMaster={props.isSpyMaster}
            key={idx}
            cardIndex={idx}
            word={card.word}
            type={card.type}
            clicked={card.clicked}
            selectCard={props.selectCard}
          />
        ))}
      </div>
    </>
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
