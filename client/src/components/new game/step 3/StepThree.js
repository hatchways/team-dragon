import React, { useCallback } from "react";
import PlayerSelect from "./PlayerSelect";
import RoleSelect from "./RoleSelect";
import {
  usePlayers,
  useSpyMaster,
  useNewGame,
} from "../../../contexts/DataContext";
import { Grid, Box, Typography } from "@material-ui/core";
import Pulse from "react-reveal/Pulse";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  disabledTitle: {
    color: theme.grey.mediumDark,
  },
}));

const StepThree = () => {
  const [players, setPlayers] = usePlayers();
  const [spyMaster, setSpyMaster] = useSpyMaster();
  const [newGame] = useNewGame();
  const classes = useStyles();

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
          newGame={newGame}
        />
      );
    });
  }, [players, setPlayers, spyMaster, setSpyMaster, newGame]);

  const displayBlueRoles = useCallback(() => {
    const bluePlayers = players.filter((player) => player.team === "blue");
    return (
      <RoleSelect
        team={bluePlayers}
        color={"blue"}
        spyMaster={spyMaster}
        setSpyMaster={setSpyMaster}
        newGame={newGame}
      />
    );
  }, [players, spyMaster, setSpyMaster, newGame]);

  const displayRedRoles = useCallback(() => {
    const redPlayers = players.filter((player) => player.team === "red");
    return (
      <Grid item>
        <RoleSelect
          team={redPlayers}
          color={"red"}
          spyMaster={spyMaster}
          setSpyMaster={setSpyMaster}
          newGame={newGame}
        />
      </Grid>
    );
  }, [players, spyMaster, setSpyMaster, newGame]);

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
              <Typography className={newGame !== 3 ? classes.disabledTitle : null} variant="h3">Assign Teams</Typography>
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
              <Typography className={newGame !== 4 ? classes.disabledTitle : null} variant="h3">Assign SpyMaster</Typography>
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
