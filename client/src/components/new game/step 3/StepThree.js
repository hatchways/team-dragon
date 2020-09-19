import React, { useCallback } from "react";
import {
  /* useNewGame,  */ usePlayers,
  useSpyMaster,
} from "../../../DataContext";

//import { useAxios } from "../../../hooks/useAxios";
import { Grid, Box, Typography } from "@material-ui/core";
import PlayerSelect from "./PlayerSelect";
import RoleSelect from "./RoleSelect";

const StepThree = () => {
  // const newGameContext = useNewGame();
  // const [newGame] = newGameContext;

  const newPlayerContext = usePlayers();
  const [players, setPlayers] = newPlayerContext;

  //Holds ID of spyMaster
  const newSpyMasterContext = useSpyMaster();
  const [spyMaster, setSpyMaster] = newSpyMasterContext;

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
      <Grid item>
        <RoleSelect
          team={redPlayers}
          color={"red"}
          spyMaster={spyMaster}
          setSpyMaster={setSpyMaster}
        />
      </Grid>
    );
  }, [players, spyMaster, setSpyMaster]);

  return (
    <>
      <h2>Step 3</h2>
      <Box mb={3}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Box mb="1.5rem">
            <Typography variant="h3">Assign Teams</Typography>
          </Box>
          <Grid container direction="row" justify="center" alignItems="center">
            {displayPlayers()}
          </Grid>
        </Grid>
      </Box>
      <Box mb={4}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
        >
          <Box mb="1.5rem">
            <Typography variant="h3">Assign SpyMaster</Typography>
          </Box>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item>{displayBlueRoles()}</Grid>
            <Grid item>{displayRedRoles()}</Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StepThree;
