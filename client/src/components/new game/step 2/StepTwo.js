import React, { useEffect } from "react";
// import { useEmails, useNewGame } from "../../../DataContext";
import openSocket from "socket.io-client";

const StepTwo = () => {
  // const emailsContext = useEmails();
  // const [emails] = emailsContext;

  // const newGameContext = useNewGame();
  // const [newGame, setNewGame] = newGameContext;

  useEffect(() => {
    console.log("User joins the match");
    const socket = openSocket("http://localhost:3001");
    socket.on("connect", () => {
      socket.on("join-match", (data) => {
        alert("New user joined Match");
      });
    });
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
