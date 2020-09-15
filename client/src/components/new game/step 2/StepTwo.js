import React from "react";
import { useAxios } from "../../../hooks/useAxios";
import { useEmails, useNewGame } from "../../../DataContext";

const StepTwo = () => {
  const emailsContext = useEmails();
  const [emails] = emailsContext;

  const newGameContext = useNewGame();
  const [newGame] = newGameContext;

  //Makes a post request to invite users, includes game ID created in step 1
 useAxios("url here", "post", { emails: emails, gameId: newGame.gameId });

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
