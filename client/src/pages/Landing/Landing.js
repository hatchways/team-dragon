import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useNewGame } from "../../contexts/DataContext";
import { useUser } from "../../contexts/UserContext";
import useStyles from "./styles";

const Landing = (props) => {
  const classes = useStyles();

  //Holds Game ID + Template for Passing Roles to Server
  const [newGame, setNewGame] = useNewGame();
  const [user, setUser] = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("id");

  const handleClose = () => {
    setOpenDialog(false);
    // If the error is: User not signed in
    props.history.push("/login");
  };

  const createNewGame = async () => {
    try {
      const getData = await axios.post("/create-game");
      if (getData.data.error) {
        setError(getData.data.error);
        setOpenDialog(true);
        return null;
      }
      await setNewGame(1);
      await props.history.push(String(getData.data.game.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={classes.Landing} maxWidth="md">
      <Card className={classes.Card}>
        <Typography className={classes.Heading} variant="h2">
          Welcome to Cluewords!
        </Typography>

        {!localStorage.id ? (
          <>
            <Button
              className={classes.Button}
              component={Link}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
            >
              Sign Up
            </Button>
            <Button
              className={classes.Button}
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
            className={classes.Button}
            onClick={createNewGame}
            variant="contained"
            color="primary"
            size="large"
          >
            Create Game
          </Button>
        )}
      </Card>
      <Dialog open={openDialog} onClose={handleClose}>
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
