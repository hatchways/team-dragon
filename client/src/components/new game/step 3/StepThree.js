import React, { useCallback, useState, useEffect } from "react";
import { useNewGame, usePlayers } from "../../../DataContext";
//import { useAxios } from "../../../hooks/useAxios";
import PlayerSelect from "./PlayerSelect";
import RoleSelect from "./RoleSelect";

const StepThree = () => {
  const newGameContext = useNewGame();
  const [newGame] = newGameContext;

  const newPlayerContext = usePlayers();
  const [players, setPlayers] = newPlayerContext;

  //Holds ID of spyMaster
  const [spyMaster, setSpyMaster] = useState({ teamBlue: "", teamRed: "" });

  const displayPlayers = useCallback(() => {
    return players.map((player, i) => {
      return (
        <PlayerSelect
          key={i}
          ele={i}
          player={player}
          players={players}
          setPlayers={setPlayers}
          spyMaster={spyMaster}
          setSpyMaster={setSpyMaster}
        />
      );
    });
  }, [players, setPlayers, spyMaster]);

  const displayBlueRoles = useCallback(() => {
    const bluePlayers = players.filter((player) => player.team === "teamBlue");
    return (
      <RoleSelect
        team={bluePlayers}
        color={"blue"}
        spyMaster={spyMaster}
        setSpyMaster={setSpyMaster}
      />
    );
  }, [players, spyMaster]);

  const displayRedRoles = useCallback(() => {
    const redPlayers = players.filter((player) => player.team === "teamRed");
    return (
      <RoleSelect
        team={redPlayers}
        color={"red"}
        spyMaster={spyMaster}
        setSpyMaster={setSpyMaster}
      />
    );
  }, [players, spyMaster]);

  return (
    <>
      <h2>Step 3</h2>

      <p>Assign Teams</p>
      {displayPlayers()}
      <p>Assign Roles</p>
      {displayBlueRoles()}
      {displayRedRoles()}
    </>
  );
};

export default StepThree;
