import React, { useEffect } from "react";
import {
  usePlayers,
  useHostName,
  useHostId,
} from "../../../contexts/DataContext";
import { useGameStatus } from "../../../contexts/GameContext";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";
import socket from "../../../socket";

const useStyles = makeStyles((theme) => ({
  item: {
    padding: 0,
  },
}));

const StepTwo = (props) => {
  const [, setGameStatus] = useGameStatus();
  const [players, setPlayers] = usePlayers();
  const [, setHostName] = useHostName();
  const [, setHostId] = useHostId();
  const { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    // User joins the room
    console.log("joining game", id);
    socket.emit("join-game", {
      gameId: id,
    });

    socket.on("update-players", (game) => {
      console.log("Updated players:", game.players);
      setGameStatus(game.gameStatus);
      setPlayers(game.players);
      setHostId(game.host._id);
      setHostName(game.host.name);
    });
  }, [id, setHostId, setHostName, setPlayers, setGameStatus]);

  const showPlayers = () => {
    return players.map((player, i) => {
      return (
        <ListItem className={classes.item} key={i}>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={player.name} />
        </ListItem>
      );
    });
  };

  return (
    <>
      <Box height={200}>
        <Typography variant="h3">Players Joined:</Typography>
        <List>{showPlayers()}</List>
      </Box>
    </>
  );
};

export default StepTwo;
