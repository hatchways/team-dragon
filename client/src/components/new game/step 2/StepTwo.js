import React, { useEffect, useState } from "react";
import { useEmails, useNewGame } from "../../../DataContext";
import axios from "axios";
import socket from "../../../socket";

const StepTwo = () => {
  // const emailsContext = useEmails();
  // const [emails] = emailsContext;

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;
  const [message, setMessage] = useState("");

  useEffect(() => {
    // User joins the match

    console.log(newGame.match);

    // if (newGame.match) {
    // let room = "match-" + newGame.match.id;
    // let matchId = newGame.match.id;
    // let data = {
    //   room: room,
    //   matchId: matchId,
    // };

    // // User joins the room
    // socket.emit("joinmatch", data);
    // // New user joining notification
    // socket.on("joinedmatch", (data) => {
    //   alert(data);
    //   console.log("Current Room: ", room);
    // });

    // // Updated players array (Data lagging one step behind and needs to be fixed)
    // socket.on("updateplayers", (players) => {
    //   console.log("Updated Players: ", players);
    // });
    socket.emit("join-match", {
      userEmail: localStorage.getItem("email"),
      matchId: 281,
      room: 29038493,
    });
    // }

    // // close the socket when page is left
    // return () => socket.disconnect();
  }, []);

  // // Join Match Request
  // const joinMatch = async () => {
  //   if (!newGame.match) {
  //     console.log("waiting for match...");
  //   } else if (!newGame.match.id) {
  //     console.log("waiting for match id...");
  //   } else {
  //     const res = await axios.post(`/match/${newGame.match.id}`);
  //     if (!res.data) {
  //       console.log("Waiting for player...");
  //     } else {
  //       setNewGame((prevState) => ({
  //         ...prevState,
  //         match: res.data.match,
  //       }));

  //     }
  //   }
  // };

  // useEffect(() => {
  //   joinMatch();
  // }, []);

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
