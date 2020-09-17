import React, { useEffect, useState } from "react";
import StepOne from "../components/new game/step 1/StepOne.js";
import StepTwo from "../components/new game/step 2/StepTwo.js";
import StepThree from "../components/new game/step 3/StepThree.js";
import { useNewGame } from "../DataContext";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
} from "@material-ui/core";
import axios from "axios";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: "2rem",
    },
  })
);

const NewGame = (props) => {
  const classes = useStyles();

  const [data, setData] = useState({ gameDetails: [], loading: true });

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;

  useEffect(() => {
    if (!localStorage.getItem("newGame")) {
      axios
        .get("/create-match")
        .then((response) => {
          setData({ gameDetails: response.data, loading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (!data.gameDetails.globalState) {
      setNewGame(JSON.parse(localStorage.getItem("newGame")));
    } else {
      setNewGame((prevState) => ({
        ...prevState,
        matchId: data.gameDetails.globalState.match.id,
      }));
    }
  }, [data, setNewGame]);

  const nextStep = () => {
    const { step } = newGame;
    setNewGame((prevState) => ({
      ...prevState,
      step: step + 1,
    }));
  };

  const startGame = (url, data) => {
    console.log("startgame");
    const { step } = newGame;
    setNewGame((prevState) => ({
      ...prevState,
      step: step + 1,
    }));
  };

  const newGameSteps = () => {
    const { step } = newGame;
    switch (step) {
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
        <Typography align="center" variant="h1">
          New Game
        </Typography>

        <Divider />

        {newGameSteps()}

        <Grid container direction="row" justify="center" alignItems="center">
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
        </Grid>
      </Card>
    </Container>
  );
};

export default NewGame;
