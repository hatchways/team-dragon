import React, { useEffect, useState } from "react";
import { useNewGame, usePlayers } from "../../../contexts/DataContext";
import {
  Grid,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import socket from "../../../socket";

const StepTwo = () => {
  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;

  const usePlayersContext = usePlayers();
  const [players, setPlayers] = usePlayersContext;

  useEffect(() => {
    // // User joins the room
    // let room = "match-" + newGame.matchId;
    // let matchId = newGame.matchId;
    // let token = localStorage.getItem("token");
    // let data = {
    //   room: room,
    //   matchId: matchId,
    //   token: token
    // };
    // if (newGame.matchId !== "") {
    //   socket.emit("join-match", data);
    // }
    // //Shows players that have joined so far in game setup (Will be displayed in StepTwo.js)
    // socket.on("update-players", (match) => {
    //   setPlayers(match.players);
    // });
  }, [newGame]);

  const showPlayers = () => {
    return players.map((player, i) => {
      return (
        <ListItem key={i}>
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
      <Typography variant="h3">Players Joined:</Typography>
      <List>{showPlayers()}</List>
    </>
  );
};

export default StepTwo;
