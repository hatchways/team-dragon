import React from "react";
import { useNewGame } from "../../DataContext";
import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
} from "@material-ui/core";
import LinkInvite from "./LinkInvite";
import EmailInvite from "./EmailInvite";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: "2rem",
    },
    inviteSection: {
      margin: "2rem",
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
  };

  const newGameSteps = () => {
    const { step } = newGame;

    switch (step) {
      case 1:
        return (
          <>
            <Grid container spacing={2} className={classes.inviteSection}>
              <Grid item xs={8}>
                <EmailInvite />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item xs>
                <LinkInvite />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return <h2>step2</h2>;
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
          <Button variant="contained" color="primary" onClick={nextStep}>
            Create Game
          </Button>
        </Grid>
      </Card>
    </Container>
  );
};

export default NewGame;
