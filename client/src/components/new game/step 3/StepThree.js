import React from "react";
import { useNewGame, usePlayers, useRoles } from "../../../DataContext";
import { useAxios } from "../../../hooks/useAxios";

const StepThree = () => {
  const newGameContext = useNewGame();
  const [newGame] = newGameContext;

  const newPlayerContext = usePlayers();
  const [players, setPlayers] = newPlayerContext;

  const newRolesContext = useRoles();
  const [roles, setRoles] = newRolesContext;

  console.log(players)

  return (
    <>
      <h2>STEP 3</h2>
      <p>Assigning Roles + Starting Game</p>
    </>
  );
};

export default StepThree;
