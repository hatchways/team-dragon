import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import GameBar from "../../components/GameBar";
import Messenger from "../../components/Messenger";
import Board from "../../components/Board";
import socket from "../../socket";
import useStyles from "./styles";
import { useGameStatus } from "../../contexts/GameContext";

const Game = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [messages, setMessages] = useState([]);
  const [board, setBoard] = useState([]);
  const [isSpyMaster, setIsSpyMaster] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("");
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [teamList, setTeamList] = useState({
    blue: {
      spyMaster: "",
      guesser: [],
    },
    red: {
      spyMaster: "",
      guesser: [],
    },
  });
  const [gameStatus, setGameStatus] = useGameStatus();
  const [endGame, setEndGame] = useState({ winner: "", gameOverTest: "" });
  const [timer, setTimer] = useState(60);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const gameId = props.match.params.id;

  useEffect(() => {
    // join the match
    socket.emit("init-game", { gameId }, (recv) => {
      console.log("Game State:", recv);
      setTeamList(recv.state.teamList);
      setName(recv.name);
      setMessages(recv.messages);
      setBoard(recv.state.board);
      setBlueScore(recv.state.blueTeam.points);
      setRedScore(recv.state.redTeam.points);

      // search game stare to find role of this user
      const redPlayers = recv.state.redTeam.players;
      const bluePlayers = recv.state.blueTeam.players;

      const redIdx = redPlayers.findIndex((p) => p.name === recv.name);
      const blueIdx = bluePlayers.findIndex((p) => p.name === recv.name);

      if (redIdx > -1) {
        setTeam("red");

        if (redPlayers[redIdx].role === "spy-master") {
          setIsSpyMaster(true);
        }
      } else if (blueIdx > -1) {
        setTeam("blue");

        if (bluePlayers[blueIdx].role === "spy-master") {
          setIsSpyMaster(true);
        }
      }

      // set current state of the game
      setCurrentTurn(recv.state.turn);
    });

    socket.on("update-game", (recv) => {
      console.log("Updated Game State:", recv);

      // set current state of the game
      setGameStatus(recv.gameStatus);
      setBoard(recv.board);
      setCurrentTurn(recv.turn);
      setRedScore(recv.redTeam.points);
      setBlueScore(recv.blueTeam.points);
      if (recv.gameStatus === "over") {
        setEndGame(recv.endGame);
      }
    });

    socket.on("new-message", (recv) => {
      setMessages((prevMessages) => [...prevMessages, recv]);
    });

    socket.on("tick", (recv) => {
      setTimer(recv);
    });

    socket.on("time-out", () => {
      setSnackbarMessage("Time out! Swapping turns...");
      setOpenSnackbar(true);
    });

    return () => {
      setGameStatus("setup");
      socket.off("new-message");
      socket.off("tick");
      socket.off("time-out");
      socket.off("update-game");
    };
  }, [gameId, setGameStatus]);

  const sendMessage = (msg) => {
    const msgData = {
      sender: name,
      message: msg,
    };

    // send message to the server
    socket.emit("message", {
      gameId,
      msgData,
    });
  };

  const selectCard = (cardIndex) => {
    if (team !== currentTurn) return;
    if (isSpyMaster === true) return;
    if (board[cardIndex].clicked === true) return;
    socket.emit("move", { gameId, currentTurn, cardIndex });
  };

  const changeTurn = () => {
    socket.emit("change-turn", {
      gameId,
    });
  };

  const stopGame = () => {
    // send message to the server
    socket.emit("end-game", {
      gameId,
      winner: "none",
      method: "manual",
    });
  };

  return (
    <div className={classes.Game}>
      <div className={classes.Gamebar}>
        <GameBar
          gameStatus={gameStatus}
          currentTurn={currentTurn}
          redScore={redScore}
          blueScore={blueScore}
          stopGame={stopGame}
          isSpyMaster={isSpyMaster}
          teamList={teamList}
          history={props.history}
        />
      </div>
      <div className={classes.Messenger}>
        <Messenger
          messages={messages}
          sendMessage={sendMessage}
          name={name}
          isSpyMaster={isSpyMaster}
          isTurn={team === currentTurn}
          changeTurn={changeTurn}
          timeOut={timer === 0}
        />
      </div>
      <div className={classes.Board}>
        <Board
          gameStatus={gameStatus}
          board={board}
          isSpyMaster={isSpyMaster}
          redScore={redScore}
          blueScore={blueScore}
          endGame={endGame}
          selectCard={selectCard}
          timer={timer}
        />
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnackbar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default Game;
