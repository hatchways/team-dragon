import React, { useEffect } from "react";
import { useEmails, useNewGame } from "../../../DataContext";
import io from "socket.io-client";
import axios from "axios";

const socket = io();

const StepTwo = () => {
  // const emailsContext = useEmails();
  // const [emails] = emailsContext;

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;

  useEffect(() => {
    // socket.on("connect", () => {
    // User joins the match
    if (newGame.match) {
      socket.emit("joinMatch", { match: newGame.match });
    }
    // User joined the match
    socket.on("userjoined", (msg) => {
      console.log(msg);
    });
    // });

    // close the socket when page is left
    return () => socket.disconnect();
  }, [newGame]);

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

  console.log(newGame);
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
