import React, { useEffect } from "react";
import StepTwo from "./step 2/StepTwo";
import { useNewGame } from "../../contexts/DataContext";
import { useParams } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

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

const WaitingRoom = (props) => {
  const classes = useStyles();
  const [newGame, setNewGame] = useNewGame();
  let { gameId } = useParams();


  const userName = localStorage.getItem("name");

  useEffect(() => {
    setNewGame((prevState) => ({
      ...prevState,
      matchId: gameId,
    }));
  }, []);

  console.log('newGame', newGame)

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
        <Typography align="center" variant="h1">
          Welcome {userName}!
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Divider className={classes.titleDivider} />
        </Grid>
        <Box mt={2}>
          <Typography align="center" variant="h3">
            Please wait as your host assigns the teams.
          </Typography>
        </Box>
        <StepTwo />
      </Card>
    </Container>
  );
};

export default WaitingRoom;
