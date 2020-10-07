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
import { makeStyles } from "@material-ui/core/styles";
import socket from "../../socket";
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "2rem",
    marginTop: "2rem",
  },
  titleDivider: {
    borderTop: `7px solid ${theme.palette.primary.main}`,
    width: "5rem",
    marginTop: "1rem",
  },
}));

const NewGame = (props) => {
  const classes = useStyles();

  //Holds Game ID + Template for Passing Roles to Server
  const [newGame, setNewGame] = useNewGame();

  //Holds All Players + Roles
  const [players] = usePlayers();

  //Holds Selected SpyMaster
  const [spyMaster, setSpyMaster] = useSpyMaster();

  //Holds Emails to be Invited to Game
  const [emails, setEmails] = useEmails();

  let { id } = useParams();

  // Goes back to the step of the host when page refreshes
  useEffect(() => window.localStorage.setItem("newGame", newGame), [newGame]);


  const nextStep = async () => {
    try {
      if (newGame !== 1 || emails.length < 1) {
        await setNewGame((prevState) => prevState + 1);
      } else {
        const getData = await axios.post("/send-email", { emails, gameId: id });
        if (getData.data.error) {
          console.log("Error:", getData.data.error);
          return null;
        }
        await setEmails([]);
        await setNewGame((prevState) => prevState + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Sends Data to Start Game
  const startGame = async () => {
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
      console.log("Emitting start-game:", gameDetails);
      localStorage.removeItem("newGame");
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
      case 4:
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
              {newGame < 4 ? (
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
              {newGame !== 1 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setNewGame((prevState) => prevState - 1);
                    if (newGame === 4) {
                      setSpyMaster({ blue: "", red: "" });
                    }
                  }}
                >
                  Back
                </Button>
              )}
            </Box>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default NewGame;
