import React, { useCallback } from "react";
import { useNewGame, usePlayers, useRoles } from "../../../DataContext";
//import { useAxios } from "../../../hooks/useAxios";
import PlayerSelect from "./PlayerSelect";
import RoleSelect from "./RoleSelect";

const StepThree = () => {
  const newGameContext = useNewGame();
  const [newGame] = newGameContext;

  const newPlayerContext = usePlayers();
  const [players, setPlayers] = newPlayerContext;

  const newRolesContext = useRoles();
  const [roles, setRoles] = newRolesContext;

  console.log(players);

  const displayPlayers = useCallback(() => {
    return players.map((player, i) => {
      return <PlayerSelect key={i} player={player} />;
    });
  }, [players]);


  const displayRoles = useCallback(() => {
  
      return <RoleSelect team={"red"} />;
  
  }, []);


  // const displayRoles = useCallback(() => {
  //   return roles.map((role, i) => {
  //     return <RoleSelect key={i} team={"red"} />;
  //   });
  // }, [roles]);

  return (
    <>
      <h2>Step 3</h2>

      <p>Assign Teams</p>
      {displayPlayers()}
      <p>Assign Roles</p>
      {displayRoles()}
    </>
  );
};

export default StepThree;
