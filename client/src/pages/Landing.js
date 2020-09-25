import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useNewGame } from "../contexts/DataContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOpenDialog(false);
    // If the error is: User not signed in 
    props.history.push("/login");
  };

  const createNewGame = async () => {
    try {
      const getData = await axios.post("/create-match");
      if (getData.data.error) {
        setError(getData.data.error);
        setOpenDialog(true);
        // localStorage.clear();
        return null;
      }
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
      <Dialog
        open={openDialog}
        onClose={handleClose}
      >
        <DialogTitle>{error}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Look's like you are not signed in yet!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Landing;
