import React from "react";
import { Link } from "react-router-dom";
import { useNewGame } from "../contexts/DataContext";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Container, Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  card: {
    padding: "2rem",
    textAlign: "center",
  },
  heading: {
    marginBottom: "2rem",
  },
  button: {
    margin: "0 1rem",
  },
}));

const Landing = (props) => {
  const classes = useStyles();

  //Holds Match ID + Template for Passing Roles to Server
  const NewGameContext = useNewGame();
  const [newGame, setNewGame] = NewGameContext;

  const createNewGame = async () => {
    try {
      const getData = await axios.post("/create-match");
      await setNewGame((prevState) => ({
        ...prevState,
        hostId: localStorage.getItem("id"),
        matchId: getData.data.match.id,
      }));
      await props.history.push(String(getData.data.match.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <Card className={classes.card}>
        <Typography className={classes.heading} variant="h2">
          Welcome to Cluewords!
        </Typography>

        {!localStorage.id ? (
          <>
            <Button
              className={classes.button}
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
            >
              Sign Up
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
            >
              Sign In
            </Button>
          </>
        ) : (
          <Button
            className={classes.button}
            onClick={createNewGame}
            variant="contained"
            color="primary"
            size="large"
          >
            Create Game
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default Landing;
