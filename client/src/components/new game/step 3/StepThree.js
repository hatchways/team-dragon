import React, { useCallback, useEffect } from "react";
import { usePlayers, useSpyMaster } from "../../../contexts/DataContext";

//import { useAxios } from "../../../hooks/useAxios";
import { Grid, Box, Typography } from "@material-ui/core";
import PlayerSelect from "./PlayerSelect";
import RoleSelect from "./RoleSelect";
import Pulse from "react-reveal/Pulse";

const StepThree = () => {
  const [players, setPlayers] = usePlayers();

  //Holds ID of spyMaster
  const [spyMaster, setSpyMaster] = useSpyMaster();

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
    const bluePlayers = players.filter((player) => player.team === "blue");
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
    const redPlayers = players.filter((player) => player.team === "red");
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

  useEffect(() => {
    //Fixes bug where player is selected as spymaster, but than allocated to the other team. Solution could likely be improved.

    //Check Blue Team
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === spyMaster.blue && players[i].team !== "blue") {
        setSpyMaster((prevState) => ({
          ...prevState,
          blue: "",
        }));
      }
    }

    //Check Red Team
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === spyMaster.red && players[i].team !== "red") {
        setSpyMaster((prevState) => ({
          ...prevState,
          red: "",
        }));
      }
    }

  }, [players]);

  return (
    <>
      <Pulse>
        <Box m={3}>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="center"
          >
            <Box mb="1.5rem">
              <Typography variant="h3">Assign Teams</Typography>
            </Box>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
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
      </Pulse>
    </>
  );
};

export default StepThree;
