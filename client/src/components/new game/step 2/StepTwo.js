import React, { useEffect } from "react";
import {
  useNewGame,
  usePlayers,
  useHostName,
  useHostId,
} from "../../../contexts/DataContext";
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
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Flip from "react-reveal/Flip";
import socket from "../../../socket";

const useStyles = makeStyles((theme) =>
  createStyles({
    item: {
      padding: 0,
    },
  }),
);

const StepTwo = (props) => {
  const [players, setPlayers] = usePlayers();
  const [hostName, setHostName] = useHostName();
  const [hostId, setHostId] = useHostId();
  let { id } = useParams();

  const classes = useStyles();

  useEffect(() => {
    // User joins the room
    let room = "game-" + id;
    let token = localStorage.getItem("token");
    let data = {
      room: room,
      gameId: id,
      token: token,
    };

    if (id !== "") {
      console.log("emit-join-match", data);
      socket.emit("join-game", data);
    }
  }, []);

  useEffect(() => {
    socket.on("update-players", ({ game, errors }) => {
      console.log("updated players", game.players);
      setPlayers(game.players);
      setHostId(game.currentUser._id);
      setHostName(game.currentUser.name);
    });
  }, [players]);

  const showPlayers = () => {
    return players.map((player, i) => {
      return (
        <ListItem className={classes.item} key={i}>
          <Flip left>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={player.name} />
          </Flip>
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
