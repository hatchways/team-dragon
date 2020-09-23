import React, { useEffect } from "react";
import StepOne from "../components/new game/step 1/StepOne.js";
import StepTwo from "../components/new game/step 2/StepTwo.js";
import StepThree from "../components/new game/step 3/StepThree.js";
import { useNewGame, usePlayers, useSpyMaster } from "../DataContext";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  Box,
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import axios from "axios";
import socket from '../socket';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: "2rem",
      marginTop: "2rem",
    },
    titleDivider: {
      borderTop: `7px solid ${theme.palette.primary.main}`,
      width: "5rem",
      marginTop: "1rem",
    },
  }),
);

const NewGame = (props) => {
  const classes = useStyles();

  //Holds Match ID + Template for Passing Roles to Server
  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;

  //Holds All Players + Roles
  const newPlayersContext = usePlayers();
  const [players] = newPlayersContext;

  //Holds Selected SpyMaster
  const newSpyMasterContext = useSpyMaster();
  const [spymaster] = newSpyMasterContext;

  const gameData = localStorage.getItem("newGame");

  useEffect(() => {

    // if (gameData) {
    //   setNewGame(JSON.parse(localStorage.getItem("newGame")));
    // }

    //Catching errors in local storage
    if (newGame.matchId !== Number(props.match.params.id)) {
      setNewGame((prevState) => ({
        ...prevState,
        step: 1,
        matchId: Number(props.match.params.id),
      }));
    }

    // Updated players array (Data lagging one step behind and needs to be fixed)
    socket.on("update-match-state", (match) => {
      console.log("Updated Match State: ", match);
    });
  }, []);

  // Stores New Game Info to Local Storage
  useEffect(() => {
    localStorage.setItem("newGame", JSON.stringify(newGame));
  }, [newGame]);

  const resetNewGame = async () => {
    try {
      const getData = await axios.post("/create-match");
      await setNewGame((prevState) => ({
        ...prevState,
        step: 1,
        hostId: localStorage.getItem("id"),
        matchId: getData.data.match.id,
      }));
      await localStorage.setItem("newGame", JSON.stringify(newGame));
      await props.history.push(String(getData.data.match.id));
    } catch (err) {
      console.log(err);
    }
  };

  const nextStep = () => {
    const { step } = newGame;
    setNewGame((prevState) => ({
      ...prevState,
      step: step + 1,
    }));
  };

  const startGame = async (e) => {
    const setMatch = (newGame, players, spyMaster) => {
      let spyMasters = [spyMaster.teamBlue, spyMaster.teamRed];

      let playerAssign = players.map((player) => {
        if (spyMasters.includes(player.id)) {
          return {
            id: player.id,
            name: player.name,
            team: player.team,
            spyMaster: true,
          };
        } else {
          return {
            id: player.id,
            name: player.name,
            team: player.team,
            spyMaster: false,
          };
        }
      });

      return {
        matchId: newGame.matchId,
        players: playerAssign,
      };
    };

    try {
      const matchDetails = await setMatch(newGame, players, spymaster);
      console.log("matchDetails", matchDetails);
      //await axios.post("/start-match")
      //Push to new link?
    } catch (err) {
      console.log(err);
    }
  };

  const newGameSteps = () => {
    const { step } = newGame;
    switch (step) {
      // case 0:
      //   return <NewGameLoading />;
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <h2>Game Starts?</h2>;
    }
  };

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
        <Box minHeight={400}>
          <Typography align="center" variant="h1">
            New game
          </Typography>

          <Grid container direction="row" justify="center" alignItems="center">
            <Divider className={classes.titleDivider} />
          </Grid>
          {newGameSteps()}
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            alignItems="center"
          >
            <Box mx={2}>
              {newGame.step < 3 ? (
                <Button variant="contained" color="primary" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                //Needs Logic here to initiate final role allocation.
                <Button variant="contained" color="primary" onClick={startGame}>
                  Create Game
                </Button>
              )}
            </Box>
            <Box mx={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={resetNewGame}
              >
                Start Over
              </Button>
            </Box>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default NewGame;
