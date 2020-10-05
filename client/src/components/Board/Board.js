import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GameOver from "../GameOver/GameOver";
import BoardCard from "./BoardCard";
import useStyles from "./styles";

const Board = (props) => {
  const classes = useStyles(props);

  return (
    <>
      <Box className={classes.Board}>
        {props.gameStatus === "over" && props.endGame && (
          <GameOver
            redScore={props.redScore}
            blueScore={props.blueScore}
            endGame={props.endGame}
          />
        )}
        <Box className={classes.BoardCards}>
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
        </Box>
        <Box className={classes.BoardBottom}>
          <Typography variant="h1" className={classes.Timer}>
            {props.timer}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

Board.defaultProps = {
  isSpyMaster: false,
};

Board.propTypes = {
  board: PropTypes.array.isRequired,
  gameStatus: PropTypes.string.isRequired,
  isSpyMaster: PropTypes.bool,
  redScore: PropTypes.number.isRequired,
  blueScore: PropTypes.number.isRequired,
  endGame: PropTypes.object.isRequired,
  selectCard: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Board;
