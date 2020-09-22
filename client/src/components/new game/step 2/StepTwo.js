import React, { useEffect, useState } from "react";
import { useNewGame, usePlayers } from "../../../DataContext";
import axios from "axios";
import socket from "../../../socket";

const StepTwo = () => {
  // const emailsContext = useEmails();
  // const [emails] = emailsContext;

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;
  const [message, setMessage] = useState("");

  const usePlayersContext = usePlayers();
  const [players, setPlayers] = usePlayersContext;

  useEffect(() => {
    // User joins the match

    if (newGame.matchId) {
      let room = "match-" + newGame.matchId;
      let matchId = newGame.matchId;
      let data = {
        room: room,
        matchId: matchId,
      };

      // User joins the room
      socket.emit("joinmatch", data);
      // New user joining notification
      socket.on("joinedmatch", (data) => {
        alert(data);
        console.log("Current Room: ", room);
      });

      // Updated players array (Data lagging one step behind and needs to be fixed)
      socket.on("updateplayers", (players) => {
        setPlayers(players);
        console.log("Updated Players: ", players);
      });
    }

    // // close the socket when page is left
    // return () => socket.disconnect();
  }, []);

  // Join Match Request
  const joinMatch = async () => {
    if (!newGame.match) {
      console.log("waiting for match...");
    } else if (!newGame.match.id) {
      console.log("waiting for match id...");
    } else {
      const res = await axios.post(`/match/${newGame.match.id}`);
      if (!res.data) {
        console.log("Waiting for player...");
      } else {
        setNewGame((prevState) => ({
          ...prevState,
          match: res.data.match,
        }));
      }
    }
  };

  const showPlayers = () => {
    return players.map((player, i) => {
      return (
        <div key={i}>
          <p>
            Player ID: {player.userId} / Player Name {player.name}
          </p>
        </div>
      );
    });
  };

  useEffect(() => {
    joinMatch();
  }, []);

  //  // Calls API if no locally stored data, with otherwise use local data.
  //  const getNewMatch = async () => {
  //   const res = await axios.get("http://localhost:3001/create-match");
  //   if (!res.data) {
  //     setNewGame(JSON.parse(localStorage.getItem("newGame")));
  // }
  //   console.log(res.data.match);

  // useEffect(() => {
  //   console.log("axios call");
  //   getNewMatch();
  // }, []);

  return (
    <>
      <h2>step2</h2>
      {showPlayers()}
      <p>waiting room as people join. </p>
      <p>
        when players join, they will be added to a state on the host's frontend.
      </p>
      <p>
        once all players have joined, host can click "next" to assign roles.
      </p>
    </>
  );
};

export default StepTwo;
