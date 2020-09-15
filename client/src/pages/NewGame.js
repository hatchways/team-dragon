import React from "react";
import StepOne from "../components/new game/step 1/StepOne.js";
import StepTwo from "../components/new game/step 2/StepTwo.js";
import { useNewGame } from "../DataContext";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
} from "@material-ui/core";

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

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;

  const nextStep = () => {
    const { step } = newGame;
    setNewGame((prevState) => ({
      ...prevState,
      step: step + 1,
    }));

    // if (step === 1) {
    //   const { data, loading } = useAxios(
    //     "https://www.hatchways.io/api/assessment/students"
    //   );

    // }
  };

  const newGameSteps = () => {
    const { step } = newGame;

    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      default:
        return <h2>End of the road</h2>;
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
          {newGame.step === 1 ? (
            <Button variant="contained" color="primary" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={nextStep}>
              Create Game
            </Button>
          )}
        </Grid>
      </Card>
    </Container>
  );
};

export default NewGame;
