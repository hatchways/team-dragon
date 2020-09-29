import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StepOne from "../new game/step 1/StepOne";
import StepTwo from "../new game/step 2/StepTwo.js";
import StepThree from "../new game/step 3/StepThree.js";
import {
  useNewGame,
  usePlayers,
  useSpyMaster,
  useEmails,
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

  // const [openDialog, setOpenDialog] = useState(false);
  // const [error, setError] = useState("");

  //Holds Game ID + Template for Passing Roles to Server
  const [newGame, setNewGame] = useNewGame();

  //Holds All Players + Roles
  const [players] = usePlayers();

  //Holds Selected SpyMaster
  const [spyMaster] = useSpyMaster();

  //Holds Emails to be Invited to Game
  const [emails, setEmails] = useEmails();

  let { id } = useParams();

  // Goes back to the step of the host when page refreshes
  useEffect(() => window.localStorage.setItem("newGame", newGame), [newGame]);

  const resetNewGame = async () => {
    try {
      const getData = await axios.post("/create-game");
      await setNewGame(1);
      await props.value.history.push(String(getData.data.game.id));
    } catch (err) {
      console.log(err);
    }
  };

  const nextStep = async () => {
    console.log('emails.length', emails.length)
    try {
      if (newGame !== 1 || emails.length < 1) {
        await setNewGame((prevState) => prevState + 1);
      } else {
        const getData = await axios.post("/send-email", { emails, gameId: id });
        if (getData.data.error) {
          console.log('Error:', getData.data.error)
          // setError(getData.data.error);
          // setOpenDialog(true);
          return null;
        }
        await setEmails([]);
        await setNewGame((prevState) => prevState + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Sends Date to Start Game
  const startGame = async (e) => {
    try {
      const setGame = (players, spyMaster) => {
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
          gameId: id,
          players: playerAssign,
        };
      };
      const gameDetails = await setGame(players, spyMaster);
      console.log("emit-start-game", gameDetails);
      socket.emit("start-game", gameDetails);
    } catch (err) {
      console.log(err);
    }
  };

  const newGameSteps = () => {
    switch (newGame) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      default:
        return (
          <h2>
            Error. It is likely the New Game component is showing and it
            shouldn't be.
          </h2>
        );
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
