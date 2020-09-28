import React, { useEffect } from "react";
import StepOne from "../new game/step 1/StepOne";
import StepTwo from "../new game/step 2/StepTwo.js";
import StepThree from "../new game/step 3/StepThree.js";
import { useParams } from "react-router-dom";
import {
  useNewGame,
  usePlayers,
  useSpyMaster,
} from "../../contexts/DataContext";
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
import socket from "../../socket";
import axios from "axios";

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
  const [newGame, setNewGame] = useNewGame();

  //Holds All Players + Roles
  const [players] = usePlayers();

  //Holds Selected SpyMaster
  const [spyMaster] = useSpyMaster();

  let { id } = useParams();

  useEffect(() => window.localStorage.setItem("newGame", newGame), [newGame]);


  const resetNewGame = async () => {
    try {
      const getData = await axios.post("/create-match");
      console.log('getData', getData)
      await setNewGame(1);
      await props.value.history.push(String(getData.data.match.id));
    } catch (err) {
      console.log(err);
    }
  };

  const nextStep = () => {
    setNewGame((prevState) => prevState + 1);
  };



  //Sends Date to Start Game
  const startMatch = async (e) => {
    try {
      const setMatch = (players, spyMaster) => {
        let spyMasters = [spyMaster.blue, spyMaster.red];

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
          matchId: id,
          players: playerAssign,
        };
      };
      const matchDetails = await setMatch(players, spyMaster);
      socket.emit("start-game", matchDetails);
    } catch (err) {
      console.log(err);
    }
  };

  const newGameSteps = () => {
    switch (newGame) {
      // case 0:
      //   return <NewGameLoading />;
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return <h2>Error. The New Game component is showing and it shouldn't be.</h2>;
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
              {newGame < 3 ? (
                <Button variant="contained" color="primary" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                //Needs Logic here to initiate final role allocation.
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startMatch}
                >
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
