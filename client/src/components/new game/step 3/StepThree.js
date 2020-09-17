import React, { useCallback } from "react";
import { /* useNewGame, */ usePlayers, useSpyMaster } from "../../../DataContext";
//import { useAxios } from "../../../hooks/useAxios";
import PlayerSelect from "./PlayerSelect";
import RoleSelect from "./RoleSelect";

const StepThree = () => {
  // const newGameContext = useNewGame();
  // const [newGame] = newGameContext;

  const newPlayerContext = usePlayers();
  const [players, setPlayers] = newPlayerContext;

  //Holds ID of spyMaster
  const newSpyMasterContext = useSpyMaster();
  const [spyMaster, setSpyMaster] = newSpyMasterContext

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
  }, [players, setPlayers, spyMaster, setSpyMaster]);

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
  }, [players, spyMaster, setSpyMaster]);

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
  }, [players, spyMaster, setSpyMaster]);

  

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
